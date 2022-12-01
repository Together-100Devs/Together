const express = require("express");
const router = express.Router();
const passport = require("passport");

//Main Routes - simplified for now
const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
//Discord Authentication Routes
router.get("/auth/discord", passport.authenticate("discord"));
router.get(
  "/auth/discord/callback",
  passport.authenticate("discord", {
    failureRedirect: baseUrl,
    successRedirect: baseUrl,
  })
);

module.exports = router;
