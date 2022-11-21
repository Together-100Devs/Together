const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const passport = require("passport")

//Main Routes - simplified for now

//Discord Authentication Routes
router.get('/auth/discord', passport.authenticate('discord'));
router.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/',
    successRedirect: '/'
}))

module.exports = router;
