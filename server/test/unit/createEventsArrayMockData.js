"use strict";

const generateTestCases = obj => {
  const arrOfTests = [];
  for (const time of obj.times()) {
    const description = `${obj.dates} ${time[0][0]} - ${time[0][1]}`;
    const { groupId = null, recurring = { rate: "noRecurr", days: [] } } = obj;
    const event = {
      description,
      input: {
        title: "test",
        description: "test",
        location: "test",
        discordName: "test",
        recurring,
        initialDate: obj.dates.at(0),
        startTime: time[0][0],
        finalDate: obj.dates.at(-1),
        endTime: time[0][1],
        timeZone: obj.timeZone,
      },
      output: time.map(e => ({
        title: "test",
        description: "test",
        location: "test",
        groupId,
        rsvp: [],
        startAt: e[2],
        endAt: e[3],
      })),
    };
    arrOfTests.push(event);
  }
  return arrOfTests;
};

const WETnonrecurring = {
  timeZone: "Europe/Lisbon",
  dates: ["2023-02-02"],
  times() {
    const [d] = this.dates;
    // prettier-ignore
    return [
      [[ "13:00", "14:00", Date.parse(`${d}T13:00:00.000+00:00`), Date.parse(`${d}T14:00:00.000+00:00`) ]],
      [[ "23:00", "00:00", Date.parse(`${d}T23:00:00.000+00:00`), Date.parse(`2023-02-03T00:00:00.000+00:00`) ]],
    ];
  },
};

const WESTnonrecurring = {
  timeZone: "Europe/Lisbon",
  dates: ["2023-06-02"],
  times() {
    const [d] = this.dates;
    // prettier-ignore
    return [
      [[ "13:00", "14:00", Date.parse(`${d}T13:00:00.000+01:00`), Date.parse(`${d}T14:00:00.000+01:00`) ]],
      [[ "23:00", "00:00", Date.parse(`${d}T23:00:00.000+01:00`), Date.parse(`2023-06-03T00:00:00.000+01:00`) ]],
    ];
  },
};

// Sunday, March 26, 2023, 1:00:00 AM clocks are turned forward 1 hour to March 26, 2023, 2:00:00 AM
// 1 AM - 2 AM doesn't exist
const WETtoWESTnonrecurring = {
  timeZone: "Europe/Lisbon",
  dates: ["2023-03-26"],
  times() {
    const [d] = this.dates;
    // prettier-ignore
    return [
      [[ "00:30", "00:45", Date.parse(`${d}T00:30:00.000+00:00`), Date.parse(`${d}T00:45:00.000+00:00`) ]],
      [[ "00:30", "01:00", Date.parse(`${d}T00:30:00.000+00:00`), Date.parse(`${d}T02:00:00.000+01:00`) ]],
      [[ "00:30", "01:30", Date.parse(`${d}T00:30:00.000+00:00`), Date.parse(`${d}T02:30:00.000+01:00`) ]],
      [[ "00:30", "02:00", Date.parse(`${d}T00:30:00.000+00:00`), Date.parse(`${d}T03:00:00.000+01:00`) ]],
      [[ "00:30", "02:30", Date.parse(`${d}T00:30:00.000+00:00`), Date.parse(`${d}T03:30:00.000+01:00`) ]],
      [[ "01:00", "01:30", Date.parse(`${d}T02:00:00.000+01:00`), Date.parse(`${d}T02:30:00.000+01:00`) ]],
      [[ "01:00", "02:00", Date.parse(`${d}T02:00:00.000+01:00`), Date.parse(`${d}T03:00:00.000+01:00`) ]],
      [[ "01:00", "02:30", Date.parse(`${d}T02:00:00.000+01:00`), Date.parse(`${d}T03:30:00.000+01:00`) ]],
      [[ "01:30", "01:45", Date.parse(`${d}T02:30:00.000+01:00`), Date.parse(`${d}T02:45:00.000+01:00`) ]],
      [[ "01:30", "02:00", Date.parse(`${d}T02:30:00.000+01:00`), Date.parse(`${d}T03:00:00.000+01:00`) ]],
      [[ "01:30", "02:30", Date.parse(`${d}T02:30:00.000+01:00`), Date.parse(`${d}T03:30:00.000+01:00`) ]],
      [[ "02:00", "02:30", Date.parse(`${d}T02:00:00.000+01:00`), Date.parse(`${d}T02:30:00.000+01:00`) ]],
    ]
  },
};

