const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    require: true,
  },
  initialDate: {
    type: Date,
    require: true,
  },
  finalDate: {
    type: Date,
    require: true,
  },
  recurring: {
    type: Boolean,
    require: true,
  },
  recurringRate: {
    type: String,
    require: true,
  },
  dates: [
    {
      title: { type: String },
      description: { type: String },
      startAt: { type: Date },
      endAt: { type: Date },
      location: { type: String },
    }
  ],
  location: {
    type: String,
    required: true,
  },
  discordName: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", EventSchema);
