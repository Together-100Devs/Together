"use strict";

const mongoose = require("mongoose");
const Joi = require("joi");
const { Temporal } = require("@js-temporal/polyfill");

const STRING_MAX_LENGTH = 280;
// Event's starting date should be less than (strictly) EVENT_MAX_DATE
const EVENT_MAX_DATE = "2024-01-01";
// Recurring events should span no more than MAX_RECURRENCE_PERIOD number of days
const MAX_RECURRENCE_PERIOD = 90;
const DAYS_OF_WEEK = ["1", "2", "3", "4", "5", "6", "7"];

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxLength: STRING_MAX_LENGTH,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      maxLength: STRING_MAX_LENGTH,
      required: true,
    },
    startAt: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          const greaterThanToday = value > new Date() - 1000 * 60 * 60 * 26;
          const limitTo2023 = value < new Date(EVENT_MAX_DATE);
          return greaterThanToday && limitTo2023;
        },
      },
    },
    endAt: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.startAt;
        },
        message: "should be greater than 'startAt' field",
      },
    },
    status: {
      type: String,
      default: "active",
      maxLength: STRING_MAX_LENGTH,
      required: true,
    },
    location: {
      type: String,
      trim: true,
      maxLength: STRING_MAX_LENGTH,
      required: true,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId, // User: is the ObjectId of author user
      required: true,
      ref: "User",
    },
    groupId: {
      type: String,
    },
    rsvpList: [{ type: mongoose.SchemaTypes.ObjectId }],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);

// Schema for request.body validation when event is created
const createEventSchema = Joi.object({
  title: Joi.string().trim().min(1).max(STRING_MAX_LENGTH).required(),
  description: Joi.string().trim().min(1).max(STRING_MAX_LENGTH).required(),
  location: Joi.string().trim().min(1).max(STRING_MAX_LENGTH).required(),
  discordName: Joi.string().trim().min(1).max(STRING_MAX_LENGTH).required(),
  initialDate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}/)
    .required(),
  finalDate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}/)
    .required(),
  startTime: Joi.string()
    .pattern(/^\d{2}:\d{2}$/)
    .required(),
  endTime: Joi.string()
    .pattern(/^\d{2}:\d{2}$/)
    .required(),
  recurring: Joi.object({
    // Rate is either "noRecurr" or "weekly"
    rate: Joi.string().valid("noRecurr", "weekly").required(),
    days: Joi.when(Joi.ref("rate"), {
      // if rate is noRecurr
      is: Joi.valid("noRecurr"),
      // then days should be empty array
      then: Joi.array().length(0),
      // otherwise the length should be between 1 and 7 and only include days mon-sun
      otherwise: Joi.array()
        .min(1)
        .max(7)
        .items(Joi.string().valid(...DAYS_OF_WEEK)),
    }).required(),
  }).required(),
  timeZone: Joi.string().min(1).max(STRING_MAX_LENGTH).required(),
}).custom((value, helpers) => {
  const { initialDate, finalDate, startTime, timeZone, recurring } = value;

  const plainInitialDate = Temporal.PlainDate.from(initialDate);
  const plainFinalDate = Temporal.PlainDate.from(finalDate);
  const plainMaxDate = Temporal.PlainDate.from(EVENT_MAX_DATE);

  const eventStart = Temporal.ZonedDateTime.from(
    `${initialDate}T${startTime}[${timeZone}]`
  ).epochMilliseconds;

  if (eventStart < Date.now()) {
    return helpers.message("Event should start in the future");
  }

  if (recurring.rate === "noRecurr" && initialDate !== finalDate) {
    return helpers.message(
      "finalDate should be equal to initialDate for non-recurring events"
    );
  }

  if (
    recurring.rate !== "noRecurr" &&
    Temporal.PlainDate.compare(plainFinalDate, plainInitialDate) === -1
  ) {
    return helpers.message(
      "finalDate must be greater than or equal to initialDate for recurring events"
    );
  }

  if (
    plainInitialDate.until(plainFinalDate).total({ unit: "days" }) >
    MAX_RECURRENCE_PERIOD
  ) {
    return helpers.message(
      `finalDate must be within ${MAX_RECURRENCE_PERIOD} days of initialDate`
    );
  }

  if (Temporal.PlainDate.compare(plainFinalDate, plainMaxDate) > 0) {
    return helpers.message(`finalDate must be before ${EVENT_MAX_DATE}`);
  }
}, "custom date-time validation");

module.exports = {
  Event,
  createEventSchema,
  STRING_MAX_LENGTH,
  MAX_RECURRENCE_PERIOD,
  EVENT_MAX_DATE,
};
