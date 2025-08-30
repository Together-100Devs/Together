const express = require("express");
const router = express.Router();
const Event = require("../models/Event").Event;

const createIcsEvents = (events) => {
  if (events.length === 0) {
    // return an empty calendar
    return [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//together.rocks//calendar//EN",
      "NAME:Together Calendar",
      "X-WR-CALNAME:Together Calendar",
      "END:VCALENDAR",
    ].join("\n");
  }

  // create the VEVENT blocks for each event
  const icalEvents = events.map(
    ({ _id, title, description, location, startAt, endAt }) => {
      const formatTimestamp = (date) => {
        // convert Date into string format:
        // YYYY-MM-DDTHH:mm:ss.sssZ -> YYYYMMDDTHH:mm:ss.sssZ
        return date.toISOString().replace(/[-:]/g, "").slice(0, -5) + "Z";
      };

      const formattedStart = formatTimestamp(startAt);
      const formattedEnd = formatTimestamp(endAt);
      const formattedStamp = formatTimestamp(new Date());

      return [
        "BEGIN:VEVENT",
        `UID:${_id.toString()}`,
        `DTSTAMP:${formattedStamp}`,
        `DTSTART:${formattedStart}`,
        `DTEND:${formattedEnd}`,
        `SUMMARY:${title}`,
        `LOCATION:${location}`,
        `DESCRIPTION:${description}`,
        `URL;VALUE=URI:https://together.rocks/calendar`,
        "END:VEVENT",
      ].join("\n");
    }
  );

  // Combine the VCALENDAR wrapper with all the VEVENT blocks
  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//together.rocks//calendar//EN",
    "NAME:Together Calendar",
    "X-WR-CALNAME:Together Calendar",
    ...icalEvents,
    "END:VCALENDAR",
  ].join("\n");

  return calendar;
};

router.get("/calendar.ics", async (req, res) => {
  try {
    // fetch events from mongodb
    const eventsFromDB = await Event.find({ status: "active" }).lean();

    console.log("Events found in DB:", eventsFromDB);

    // generate ICS content
    const icsContent = createIcsEvents(eventsFromDB);

    console.log("ICS content generated:", icsContent);

    // set headers and sent .ics content
    // res.setHeader("Content-Type", "text/calendar");
    res.setHeader("Content-Type", "text/plain");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="together-calendar.ics"'
    );
    res.send(icsContent);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).send("Sever Error");
  }
});

// export objects
module.exports = {
  router,
  createIcsEvents,
};
