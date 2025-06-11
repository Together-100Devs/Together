const request = require("supertest");
const app = require("../../app");
const mockDiscordResponses = require("../passport-discord-mocking");
const {
  validFormDataNonRecurr,
  validFormDataRecurr,
  startIn5Days,
} = require("../unit/validateBodyMockData");

const { Database, asGuest } = require("../utils");

describe("event routes", () => {
  const testDb = new Database();

  beforeEach(async () => {
    await testDb.setUp();
    mockDiscordResponses();

    // create test users
    const User = require("../../models/User");
    await User.create([
      {
        discordId: "1",
        displayName: "100Dever#0001",
        discriminator: "0001",
        avatar: null,
        isModerator: false,
        socials: [],
        bio: "",
        needsToBeWelcome: false,
      },
      {
        discordId: "2",
        displayName: "100Dever2#0002",
        discriminator: "0002",
        avatar: null,
        isModerator: false,
        socials: [],
        bio: "",
        needsToBeWelcome: false,
      },
      {
        discordId: "3",
        displayName: "John Doe#0003",
        discriminator: "0003",
        avatar: null,
        isModerator: false,
        socials: [],
        bio: "",
        needsToBeWelcome: false,
      },
      {
        discordId: "4",
        displayName: "Moderator#0004",
        discriminator: "0004",
        avatar: null,
        isModerator: true,
        socials: [],
        bio: "",
        needsToBeWelcome: false,
      },
    ]);
  });

  afterEach(async () => {
    await testDb.tearDown();
  });

  describe("GET /api/events/:id", function () {
    it("returns 404 if event doesn't exist", async () => {
      const eventRes = await request(app).get("/api/events/9999");
      expect(eventRes.statusCode).toBe(404);
    });

    it("returns the event", async () => {
      const createEventRes = await request(app)
        .post("/api/events")
        .send(validFormDataNonRecurr);
      const event = createEventRes.body.events[0];

      const eventRes = await request(app).get(`/api/events/${event._id}`);

      expect(eventRes.statusCode).toBe(200);
      expect(eventRes.body.title).toBe(validFormDataNonRecurr.title);
    });

    it("returns the event and excludes user data when accessed as a guest", async () => {
      const createEventRes = await request(app)
        .post("/api/events")
        .send(validFormDataNonRecurr);
      const event = createEventRes.body.events[0];

      const eventRes = await asGuest(async () => {
        return request(app).get(`/api/events/${event._id}`);
      });

      expect(eventRes.statusCode).toBe(200);
      expect(eventRes.body.title).toBe(validFormDataNonRecurr.title);
      expect(eventRes.body.user).toBe(undefined);
    });
  });

  describe("GET /api/events", function () {
    it("should return empty array when there are no events", async () => {
      const res = await request(app).get("/api/events");
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body).toHaveLength(0);
    });

    it("should return an array of all events", async () => {
      const resPost = await request(app)
        .post("/api/events")
        .send(validFormDataNonRecurr);
      expect(resPost.statusCode).toBe(201);

      const res = await request(app).get("/api/events");
      expect(res.statusCode).toBe(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body).toHaveLength(1);
    });

    it("should return an array of events in specified date range", async () => {
      await request(app).post("/api/events").send(startIn5Days);

      const now = new Date();
      const start = now.getTime();
      const in3Days = new Date().setDate(now.getDate() + 3);
      const in10Days = new Date().setDate(now.getDate() + 10);

      const res = await request(app).get(
        `/api/events?from=${start}&to=${in3Days}`
      );
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveLength(0);

      const res2 = await request(app).get(
        `/api/events?from=${in3Days}&to=${in10Days}`
      );
      expect(res2.statusCode).toBe(200);
      expect(res2.body).toHaveLength(1);
    });

    it("returns array of events and excludes user data when accessed as a guest", async () => {
      await request(app).post("/api/events").send(validFormDataNonRecurr);

      const eventsRes = await asGuest(async () => {
        return request(app).get("/api/events");
      });

      expect(eventsRes.statusCode).toBe(200);
      expect(eventsRes.body).toHaveLength(1);
      expect(eventsRes.body[0].user).toBe(undefined);
    });
  });

  describe("POST /api/events", () => {
    it("should create non-recurring event", async () => {
      const res = await request(app)
        .post("/api/events")
        .send(validFormDataNonRecurr);
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Event created!");
      expect(res.body.events).toHaveLength(1);
    });

    it("should create recurring event", async () => {
      const res = await request(app)
        .post("/api/events")
        .send(validFormDataRecurr);
      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe("Event created!");
      expect(res.body.events).toHaveLength(6);
    });
  });

  describe("DELETE /api/events/:id", () => {
    it("deletes event if it exists", async () => {
      const createEventRes = await request(app)
        .post("/api/events")
        .set("Authorization", "100_DEVER")
        .send(validFormDataNonRecurr);
      const event = createEventRes.body.events[0];

      const deleteRes = await request(app)
        .delete(`/api/events/${event._id}`)
        .set("Authorization", "100_DEVER");
      expect(deleteRes.statusCode).toBe(204);

      const getRes = await request(app).get("/api/events");
      expect(getRes.body).toHaveLength(0);
    });

    it("returns 404 if event doesn't exist", async () => {
      const _id = "63c722239b1a9104e164d728";
      const deleteRes = await request(app)
        .delete(`/api/events/${_id}`)
        .set("Authorization", "100_DEVER");
      expect(deleteRes.statusCode).toBe(404);
    });

    it("should allow moderator to delete any event", async () => {
      // create regular (non moderator) user to create event
      const createEventRes = await request(app)
        .post("/api/events")
        .set("Authorization", "100_DEVER")
        .send(validFormDataNonRecurr);
      const event = createEventRes.body.events[0];

      // delete as moderator
      const resDel = await request(app)
        .delete(`/api/events/${event._id}`)
        .set("Authorization", "MODERATOR_USER");
      expect(resDel.statusCode).toBe(204);

      // verify deletion
      const getRes = await request(app).get("/api/events");
      expect(getRes.body).toHaveLength(0);
    });

    it("should prevent non-moderator from deleting other's events", async () => {
      // create an event as a regular user
      const createEventRes = await request(app)
        .post("/api/events")
        .set("Authorization", "100_DEVER")
        .send(validFormDataNonRecurr);
      const event = createEventRes.body.events[0];

      // try to delete the event as second non-moderator user
      const deleteRes = await request(app)
        .delete(`/api/events/${event._id}`)
        .set("Authorization", "SECOND_100_DEVER");
      expect(deleteRes.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/events/deleteAllEvents/:groupId", () => {
    it("should return 404 if no events found", async () => {
      const groupId = "1234";
      const deleteRes = await request(app)
        .delete(`/api/events/deleteAllEvents/${groupId}`)
        .set("Authorization", "100_DEVER");
      expect(deleteRes.statusCode).toBe(404);
    });

    it("deletes all events in group", async () => {
      const createEventRes = await request(app)
        .post("/api/events")
        .set("Authorization", "100_DEVER")
        .send(validFormDataRecurr);
      const event = createEventRes.body.events[0];

      const deleteRes = await request(app)
        .delete(`/api/events/deleteAllEvents/${event.groupId}`)
        .set("Authorization", "100_DEVER");
      expect(deleteRes.statusCode).toBe(204);

      const getRes = await request(app).get("/api/events");
      expect(getRes.body).toHaveLength(0);
    });
  });
});