// WET -> WEST recurring event
const WETtoWESTrecurring = {
  timeZone: "Europe/Lisbon",
  recurring: { rate: "weekly", days: ["7"] },
  groupId: "1234",
  dates: ["2023-03-19", "2023-03-26", "2023-04-02"],
  times() {
    const [d1, d2, d3] = this.dates;
    // prettier-ignore
    return [
      [
        [ "00:30", "00:45", Date.parse(`${d1}T00:30:00.000+00:00`), Date.parse(`${d1}T00:45:00.000+00:00`) ],
        [ "00:30", "00:45", Date.parse(`${d2}T00:30:00.000+00:00`), Date.parse(`${d2}T00:45:00.000+00:00`) ],
        [ "00:30", "00:45", Date.parse(`${d3}T00:30:00.000+01:00`), Date.parse(`${d3}T00:45:00.000+01:00`) ],
      ],
      [
        [ "00:30", "01:00", Date.parse(`${d1}T00:30:00.000+00:00`), Date.parse(`${d1}T01:00:00.000+00:00`) ],
        [ "00:30", "01:00", Date.parse(`${d2}T00:30:00.000+00:00`), Date.parse(`${d2}T02:00:00.000+01:00`) ],
        [ "00:30", "01:00", Date.parse(`${d3}T00:30:00.000+01:00`), Date.parse(`${d3}T01:00:00.000+01:00`) ],
      ],
      [
        [ "00:30", "01:30", Date.parse(`${d1}T00:30:00.000+00:00`), Date.parse(`${d1}T01:30:00.000+00:00`) ],
        [ "00:30", "01:30", Date.parse(`${d2}T00:30:00.000+00:00`), Date.parse(`${d2}T02:30:00.000+01:00`) ],
        [ "00:30", "01:30", Date.parse(`${d3}T00:30:00.000+01:00`), Date.parse(`${d3}T01:30:00.000+01:00`) ],
      ],
      [
        [ "00:30", "02:00", Date.parse(`${d1}T00:30:00.000+00:00`), Date.parse(`${d1}T02:00:00.000+00:00`) ],
        [ "00:30", "02:00", Date.parse(`${d2}T00:30:00.000+00:00`), Date.parse(`${d2}T03:00:00.000+01:00`) ],
        [ "00:30", "02:00", Date.parse(`${d3}T00:30:00.000+01:00`), Date.parse(`${d3}T02:00:00.000+01:00`) ],
      ],
      [
        [ "00:30", "02:30", Date.parse(`${d1}T00:30:00.000+00:00`), Date.parse(`${d1}T02:30:00.000+00:00`) ],
        [ "00:30", "02:30", Date.parse(`${d2}T00:30:00.000+00:00`), Date.parse(`${d2}T03:30:00.000+01:00`) ],
        [ "00:30", "02:30", Date.parse(`${d3}T00:30:00.000+01:00`), Date.parse(`${d3}T02:30:00.000+01:00`) ],
      ],
      [
        [ "01:00", "01:30", Date.parse(`${d1}T01:00:00.000+00:00`), Date.parse(`${d1}T01:30:00.000+00:00`) ],
        [ "01:00", "01:30", Date.parse(`${d2}T02:00:00.000+01:00`), Date.parse(`${d2}T02:30:00.000+01:00`) ],
        [ "01:00", "01:30", Date.parse(`${d3}T01:00:00.000+01:00`), Date.parse(`${d3}T01:30:00.000+01:00`) ],
      ],
      [
        [ "01:00", "02:00", Date.parse(`${d1}T01:00:00.000+00:00`), Date.parse(`${d1}T02:00:00.000+00:00`) ],
        [ "01:00", "02:00", Date.parse(`${d2}T02:00:00.000+01:00`), Date.parse(`${d2}T03:00:00.000+01:00`) ],
        [ "01:00", "02:00", Date.parse(`${d3}T01:00:00.000+01:00`), Date.parse(`${d3}T02:00:00.000+01:00`) ],
      ],
      [
        [ "01:00", "02:30", Date.parse(`${d1}T01:00:00.000+00:00`), Date.parse(`${d1}T02:30:00.000+00:00`) ],
        [ "01:00", "02:30", Date.parse(`${d2}T02:00:00.000+01:00`), Date.parse(`${d2}T03:30:00.000+01:00`) ],
        [ "01:00", "02:30", Date.parse(`${d3}T01:00:00.000+01:00`), Date.parse(`${d3}T02:30:00.000+01:00`) ],
      ],
      [
        [ "01:30", "01:45", Date.parse(`${d1}T01:30:00.000+00:00`), Date.parse(`${d1}T01:45:00.000+00:00`) ],
        [ "01:30", "01:45", Date.parse(`${d2}T02:30:00.000+01:00`), Date.parse(`${d2}T02:45:00.000+01:00`) ],
        [ "01:30", "01:45", Date.parse(`${d3}T01:30:00.000+01:00`), Date.parse(`${d3}T01:45:00.000+01:00`) ],
      ],
      [
        [ "01:30", "02:00", Date.parse(`${d1}T01:30:00.000+00:00`), Date.parse(`${d1}T02:00:00.000+00:00`) ],
        [ "01:30", "02:00", Date.parse(`${d2}T02:30:00.000+01:00`), Date.parse(`${d2}T03:00:00.000+01:00`) ],
        [ "01:30", "02:00", Date.parse(`${d3}T01:30:00.000+01:00`), Date.parse(`${d3}T02:00:00.000+01:00`) ],
      ],
      [
        [ "01:30", "02:30", Date.parse(`${d1}T01:30:00.000+00:00`), Date.parse(`${d1}T02:30:00.000+00:00`) ],
        [ "01:30", "02:30", Date.parse(`${d2}T02:30:00.000+01:00`), Date.parse(`${d2}T03:30:00.000+01:00`) ],
        [ "01:30", "02:30", Date.parse(`${d3}T01:30:00.000+01:00`), Date.parse(`${d3}T02:30:00.000+01:00`) ],
      ],
      [
        [ "02:00", "02:30", Date.parse(`${d1}T02:00:00.000+00:00`), Date.parse(`${d1}T02:30:00.000+00:00`) ],
        [ "02:00", "02:30", Date.parse(`${d2}T02:00:00.000+01:00`), Date.parse(`${d2}T02:30:00.000+01:00`) ],
        [ "02:00", "02:30", Date.parse(`${d3}T02:00:00.000+01:00`), Date.parse(`${d3}T02:30:00.000+01:00`) ],
      ]
    ];
  },
};

