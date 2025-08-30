const { createIcsEvents } = require("../../routes/calendar-ics");

describe("createIcsEvents", () => {
  // Test case for an empty events array
  it("should return a valid empty VCALENDAR when no events are provided", () => {
    const events = [];
    const icsContent = createIcsEvents(events);
    expect(icsContent).toContain("BEGIN:VCALENDAR");
    expect(icsContent).toContain("END:VCALENDAR");
    expect(icsContent).not.toContain("BEGIN:VEVENT");
  });

  // Test case for a single event
  it("should return a valid VCALENDAR with a single VEVENT when one event is provided", () => {
    const events = [
      {
        _id: "65e6480e6c469f8c614b1f6d",
        title: "Test Event 1",
        description: "This is a test event.",
        location: "Test Location",
        startAt: new Date("2025-01-01T10:00:00Z"),
        endAt: new Date("2025-01-01T11:00:00Z"),
      },
    ];

    const icsContent = createIcsEvents(events);

    expect(icsContent).toContain("BEGIN:VCALENDAR");
    expect(icsContent).toContain("END:VCALENDAR");
    expect(icsContent).toContain("BEGIN:VEVENT");
    expect(icsContent).toContain("END:VEVENT");
    expect(icsContent).toContain("SUMMARY:Test Event 1");
    expect(icsContent).toContain("DESCRIPTION:This is a test event.");
    expect(icsContent).toContain("LOCATION:Test Location");
    expect(icsContent).toContain("DTSTART:20250101T100000Z");
    expect(icsContent).toContain("DTEND:20250101T110000Z");
  });

  // Test case for multiple events
  it("should return a valid VCALENDAR with multiple VEVENTs when multiple events are provided", () => {
    const events = [
      {
        _id: "65e6480e6c469f8c614b1f6d",
        title: "Test Event 1",
        description: "This is a test event 1.",
        location: "Test Location 1",
        startAt: new Date("2025-01-01T10:00:00Z"),
        endAt: new Date("2025-01-01T11:00:00Z"),
      },
      {
        _id: "65e6480e6c469f8c614b1f6e",
        title: "Test Event 2",
        description: "This is a test event 2.",
        location: "Test Location 2",
        startAt: new Date("2025-01-02T12:00:00Z"),
        endAt: new Date("2025-01-02T13:00:00Z"),
      },
    ];

    const icsContent = createIcsEvents(events);
    const event1 = "SUMMARY:Test Event 1";
    const event2 = "SUMMARY:Test Event 2";

    expect(icsContent).toContain("BEGIN:VCALENDAR");
    expect(icsContent).toContain("END:VCALENDAR");
    expect(icsContent).toContain(event1);
    expect(icsContent).toContain(event2);
    expect(icsContent.indexOf(event1)).toBeLessThan(icsContent.indexOf(event2));
  });
});
