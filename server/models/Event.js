const mongoose = require("mongoose");

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
      type: mongoose.SchemaTypes.ObjectId, // User _id is the discord id
      required: true,
      ref: "User",
    },
    groupId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", EventSchema);
