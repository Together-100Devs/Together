const User = require("../models/User");

module.exports = {
  // TODO: Please refactor me
  ensureAuth: async function (req, res, next) {
    // Handle test authentication via Authorization header
    if (process.env.NODE_ENV === "test" && req.headers.authorization) {
      const token = req.headers.authorization;

      // Map authorization tokens to Discord IDs
      const tokenToDiscordId = {
        "100_DEVER": "1",
        SECOND_100_DEVER: "2",
        JOHN_DOE: "3",
        MODERATOR_USER: "4",
      };

      const discordId = tokenToDiscordId[token];
      if (discordId) {
        const user = await User.findOne({ discordId });
        if (user) {
          req.user = user;
          return next();
        }
      }

      // If no user found, return 401
      return res.sendStatus(401);
    }

    if (req.isAuthenticated()) {
      /* istanbul ignore next */
      if (process.env.NODE_ENV !== "test")
        console.log("user is authenticated, proceeeding");
      return next();
    } else {
      /* istanbul ignore next */
      if (process.env.NODE_ENV !== "test")
        console.log("user is not authenticated");
      res.sendStatus(401);
    }
  },

  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/dashboard");
    }
  },
};