// Sunday, October 29, 2023, 2:00:00 AM clocks are turned backward 1 hour to Sunday, October 29, 2023, 1:00:00 AM
// 1 AM - 2 AM occurs twice
// All event durations are saved according to the time on the clock.
// It might be not possible to create an event during the second occurrence of 1 - 2 AM
const WESTtoWETnonrecurring = {
  timeZone: "Europe/Lisbon",
  dates: ["2023-10-29"],
  times() {
    const [d] = this.dates;
    // prettier-ignore
    return [
      [[ "00:30", "00:45", Date.parse(`${d}T00:30:00.000+01:00`), Date.parse(`${d}T00:45:00.000+01:00`) ]],
      [[ "00:30", "01:00", Date.parse(`${d}T00:30:00.000+01:00`), Date.parse(`${d}T01:00:00.000+01:00`) ]],
      [[ "00:30", "01:30", Date.parse(`${d}T00:30:00.000+01:00`), Date.parse(`${d}T01:30:00.000+01:00`) ]],
      [[ "00:30", "02:00", Date.parse(`${d}T00:30:00.000+01:00`), Date.parse(`${d}T01:00:00.000+00:00`) ]],
      [[ "00:30", "02:30", Date.parse(`${d}T00:30:00.000+01:00`), Date.parse(`${d}T01:30:00.000+00:00`) ]],
      [[ "01:00", "01:30", Date.parse(`${d}T01:00:00.000+01:00`), Date.parse(`${d}T01:30:00.000+01:00`) ]],
      [[ "01:00", "02:00", Date.parse(`${d}T01:00:00.000+01:00`), Date.parse(`${d}T01:00:00.000+00:00`) ]],
      [[ "01:00", "02:30", Date.parse(`${d}T01:00:00.000+01:00`), Date.parse(`${d}T01:30:00.000+00:00`) ]],
      [[ "01:30", "01:45", Date.parse(`${d}T01:30:00.000+01:00`), Date.parse(`${d}T01:45:00.000+01:00`) ]],
      [[ "01:30", "02:00", Date.parse(`${d}T01:30:00.000+01:00`), Date.parse(`${d}T01:00:00.000+00:00`) ]],
      [[ "01:30", "02:30", Date.parse(`${d}T01:30:00.000+01:00`), Date.parse(`${d}T01:30:00.000+00:00`) ]],
      [[ "02:00", "02:30", Date.parse(`${d}T02:00:00.000+00:00`), Date.parse(`${d}T02:30:00.000+00:00`) ]],
    ]
  },
};

