//Use .env file in config folder
require("dotenv").config();
const path = require("path");
const { parse } = require("url");

const express = require("express");
const app = express();
const flash = require("express-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const logger = require("morgan");
const passport = require("passport");

const { prepareNextApp } = require("server/lib/next");

const connectDB = require("./config/database");
const mockUser = require("./config/mockUser.json")
const eventsRoutes = require("./routes/events");
const mainRoutes = require("./routes/main");


// Passport config
require("./config/passport")(passport);

(async () => {
  //Body Parsing
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  //Logging
  app.use(logger("dev"));


  // Setup Sessions - stored in MongoDB
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "keyboard cat",
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  );

  // Render React as View
  // app.use(express.static(path.join(__dirname, "..", "client", "build")));

  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  if (process.env.NODE_ENV === "development" && process.env.MOCK_USER === "true") {
    console.log("In development - using mocked user")
    app.use((req, res, next) => {
      req.user = mockUser;
      next()
    })
  }

  //Use flash messages for errors, info, ect...
  app.use(flash());

  //Setup Routes For Which The Server Is Listening
  app.use("/", mainRoutes);
  app.use("/events", eventsRoutes);

  // 404 handler
  // No idea why this was causing 404 error for all routes
  // app.use((req, res) => {
  //   res.status(404).json({ message: "Not found" });
  // });

  // error handler
  app.use((err, req, res, next) => {
    const { status = 500, message = "Server error", stack } = err;
    console.log(stack);
    res.status(status).json({ message });
  });

  const nextApp = await prepareNextApp();
  const nextHandler = nextApp.getRequestHandler();
  const Database = await connectDB();

  // Set Next Routes
  app.get("*", (req, res) => {
    nextHandler(req, res, parse(req.url, true));
  })

  //Server Running
  app.listen(process.env.PORT, () => {
    console.log(
      `Server is running on ${process.env.PORT}, you better catch it!`
    );
  });
})()