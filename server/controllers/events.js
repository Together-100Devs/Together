const Event = require("../models/Event");

module.exports = {
  //test function
  ping: (req, res) => {
    return res.json({ message: "pong" });
  },
  create: async (req, res) => {
    try {
      let data = req.body.data;
      console.log(data);
      await Event.create({
        title: data.title,
        description: data.description,
        initialDate: data.initialDate,
        finalDate: data.finalDate,
        startTime: data.startTime,
        endTime: data.endTime,
        recurring: data.recurring.rate === "weekly",
        recurringDates: data.recurring.days,
        recurringRate: data.recurring.rate,
        location: data.location,
        discordName: req.user.displayName,
      });
      res.json({ message: "Event created!" });
    } catch (err) {
      console.log(err);
    }
  },
  getAll: async (req, res) => {
    try {
      const events = await Event.find();
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
