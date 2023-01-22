"use strict";

const mongoose = require("mongoose");
const Joi = require("joi");

const STRING_MAX_LENGTH = 280;
// Event's starting date should be less than (strictly) EVENT_MAX_DATE
const EVENT_MAX_DATE = "2024-01-01";
// Recurring events should span no more than MAX_RECURRENCE_PERIOD number of days
const MAX_RECURRENCE_PERIOD = 90;
const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

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
  firstEventStart: Joi.date()
    // Subtract one day because time on server may differ from client
    .min(new Date() - 60 * 60 * 24 * 1000)
    .required(),
  firstEventEnd: Joi.date()
    // time on server may differ from the time on client
    // the most extreme offsets are +12 and -14 hours from utc
    .min(new Date() - 1000 * 60 * 60 * 26)
    .required(),
  lastEventStart: Joi.date()
    // last event start date should not be earlier than first event start date
    .min(Joi.ref("firstEventStart"))
    // at most MAX_RECURRENCE_PERIOD days from firstEventStart
    .max(
      Joi.ref("firstEventStart", {
        adjust: val => {
          let date = new Date(val);
          date.setDate(date.getDate() + MAX_RECURRENCE_PERIOD);
          return date;
        },
      })
    )
    // Limit events to 2023
    .less(EVENT_MAX_DATE)
    // If recurring rate is 'noRecurr' lastEventStart should be equal to firstEventStart
    .when(Joi.ref("/recurring.rate"), {
      is: Joi.valid("noRecurr"),
      then: Joi.ref("firstEventStart"),
    })
    .required()
    .messages({
      "date.max": `"lastEventStart" must be within ${MAX_RECURRENCE_PERIOD} days of "ref:firstEventStart"`,
    }),
  recurring: Joi.object({
    // Rate is either "noRecurr" or "weekly"
    rate: Joi.string()
      .valid("noRecurr", "weekly")
      .max(STRING_MAX_LENGTH)
      .required(),
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
  }),
});

module.exports = {
  Event,
  createEventSchema,
};
