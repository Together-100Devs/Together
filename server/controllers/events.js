const mongoose = require("mongoose");
const Event = require("../models/Event");
const httpError = require("../utilities/httpError");

module.exports = {
  //test function
  ping: (req, res) => {
    return res.json({ message: "pong" });
  },
  create: async (req, res) => {
    try {
      let data = JSON.parse(req.body.data);
      data.forEach(obj => (obj.user = req.user._id));
      await Event.insertMany(data);
      res.json({ message: "Event created!" });
    } catch (err) {
      console.log(err);
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

      // Check if the ID is valid
      if (!mongoose.isValidObjectId(id)) {
        throw httpError(404);
      }

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

      // Check if the ID is valid
      if (!mongoose.isValidObjectId(id)) {
        throw httpError(404);
      }

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
  deleteAllEvents: async (req, res) => {
    try {
      const groupId = req.params.groupId;
      //checks if an event exists that _id, user, and req.user._id match. This is to prevent users that are authenticated from deleting events they do not author.
      const event = await Event.findOne({
        groupId: groupId,
        user: req.user._id,
      });
      if (!event) {
        return res
          .status(401)
          .send({ message: "You are not the author of this event" });
      }
      await Event.deleteMany({ groupId: groupId });
      res.json({ message: "Events deleted" });
    } catch (error) {
      console.error(error);
      res.send(500);
    }
  },
};