// WEST -> WET recurring event
const WESTtoWETrecurring = {
  timeZone: "Europe/Lisbon",
  recurring: { rate: "weekly", days: ["7"] },
  groupId: "1234",
  dates: ["2023-10-22", "2023-10-29", "2023-11-05"],
  times() {
    const [d1, d2, d3] = this.dates;
    // prettier-ignore
    return [
      [
        [ "00:30", "00:45", Date.parse(`${d1}T00:30:00.000+01:00`), Date.parse(`${d1}T00:45:00.000+01:00`) ],
        [ "00:30", "00:45", Date.parse(`${d2}T00:30:00.000+01:00`), Date.parse(`${d2}T00:45:00.000+01:00`) ],
        [ "00:30", "00:45", Date.parse(`${d3}T00:30:00.000+00:00`), Date.parse(`${d3}T00:45:00.000+00:00`) ],
      ],
      [
        [ "00:30", "01:00", Date.parse(`${d1}T00:30:00.000+01:00`), Date.parse(`${d1}T01:00:00.000+01:00`) ],
        [ "00:30", "01:00", Date.parse(`${d2}T00:30:00.000+01:00`), Date.parse(`${d2}T01:00:00.000+01:00`) ],
        [ "00:30", "01:00", Date.parse(`${d3}T00:30:00.000+00:00`), Date.parse(`${d3}T01:00:00.000+00:00`) ],
      ],
      [
        [ "00:30", "01:30", Date.parse(`${d1}T00:30:00.000+01:00`), Date.parse(`${d1}T01:30:00.000+01:00`) ],
        [ "00:30", "01:30", Date.parse(`${d2}T00:30:00.000+01:00`), Date.parse(`${d2}T01:30:00.000+01:00`) ],
        [ "00:30", "01:30", Date.parse(`${d3}T00:30:00.000+00:00`), Date.parse(`${d3}T01:30:00.000+00:00`) ],
      ],
      [
        [ "00:30", "02:00", Date.parse(`${d1}T00:30:00.000+01:00`), Date.parse(`${d1}T02:00:00.000+01:00`) ],
        [ "00:30", "02:00", Date.parse(`${d2}T00:30:00.000+01:00`), Date.parse(`${d2}T01:00:00.000+00:00`) ],
        [ "00:30", "02:00", Date.parse(`${d3}T00:30:00.000+00:00`), Date.parse(`${d3}T02:00:00.000+00:00`) ],
      ],
      [
        [ "00:30", "02:30", Date.parse(`${d1}T00:30:00.000+01:00`), Date.parse(`${d1}T02:30:00.000+01:00`) ],
        [ "00:30", "02:30", Date.parse(`${d2}T00:30:00.000+01:00`), Date.parse(`${d2}T01:30:00.000+00:00`) ],
        [ "00:30", "02:30", Date.parse(`${d3}T00:30:00.000+00:00`), Date.parse(`${d3}T02:30:00.000+00:00`) ],
      ],
      [
        [ "01:00", "01:30", Date.parse(`${d1}T01:00:00.000+01:00`), Date.parse(`${d1}T01:30:00.000+01:00`) ],
        [ "01:00", "01:30", Date.parse(`${d2}T01:00:00.000+01:00`), Date.parse(`${d2}T01:30:00.000+01:00`) ],
        [ "01:00", "01:30", Date.parse(`${d3}T01:00:00.000+00:00`), Date.parse(`${d3}T01:30:00.000+00:00`) ],
      ],
      [
        [ "01:00", "02:00", Date.parse(`${d1}T01:00:00.000+01:00`), Date.parse(`${d1}T02:00:00.000+01:00`) ],
        [ "01:00", "02:00", Date.parse(`${d2}T01:00:00.000+01:00`), Date.parse(`${d2}T01:00:00.000+00:00`) ],
        [ "01:00", "02:00", Date.parse(`${d3}T01:00:00.000+00:00`), Date.parse(`${d3}T02:00:00.000+00:00`) ],
      ],
      [
        [ "01:00", "02:30", Date.parse(`${d1}T01:00:00.000+01:00`), Date.parse(`${d1}T02:30:00.000+01:00`) ],
        [ "01:00", "02:30", Date.parse(`${d2}T01:00:00.000+01:00`), Date.parse(`${d2}T01:30:00.000+00:00`) ],
        [ "01:00", "02:30", Date.parse(`${d3}T01:00:00.000+00:00`), Date.parse(`${d3}T02:30:00.000+00:00`) ],
      ],
      [
        [ "01:30", "01:45", Date.parse(`${d1}T01:30:00.000+01:00`), Date.parse(`${d1}T01:45:00.000+01:00`) ],
        [ "01:30", "01:45", Date.parse(`${d2}T01:30:00.000+01:00`), Date.parse(`${d2}T01:45:00.000+01:00`) ],
        [ "01:30", "01:45", Date.parse(`${d3}T01:30:00.000+00:00`), Date.parse(`${d3}T01:45:00.000+00:00`) ],
      ],
      [
        [ "01:30", "02:00", Date.parse(`${d1}T01:30:00.000+01:00`), Date.parse(`${d1}T02:00:00.000+01:00`) ],
        [ "01:30", "02:00", Date.parse(`${d2}T01:30:00.000+01:00`), Date.parse(`${d2}T01:00:00.000+00:00`) ],
        [ "01:30", "02:00", Date.parse(`${d3}T01:30:00.000+00:00`), Date.parse(`${d3}T02:00:00.000+00:00`) ],
      ],
      [
        [ "01:30", "02:30", Date.parse(`${d1}T01:30:00.000+01:00`), Date.parse(`${d1}T02:30:00.000+01:00`) ],
        [ "01:30", "02:30", Date.parse(`${d2}T01:30:00.000+01:00`), Date.parse(`${d2}T01:30:00.000+00:00`) ],
        [ "01:30", "02:30", Date.parse(`${d3}T01:30:00.000+00:00`), Date.parse(`${d3}T02:30:00.000+00:00`) ],
      ],
      [
        [ "02:00", "02:30", Date.parse(`${d1}T02:00:00.000+01:00`), Date.parse(`${d1}T02:30:00.000+01:00`) ],
        [ "02:00", "02:30", Date.parse(`${d2}T02:00:00.000+00:00`), Date.parse(`${d2}T02:30:00.000+00:00`) ],
        [ "02:00", "02:30", Date.parse(`${d3}T02:00:00.000+00:00`), Date.parse(`${d3}T02:30:00.000+00:00`) ],
      ]
    ];
  },
};

