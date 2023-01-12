const mongoose = require("mongoose");
const Joi = require("joi");

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startAt: {
      type: Date,
      required: true,
    },
    endAt: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
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
    rsvpList: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", EventSchema);

// Schema for request.body validation when event is created
const createEventSchema = Joi.object({
  title: Joi.string().trim().min(1).required(),
  description: Joi.string().trim().min(1).required(),
  location: Joi.string().trim().min(1).required(),
  discordName: Joi.string().trim().min(1).required(),
  initialDate: Joi.date()
    // Subtract one day because time on server may differ from client
    .min(new Date() - 60 * 60 * 24 * 1000)
    .required(),
  startTime: Joi.string()
    // Time in format 'hh:mm'
    .pattern(/^\d{2}:\d{2}$/)
    .required(),
  finalDate: Joi.date()
    // finalDate should be not earlier than initialDate
    .min(Joi.ref("initialDate"))
    // at most 90 days from initialDate
    .max(
      Joi.ref("initialDate", {
        adjust: val => {
          let date = new Date(val);
          date.setDate(date.getDate() + 90);
          return date;
        },
      })
    )
    // Limit events to 2023
    .less("2024-01-01")
    // If recurring rate is noRecurr finalDate is equal to initialDate
    .when(Joi.ref("/recurring.rate"), {
      is: Joi.valid("noRecurr"),
      then: Joi.ref("initialDate"),
    })
    .required()
    .messages({
      "date.max": '"finalDate" must be within 90 days of "ref:initialDate"',
    }),
  endTime: Joi.string()
    // Time in format 'hh:mm'
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
        .items(
          Joi.string().valid(
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          )
        ),
    }).required(),
  }),
});

module.exports = {
  Event,
  createEventSchema,
};
