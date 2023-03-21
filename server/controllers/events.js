const { Event } = require("../models/Event");
const httpError = require("../utilities/httpError");
const { createEventsArray } = require("../utilities/createEventsArray");
require("express-async-errors");

module.exports = {
  create: async (req, res) => {
    const formData = req.body;
    const events = createEventsArray(formData);

    // If none of the days of the week selected is between start and end dates
    if (!events.length) {
      throw httpError(400);
    }

    events.forEach(e => (e.user = req.user._id));

    // insertMany result doesn't populate user display name
    const result = await Event.insertMany(events);
    // find newly added events and populate user with displayName
    const ids = result.map(e => e._id);
    const addedEvents = await Event.find({ _id: { $in: ids } })
      .populate("user", "displayName")
      .lean()
      .exec();

    res.status(201).json({ message: "Event created!", events: addedEvents });
  },

  getAll: async (req, res) => {
    const { from, to } = req.query;

    let where = {};
    if (from || to) where = { startAt: { $gte: from, $lt: to } };

    const query = !req.user
      ? Event.find(where).select("-user")
      : Event.find(where).populate("user", "displayName");

    res.json(await query.lean());
  },

  getOne: async (req, res) => {
    const { id } = req.params;

    // Get event by id
    const event = await Event.findById(id)
      .select(req.user ? "" : "-user")
      .lean();

    // Check if event exists
    if (!event) {
      throw httpError(404);
    }

    res.json(event);
  },

  deleteEvent: async (req, res) => {
    const { id } = req.params;

    // Prevent users that are authenticated from deleting events they do not author.
    const event = await Event.findOne({ _id: id, user: req.user._id });
    if (!event) {
      throw httpError(404);
    }

    // Delete event by id
    await Event.findByIdAndDelete(id);

    res.sendStatus(204);
  },

  deleteAllEvents: async (req, res) => {
    const { groupId } = req.params;

    // Prevent users that are authenticated from deleting events they do not author.
    const count = await Event.countDocuments({
      groupId,
      user: req.user._id,
    }).exec();

    if (count === 0) {
      throw httpError(404);
    }

    const { deletedCount } = await Event.deleteMany({
      groupId,
      user: req.user._id,
    }).exec();

    // If the number of documents found is not equal to the number of deleted documents
    // Something may have gone wrong
    if (count !== deletedCount) {
      console.log(`Found: ${count}. Deleted: ${deletedCount}`);
    }

    res.sendStatus(204);
  },
};
