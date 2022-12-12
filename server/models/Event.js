const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  initialDate: {
    type: Date,
    required: true,
  },
  finalDate: {
    type: Date,
    required: true,
  },
  recurring: {
    type: Boolean,
    required: true,
  },
  recurringRate: {
    type: String,
    required: true,
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
