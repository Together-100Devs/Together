const mongoose = require("mongoose");
const Joi = require("joi");

const STRING_MAX_LENGTH = 280;
// Event's starting date should be less than (strictly) EVENT_MAX_DATE
const EVENT_MAX_DATE = "2024-01-01";
// Recurring events should span no more than MAX_RECURRENCE_PERIOD number of days
const MAX_RECURRENCE_PERIOD = 90;
const DAYS_OF_WEEK = ["1", "2", "3", "4", "5", "6", "0"];

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
          const greateThanToday = value > new Date() - 1000 * 60 * 60 * 26;
          const limitTo2023 = value < new Date("2024-01-01");
          return greateThanToday && limitTo2023;
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
    .timestamp()
    // Event should be in the future
    .min("now")
    .required(),
  firstEventEnd: Joi.date()
    .timestamp()
    // .greater(Joi.ref("firstEventStart"))
    .required(),
  lastEventStart: Joi.date()
    .timestamp()
    // If recurring rate is 'noRecurr' lastEventStart should be equal to firstEventStart
    .when(Joi.ref("/recurring.rate"), {
      is: Joi.valid("noRecurr"),
      then: Joi.ref("firstEventStart"),
    })
    // If recurring rate is 'weekly' then
    .when(Joi.ref("/recurring.rate"), {
      is: Joi.valid("weekly"),
      then: Joi.date()
        // lastEventStart should be greater than or equal to firstEventStart
        .min(Joi.ref("firstEventStart"))
        // and at most MAX_RECURRENCE_PERIOD days from firstEventStart
        .max(
          Joi.ref("firstEventStart", {
            adjust: function (value) {
              const date = new Date(value);
              date.setDate(date.getDate() + MAX_RECURRENCE_PERIOD);
              return date;
            },
          })
        ),
    })
    // Limit events to EVENT_MAX_DATE
    .less(EVENT_MAX_DATE)
    .required()
    .messages({
      "date.max": `"lastEventStart" must be within ${MAX_RECURRENCE_PERIOD} days of "ref:firstEventStart"`,
    }),
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
});

module.exports = {
  Event,
  createEventSchema,
};
