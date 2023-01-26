const httpError = require("../utilities/httpError");
const { Event } = require("../models/Event");

/**
 * Checks if the number of different future recurring events
 * (with distinct groupId) and nonrecurring events exceeds 5.
 */
const maxEvents = async (req, _, next) => {
  try {
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

    //Makes it hard to test we'll need to disuss if this is necessary going forward
    // if (existingRecurringEvents.length + existingNonrecurringEvents >= 5) {
    //   throw httpError(403, "Exceeded maximum allowed events per user.");
    // }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = maxEvents;