// PST simple events
const PSTnonrecurring = {
  timeZone: "America/Los_Angeles",
  dates: ["2023-03-03"],
  times() {
    const [d] = this.dates;
    // prettier-ignore
    return [
      // begins and ends before midnight UTC
      [[ "13:00", "14:00", Date.parse(`${d}T13:00:00.000-08:00`), Date.parse(`${d}T14:00:00.000-08:00`) ]],
      // begins before, ends after midnight UTC
      [[ "15:00", "17:00", Date.parse(`${d}T15:00:00.000-08:00`), Date.parse(`${d}T17:00:00.000-08:00`) ]],
      // befins and ends after midnight UTC
      [[ "18:00", "19:00", Date.parse(`${d}T18:00:00.000-08:00`), Date.parse(`${d}T19:00:00.000-08:00`) ]],
      // begins before, ends on midnight PST
      [[ "23:00", "00:00", Date.parse(`${d}T23:00:00.000-08:00`), Date.parse(`2023-03-04T00:00:00.000-08:00`) ]],
    ];
  },
};

// PDT simple events
const PDTnonrecurring = {
  timeZone: "America/Los_Angeles",
  dates: ["2023-05-03"],
  times() {
    const [d] = this.dates;
    // prettier-ignore
    return [
      // begins and ends before midnight UTC
      [[ "13:00", "14:00", Date.parse(`${d}T13:00:00.000-07:00`), Date.parse(`${d}T14:00:00.000-07:00`) ]],
      // begins before, ends after midnight UTC
      [[ "14:00", "18:00", Date.parse(`${d}T14:00:00.000-07:00`), Date.parse(`${d}T18:00:00.000-07:00`) ]],
      // befins and ends after midnight UTC
      [[ "18:00", "19:00", Date.parse(`${d}T18:00:00.000-07:00`), Date.parse(`${d}T19:00:00.000-07:00`) ]],
      // begins before, ends on midnight PST
      [[ "23:00", "00:00", Date.parse(`${d}T23:00:00.000-07:00`), Date.parse(`2023-05-04T00:00:00.000-07:00`) ]],
    ];
  },
};

// PST --> PDT nonrecurring
// Sunday, March 12, 2023, 2:00:00 AM clocks are turned forward 1 hour to March 12, 2023, 3:00:00 AM
// 2 AM - 3 AM doesn't exist
const PSTtoPDTnonrecurring = {
  timeZone: "America/Los_Angeles",
  dates: ["2023-03-12"],
  times() {
    const [d] = this.dates;
    // prettier-ignore
    return [
      [[ "01:30", "01:45", Date.parse(`${d}T01:30:00.000-08:00`), Date.parse(`${d}T01:45:00.000-08:00`) ]],
      [[ "01:30", "02:00", Date.parse(`${d}T01:30:00.000-08:00`), Date.parse(`${d}T03:00:00.000-07:00`) ]],
      [[ "01:30", "02:30", Date.parse(`${d}T01:30:00.000-08:00`), Date.parse(`${d}T03:30:00.000-07:00`) ]],
      [[ "01:30", "03:00", Date.parse(`${d}T01:30:00.000-08:00`), Date.parse(`${d}T04:00:00.000-07:00`) ]],
      [[ "01:30", "03:30", Date.parse(`${d}T01:30:00.000-08:00`), Date.parse(`${d}T04:30:00.000-07:00`) ]],
      [[ "02:00", "02:30", Date.parse(`${d}T03:00:00.000-07:00`), Date.parse(`${d}T03:30:00.000-07:00`) ]],
      [[ "02:00", "03:00", Date.parse(`${d}T03:00:00.000-07:00`), Date.parse(`${d}T04:00:00.000-07:00`) ]],
      [[ "02:00", "03:30", Date.parse(`${d}T03:00:00.000-07:00`), Date.parse(`${d}T04:30:00.000-07:00`) ]],
      [[ "02:30", "02:45", Date.parse(`${d}T03:30:00.000-07:00`), Date.parse(`${d}T03:45:00.000-07:00`) ]],
      [[ "02:30", "03:00", Date.parse(`${d}T03:30:00.000-07:00`), Date.parse(`${d}T04:00:00.000-07:00`) ]],
      [[ "02:30", "03:30", Date.parse(`${d}T03:30:00.000-07:00`), Date.parse(`${d}T04:30:00.000-07:00`) ]],
      [[ "03:00", "03:30", Date.parse(`${d}T03:00:00.000-07:00`), Date.parse(`${d}T03:30:00.000-07:00`) ]],
    ]
  },
};

