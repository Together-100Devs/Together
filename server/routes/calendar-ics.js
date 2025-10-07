const express = require("express");
const router = express.Router();
const { Event } = require("../models/Event");

const escapeIcsValue = (value) => {
  if (!value) return "";
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r");
};

const formatTimestamp = (date) => {
  // Validate the date
  if (!date) {
    return null;
  }

  // Convert string to Date if needed
  if (typeof date === "string") {
    date = new Date(date);
  }

  // Check if it's a valid date
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return null;
  }

  // Convert to ICS format: YYYYMMDDTHHMMSSZ
  return date.toISOString().replace(/[-:]/g, "").slice(0, -5) + "Z";
};

const createIcsEvents = (events) => {
  if (!events || events.length === 0) {
    console.log("[ICS] No events provided, returning empty calendar");
    return [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//together.rocks//calendar//EN",
      "NAME:Together Calendar",
      "X-WR-CALNAME:Together Calendar",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "END:VCALENDAR",
    ].join("\r\n");
  }

  const icalEvents = events
    .map((event) => {
      try {
        const { _id, title, description, location, startAt, endAt } = event;

        // Validate required fields
        if (!_id || !title || !location || !description) {
          console.warn(`[ICS] Skipping event - missing required fields:`, {
            _id,
            title,
            location,
            description,
          });
          return null;
        }

        // Format timestamps
        const formattedStart = formatTimestamp(startAt);
        const formattedEnd = formatTimestamp(endAt);
        const formattedStamp = formatTimestamp(new Date());

        // Check if dates are valid
        if (!formattedStart || !formattedEnd || !formattedStamp) {
          console.warn(`[ICS] Skipping event ${_id} - invalid date(s)`, {
            startAt,
            endAt,
            formattedStart,
            formattedEnd,
          });
          return null;
        }

        return [
          "BEGIN:VEVENT",
          `UID:${_id.toString()}@together.rocks`,
          `DTSTAMP:${formattedStamp}`,
          `DTSTART:${formattedStart}`,
          `DTEND:${formattedEnd}`,
          `SUMMARY:${escapeIcsValue(title)}`,
          `DESCRIPTION:${escapeIcsValue(description)}`,
          `LOCATION:${escapeIcsValue(location)}`,
          `URL;VALUE=URI:https://together.rocks/calendar`,
          "END:VEVENT",
        ].join("\r\n");
      } catch (eventError) {
        console.error(`[ICS] Error processing event:`, eventError.message);
        return null;
      }
    })
    .filter(Boolean); // Remove null entries

  const calendar = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//together.rocks//calendar//EN",
    "NAME:Together Calendar",
    "X-WR-CALNAME:Together Calendar",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...icalEvents,
    "END:VCALENDAR",
  ].join("\r\n");

  return calendar;
};

router.get("/calendar.ics", async (req, res) => {
  try {
    console.log("[ICS] ==== Request Started ====");

    // Fetch events from database
    console.log("[ICS] Querying database for events with status: 'active'");
    const eventsFromDB = await Event.find({ status: "active" }).lean();

    console.log(`[ICS] Found ${eventsFromDB.length} events`);

    if (eventsFromDB.length > 0) {
      console.log("[ICS] First event sample:", {
        _id: eventsFromDB[0]._id,
        title: eventsFromDB[0].title,
        startAt: eventsFromDB[0].startAt,
        endAt: eventsFromDB[0].endAt,
      });
    }

    // Generate ICS content
    const icsContent = createIcsEvents(eventsFromDB);
    console.log("[ICS] Content generated successfully");
    console.log(`[ICS] Content length: ${icsContent.length} characters`);

    // Set correct headers
    res.setHeader("Content-Type", "text/calendar; charset=utf-8");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="together-calendar.ics"'
    );
    res.setHeader("Cache-Control", "public, max-age=3600"); // Cache for 1 hour
    res.setHeader("Access-Control-Allow-Origin", "*");

    console.log("[ICS] Sending response");
    res.send(icsContent);
    console.log("[ICS] ==== Request Completed Successfully ====");
  } catch (error) {
    console.error("[ICS] ==== ERROR ====");
    console.error("[ICS] Error type:", error.constructor.name);
    console.error("[ICS] Error message:", error.message);
    console.error("[ICS] Stack trace:", error.stack);

    res.status(500).json({
      error: "Failed to generate calendar",
      message: error.message,
      type: error.constructor.name,
    });
  }
});

module.exports = { router, createIcsEvents };
