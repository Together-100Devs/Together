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
  discordName: {
    type: String,
    required: true,
  },
  user: {
    type: String, // User _id is the discord id
    required: true,
    ref: "User",
  },
  groupId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", EventSchema);