const PSTtoPDTrecurring = {
  timeZone: "America/Los_Angeles",
  recurring: { rate: "weekly", days: ["7"] },
  groupId: "1234",
  dates: ["2023-03-05", "2023-03-12", "2023-03-19"],
  times() {
    const [d1, d2, d3] = this.dates;
    // prettier-ignore
    return [
      [
        [ "01:30", "01:45", Date.parse(`${d1}T01:30:00.000-08:00`), Date.parse(`${d1}T01:45:00.000-08:00`) ],
        [ "01:30", "01:45", Date.parse(`${d2}T01:30:00.000-08:00`), Date.parse(`${d2}T01:45:00.000-08:00`) ],
        [ "01:30", "01:45", Date.parse(`${d3}T01:30:00.000-07:00`), Date.parse(`${d3}T01:45:00.000-07:00`) ],
      ],
      [
        [ "01:30", "02:00", Date.parse(`${d1}T01:30:00.000-08:00`), Date.parse(`${d1}T02:00:00.000-08:00`) ],
        [ "01:30", "02:00", Date.parse(`${d2}T01:30:00.000-08:00`), Date.parse(`${d2}T03:00:00.000-07:00`) ],
        [ "01:30", "02:00", Date.parse(`${d3}T01:30:00.000-07:00`), Date.parse(`${d3}T02:00:00.000-07:00`) ],
      ],
      [
        [ "01:30", "02:30", Date.parse(`${d1}T01:30:00.000-08:00`), Date.parse(`${d1}T02:30:00.000-08:00`) ],
        [ "01:30", "02:30", Date.parse(`${d2}T01:30:00.000-08:00`), Date.parse(`${d2}T03:30:00.000-07:00`) ],
        [ "01:30", "02:30", Date.parse(`${d3}T01:30:00.000-07:00`), Date.parse(`${d3}T02:30:00.000-07:00`) ],
      ],
      [
        [ "01:30", "03:00", Date.parse(`${d1}T01:30:00.000-08:00`), Date.parse(`${d1}T03:00:00.000-08:00`) ],
        [ "01:30", "03:00", Date.parse(`${d2}T01:30:00.000-08:00`), Date.parse(`${d2}T04:00:00.000-07:00`) ],
        [ "01:30", "03:00", Date.parse(`${d3}T01:30:00.000-07:00`), Date.parse(`${d3}T03:00:00.000-07:00`) ],
      ],
      [
        [ "01:30", "03:30", Date.parse(`${d1}T01:30:00.000-08:00`), Date.parse(`${d1}T03:30:00.000-08:00`) ],
        [ "01:30", "03:30", Date.parse(`${d2}T01:30:00.000-08:00`), Date.parse(`${d2}T04:30:00.000-07:00`) ],
        [ "01:30", "03:30", Date.parse(`${d3}T01:30:00.000-07:00`), Date.parse(`${d3}T03:30:00.000-07:00`) ],
      ],
      [
        [ "02:00", "02:30", Date.parse(`${d1}T02:00:00.000-08:00`), Date.parse(`${d1}T02:30:00.000-08:00`) ],
        [ "02:00", "02:30", Date.parse(`${d2}T03:00:00.000-07:00`), Date.parse(`${d2}T03:30:00.000-07:00`) ],
        [ "02:00", "02:30", Date.parse(`${d3}T02:00:00.000-07:00`), Date.parse(`${d3}T02:30:00.000-07:00`) ],
      ],
      [
        [ "02:00", "03:00", Date.parse(`${d1}T02:00:00.000-08:00`), Date.parse(`${d1}T03:00:00.000-08:00`) ],
        [ "02:00", "03:00", Date.parse(`${d2}T03:00:00.000-07:00`), Date.parse(`${d2}T04:00:00.000-07:00`) ],
        [ "02:00", "03:00", Date.parse(`${d3}T02:00:00.000-07:00`), Date.parse(`${d3}T03:00:00.000-07:00`) ],
      ],
      [
        [ "02:00", "03:30", Date.parse(`${d1}T02:00:00.000-08:00`), Date.parse(`${d1}T03:30:00.000-08:00`) ],
        [ "02:00", "03:30", Date.parse(`${d2}T03:00:00.000-07:00`), Date.parse(`${d2}T04:30:00.000-07:00`) ],
        [ "02:00", "03:30", Date.parse(`${d3}T02:00:00.000-07:00`), Date.parse(`${d3}T03:30:00.000-07:00`) ],
      ],
      [
        [ "02:30", "02:45", Date.parse(`${d1}T02:30:00.000-08:00`), Date.parse(`${d1}T02:45:00.000-08:00`) ],
        [ "02:30", "02:45", Date.parse(`${d2}T03:30:00.000-07:00`), Date.parse(`${d2}T03:45:00.000-07:00`) ],
        [ "02:30", "02:45", Date.parse(`${d3}T02:30:00.000-07:00`), Date.parse(`${d3}T02:45:00.000-07:00`) ],
      ],
      [
        [ "02:30", "03:00", Date.parse(`${d1}T02:30:00.000-08:00`), Date.parse(`${d1}T03:00:00.000-08:00`) ],
        [ "02:30", "03:00", Date.parse(`${d2}T03:30:00.000-07:00`), Date.parse(`${d2}T04:00:00.000-07:00`) ],
        [ "02:30", "03:00", Date.parse(`${d3}T02:30:00.000-07:00`), Date.parse(`${d3}T03:00:00.000-07:00`) ],
      ],
      [
        [ "02:30", "03:30", Date.parse(`${d1}T02:30:00.000-08:00`), Date.parse(`${d1}T03:30:00.000-08:00`) ],
        [ "02:30", "03:30", Date.parse(`${d2}T03:30:00.000-07:00`), Date.parse(`${d2}T04:30:00.000-07:00`) ],
        [ "02:30", "03:30", Date.parse(`${d3}T02:30:00.000-07:00`), Date.parse(`${d3}T03:30:00.000-07:00`) ],
      ],
      [
        [ "03:00", "03:30", Date.parse(`${d1}T03:00:00.000-08:00`), Date.parse(`${d1}T03:30:00.000-08:00`) ],
        [ "03:00", "03:30", Date.parse(`${d2}T03:00:00.000-07:00`), Date.parse(`${d2}T03:30:00.000-07:00`) ],
        [ "03:00", "03:30", Date.parse(`${d3}T03:00:00.000-07:00`), Date.parse(`${d3}T03:30:00.000-07:00`) ],
      ],
    ]
  },
};

