const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    CYPRESS_NO_DELAYS: process.env.CYPRESS_NO_DELAYS,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      require("@cypress/code-coverage/task")(on, config);
      on("task", {
        clearDatabase() {
          require("dotenv").config({ path: "./server/config/.env" });
          return require("./server/config/database")().then(async conn => {
            for (const { name } of await conn.connection.db
              .listCollections()
              .toArray()) {
              await conn.connection.db.collection(name).deleteMany();
            }
            return null;
          });
        },
        createEvent({
          title,
          description,
          startAt,
          endAt,
          location,
          user,
          groupId,
        }) {
          require("dotenv").config({ path: "./server/config/.env" });
          return require("./server/config/database")().then(async () => {
            const { Event } = require("./server/models/Event");
            const event = await Event.create({
              title,
              description,
              startAt,
              endAt,
              location,
              user,
              groupId,
            });
            return event;
          });
        },
        generateObjectId() {
          return require("mongoose").Types.ObjectId().toString();
        },
      });
      return config;
    },
  },
});
