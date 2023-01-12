const { Event } = require("../models/Event");
const httpError = require("../utilities/httpError");
const { createEventsArray } = require("../utilities/createEventsArray");

module.exports = {
  create: async (req, res, next) => {
    const formData = req.body;
    const events = createEventsArray(formData);

    events.forEach(e => (e.user = req.user._id));

    try {
      await Event.insertMany(events);
      res.json({ message: "Event created!" });
    } catch (err) {
      next(err);
    }
  },
  getAll: async (req, res, next) => {
    try {
      // Get an array of events
      const events = await Event.find()
        .populate("user", "displayName")
        .lean()
        .exec();

      // return all events
      res.json(events);
    } catch (err) {
      next(err);
    }
  },
  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      // Get event by id
      const event = await Event.findById(id).lean().exec();

      // Check if event exists
      if (!event) {
        throw httpError(404);
      }

      res.json(event);
    } catch (err) {
      next(err);
    }
  },
  deleteEvent: async (req, res, next) => {
    try {
      const { id } = req.params;

      // Prevent users that are authenticated from deleting events they do not author.
      const event = await Event.findOne({ _id: id, user: req.user._id });
      if (!event) {
        throw httpError(401);
      }

      // Delete event by id
      await Event.findByIdAndDelete(id);

      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  },
  deleteAllEvents: async (req, res, next) => {
    try {
      const { groupId } = req.params;

      // Prevent users that are authenticated from deleting events they do not author.
      const count = await Event.countDocuments({
        groupId,
        user: req.user._id,
      }).exec();

      if (count === 0) {
        throw httpError(401);
      }

      const { deletedCount } = await Event.deleteMany({
        groupId,
        user: req.user._id,
      }).exec();

      // If the number of documents found is not equal to the number of deleted documents
      // Something may have gone wrong
      if (count !== deletedCount) {
        console.log(`Documents found: ${count}`);
        console.log(`Documents deleted: ${deletedCount}`);
      }

      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  },
};