// Sunday, November 5, 2023, 2:00:00 AM clocks are turned backward 1 hour to Sunday, November 5, 2023, 1:00:00 AM
// 1 AM - 2 AM occurs twice
// All event durations are saved according to the time on the clock.
// It might be not possible to create an event during the second occurrence of 1 - 2 AM
const PDTtoPSTnonrecurring = {
  timeZone: "America/Los_Angeles",
  dates: ["2023-11-05"],
  times() {
    const [d] = this.dates;
    // prettier-ignore
    return [
      [[ "00:30", "00:45", Date.parse(`${d}T00:30:00.000-07:00`), Date.parse(`${d}T00:45:00.000-07:00`) ]],
      [[ "00:30", "01:00", Date.parse(`${d}T00:30:00.000-07:00`), Date.parse(`${d}T01:00:00.000-07:00`) ]],
      [[ "00:30", "01:30", Date.parse(`${d}T00:30:00.000-07:00`), Date.parse(`${d}T01:30:00.000-07:00`) ]],
      [[ "00:30", "02:00", Date.parse(`${d}T00:30:00.000-07:00`), Date.parse(`${d}T01:00:00.000-08:00`) ]],
      [[ "00:30", "02:30", Date.parse(`${d}T00:30:00.000-07:00`), Date.parse(`${d}T01:30:00.000-08:00`) ]],
      [[ "01:00", "01:30", Date.parse(`${d}T01:00:00.000-07:00`), Date.parse(`${d}T01:30:00.000-07:00`) ]],
      [[ "01:00", "02:00", Date.parse(`${d}T01:00:00.000-07:00`), Date.parse(`${d}T01:00:00.000-08:00`) ]],
      [[ "01:00", "02:30", Date.parse(`${d}T01:00:00.000-07:00`), Date.parse(`${d}T01:30:00.000-08:00`) ]],
      [[ "01:30", "01:45", Date.parse(`${d}T01:30:00.000-07:00`), Date.parse(`${d}T01:45:00.000-07:00`) ]],
      [[ "01:30", "02:00", Date.parse(`${d}T01:30:00.000-07:00`), Date.parse(`${d}T01:00:00.000-08:00`) ]],
      [[ "01:30", "02:30", Date.parse(`${d}T01:30:00.000-07:00`), Date.parse(`${d}T01:30:00.000-08:00`) ]],
      [[ "02:00", "02:30", Date.parse(`${d}T02:00:00.000-08:00`), Date.parse(`${d}T02:30:00.000-08:00`) ]],
    ]
  },
};

