const ics = require("ics");
const Event = require("../models/Event");

const createDateArray = (date) => {
  return [
    date.getFullYear(),
    date.getMonth() + 1, // months are 0-indexed, add 1 => January: 1 instead of 0
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  ];
};

module.exports = (app) => {
  app.get("/calendar.ics", async (req, res) => {
    try {
      // fetch events from mongodb
      const eventsFromDB = await Event.find().lean();
      // format events for the ics library
      const icsEvents = eventsFromDB.map((event) => {
        const startDate = event.startAt;
        const endDate = event.endAt;

        return {
          title: event.title,
          description: event.description,
          location: event.location,
          // use createDateArray helper function
          start: createDateArray(startDate),
          end: createDateArray(endDate),
          url: `https://together.rocks/events/${event._id}`,
        };
      });

      const { error, value } = ics.createEvents(icsEvents);

      if (error) {
        console.error("Error generating ICS feed:", error);

        return res.status(500).send("Error generating calendar feed.");
      }

      // set headers and sent .ics content
      res.setHeader("Content-Type", "text/calendar");
      res.setHeader(
        "Content-Disposition",
        'inline; filename="together-calendar.ics"'
      );
      res.send(value);
    } catch (error) {
      console.error("Database query error:", error);
      res.status(500).send("Sever Error");
    }
  });
};
