const Event = require("../models/Event");

module.exports = {
  //test function
  create: async (req, res) => {
    try {
      let data = JSON.parse(req.body.data);
      data.forEach(obj => {
        obj.user = req.user._id;
        obj.rsvpList = [];
      });
      await Event.insertMany(data);
      res.json({ message: "Event created!" });
    } catch (err) {
      console.log(err);
    }
  },
  getAll: async (req, res) => {
    try {
      const events = await Event.find().populate('user').exec();
      // return all events
      res.json(events);
    } catch (err) {
      console.log(err);
    }
  },
  getOne: async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      res.json(event);
    } catch (err) {
      console.log(err);
    }
  },
  deleteEvent: async (req, res) => {
    try {
      const eventId = req.params.id;
      //checks if an event exists that _id, user, and req.user._id match. This is to prevent users that are authenticated from deleting events they do not author.
      const event = await Event.findOne({ _id: eventId, user: req.user._id });
      if (!event) { return res.status(401).send({ message: 'You are not the author of this event' }); }
      await Event.deleteOne({ _id: eventId });
      res.json({ message: 'Event deleted' });
    } catch (error) {
      console.error(error);
      res.send(500);
    }
  },
  deleteAllEvents: async (req, res) => {
    try {
      const groupId = req.params.groupId;
      //checks if an event exists that _id, user, and req.user._id match. This is to prevent users that are authenticated from deleting events they do not author.
      const event = await Event.findOne({ groupId: groupId, user: req.user._id })
      if (!event) { return res.status(401).send({ message: 'You are not the author of this event' }); }
      await Event.deleteMany({ groupId: groupId });
      res.json({ message: 'Events deleted' });
    } catch (error) {
      console.error(error);
      res.send(500);
    }
  },
};
