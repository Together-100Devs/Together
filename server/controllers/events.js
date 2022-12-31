const Event = require("../models/Event");

module.exports = {
  //test function
  ping: (req, res) => {
    return res.json({ message: "pong" });
  },
  create: async (req, res) => {
    try {
      let data = JSON.parse(req.body.data);
      data.forEach(obj => obj.user = req.user._id);
      console.log(data);
      await Event.insertMany(data);
      res.json({ message: "Event created!" });
    } catch (err) {
      console.log(err);
    }
  },
  getAll: async (req, res) => {
    console.log(req.user);
    try {
      const events = await Event.find().populate('user').exec();
      console.log(await events[0]);
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
};
