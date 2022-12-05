const express = require("express");
const router = express.Router();
const passport = require("passport");

//Main Routes - simplified for now
const authRedirectUrl =
  process.env.OAUTH_REDIRECT_URL || "http://localhost:3000";
//Discord Authentication Routes
router.get("/auth/discord", passport.authenticate("discord"));
router.get("/auth/logout", (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err) console.log('Error : Failed to destroy the session during logout.', err)
    req.user = null
    return res.json({message: 'Logout successful.'})
  })
});
router.get(
  "/auth/discord/callback",
  passport.authenticate("discord", {
    failureRedirect: authRedirectUrl,
    successRedirect: authRedirectUrl,
  })
);
router.get("/getDisplayName", (req, res) => {
  res.json(req.user || null);
});

module.exports = router;
