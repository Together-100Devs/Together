"use strict";

require("express-async-errors");
const httpError = require("../utilities/httpError");
const { Event } = require("../models/Event");

const MAX_EVENTS_PER_USER = 5;

/**
 * Checks if the number of different future recurring events
 * (with distinct groupId) and nonrecurring events exceeds MAX_EVENTS_PER_USER.
 */
const maxEvents = async (req, _, next) => {
  const existingRecurringEvents = await Event.distinct("groupId", {
    user: req.user._id,
    groupId: { $ne: null },
    startAt: { $gte: Date.now() },
  }).exec();

  const existingNonrecurringEvents = await Event.countDocuments({
    user: req.user._id,
    groupId: null,
    startAt: { $gte: Date.now() },
  }).exec();

  if (
    existingRecurringEvents.length + existingNonrecurringEvents >=
    MAX_EVENTS_PER_USER
  ) {
    throw httpError(403, "Exceeded maximum allowed events per user.");
  }

  next();
};

module.exports = maxEvents;