// WEST -> WET recurring event
const PDTtoPSTrecurring = {
  timeZone: "America/Los_Angeles",
  recurring: { rate: "weekly", days: ["7"] },
  groupId: "1234",
  dates: ["2023-10-29", "2023-11-05", "2023-11-12"],
  times() {
    const [d1, d2, d3] = this.dates;
    // prettier-ignore
    return [
      [
        [ "00:30", "00:45", Date.parse(`${d1}T00:30:00.000-07:00`), Date.parse(`${d1}T00:45:00.000-07:00`) ],
        [ "00:30", "00:45", Date.parse(`${d2}T00:30:00.000-07:00`), Date.parse(`${d2}T00:45:00.000-07:00`) ],
        [ "00:30", "00:45", Date.parse(`${d3}T00:30:00.000-08:00`), Date.parse(`${d3}T00:45:00.000-08:00`) ],
      ],
      [
        [ "00:30", "01:00", Date.parse(`${d1}T00:30:00.000-07:00`), Date.parse(`${d1}T01:00:00.000-07:00`) ],
        [ "00:30", "01:00", Date.parse(`${d2}T00:30:00.000-07:00`), Date.parse(`${d2}T01:00:00.000-07:00`) ],
        [ "00:30", "01:00", Date.parse(`${d3}T00:30:00.000-08:00`), Date.parse(`${d3}T01:00:00.000-08:00`) ],
      ],
      [
        [ "00:30", "01:30", Date.parse(`${d1}T00:30:00.000-07:00`), Date.parse(`${d1}T01:30:00.000-07:00`) ],
        [ "00:30", "01:30", Date.parse(`${d2}T00:30:00.000-07:00`), Date.parse(`${d2}T01:30:00.000-07:00`) ],
        [ "00:30", "01:30", Date.parse(`${d3}T00:30:00.000-08:00`), Date.parse(`${d3}T01:30:00.000-08:00`) ],
      ],
      [
        [ "00:30", "02:00", Date.parse(`${d1}T00:30:00.000-07:00`), Date.parse(`${d1}T02:00:00.000-07:00`) ],
        [ "00:30", "02:00", Date.parse(`${d2}T00:30:00.000-07:00`), Date.parse(`${d2}T01:00:00.000-08:00`) ],
        [ "00:30", "02:00", Date.parse(`${d3}T00:30:00.000-08:00`), Date.parse(`${d3}T02:00:00.000-08:00`) ],
      ],
      [
        [ "00:30", "02:30", Date.parse(`${d1}T00:30:00.000-07:00`), Date.parse(`${d1}T02:30:00.000-07:00`) ],
        [ "00:30", "02:30", Date.parse(`${d2}T00:30:00.000-07:00`), Date.parse(`${d2}T01:30:00.000-08:00`) ],
        [ "00:30", "02:30", Date.parse(`${d3}T00:30:00.000-08:00`), Date.parse(`${d3}T02:30:00.000-08:00`) ],
      ],
      [
        [ "01:00", "01:30", Date.parse(`${d1}T01:00:00.000-07:00`), Date.parse(`${d1}T01:30:00.000-07:00`) ],
        [ "01:00", "01:30", Date.parse(`${d2}T01:00:00.000-07:00`), Date.parse(`${d2}T01:30:00.000-07:00`) ],
        [ "01:00", "01:30", Date.parse(`${d3}T01:00:00.000-08:00`), Date.parse(`${d3}T01:30:00.000-08:00`) ],
      ],
      [
        [ "01:00", "02:00", Date.parse(`${d1}T01:00:00.000-07:00`), Date.parse(`${d1}T02:00:00.000-07:00`) ],
        [ "01:00", "02:00", Date.parse(`${d2}T01:00:00.000-07:00`), Date.parse(`${d2}T01:00:00.000-08:00`) ],
        [ "01:00", "02:00", Date.parse(`${d3}T01:00:00.000-08:00`), Date.parse(`${d3}T02:00:00.000-08:00`) ],
      ],
      [
        [ "01:00", "02:30", Date.parse(`${d1}T01:00:00.000-07:00`), Date.parse(`${d1}T02:30:00.000-07:00`) ],
        [ "01:00", "02:30", Date.parse(`${d2}T01:00:00.000-07:00`), Date.parse(`${d2}T01:30:00.000-08:00`) ],
        [ "01:00", "02:30", Date.parse(`${d3}T01:00:00.000-08:00`), Date.parse(`${d3}T02:30:00.000-08:00`) ],
      ],
      [
        [ "01:30", "01:45", Date.parse(`${d1}T01:30:00.000-07:00`), Date.parse(`${d1}T01:45:00.000-07:00`) ],
        [ "01:30", "01:45", Date.parse(`${d2}T01:30:00.000-07:00`), Date.parse(`${d2}T01:45:00.000-07:00`) ],
        [ "01:30", "01:45", Date.parse(`${d3}T01:30:00.000-08:00`), Date.parse(`${d3}T01:45:00.000-08:00`) ],
      ],
      [
        [ "01:30", "02:00", Date.parse(`${d1}T01:30:00.000-07:00`), Date.parse(`${d1}T02:00:00.000-07:00`) ],
        [ "01:30", "02:00", Date.parse(`${d2}T01:30:00.000-07:00`), Date.parse(`${d2}T01:00:00.000-08:00`) ],
        [ "01:30", "02:00", Date.parse(`${d3}T01:30:00.000-08:00`), Date.parse(`${d3}T02:00:00.000-08:00`) ],
      ],
      [
        [ "01:30", "02:30", Date.parse(`${d1}T01:30:00.000-07:00`), Date.parse(`${d1}T02:30:00.000-07:00`) ],
        [ "01:30", "02:30", Date.parse(`${d2}T01:30:00.000-07:00`), Date.parse(`${d2}T01:30:00.000-08:00`) ],
        [ "01:30", "02:30", Date.parse(`${d3}T01:30:00.000-08:00`), Date.parse(`${d3}T02:30:00.000-08:00`) ],
      ],
      [
        [ "02:00", "02:30", Date.parse(`${d1}T02:00:00.000-07:00`), Date.parse(`${d1}T02:30:00.000-07:00`) ],
        [ "02:00", "02:30", Date.parse(`${d2}T02:00:00.000-08:00`), Date.parse(`${d2}T02:30:00.000-08:00`) ],
        [ "02:00", "02:30", Date.parse(`${d3}T02:00:00.000-08:00`), Date.parse(`${d3}T02:30:00.000-08:00`) ],
      ]
    ];
  },
};

module.exports = {
  generateTestCases,
  WETnonrecurring,
  WESTnonrecurring,
  WETtoWESTnonrecurring,
  WETtoWESTrecurring,
  WESTtoWETnonrecurring,
  WESTtoWETrecurring,
  PSTnonrecurring,
  PDTnonrecurring,
  PSTtoPDTnonrecurring,
  PSTtoPDTrecurring,
  PDTtoPSTnonrecurring,
  PDTtoPSTrecurring,
};
