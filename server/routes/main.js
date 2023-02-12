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
    /* istanbul ignore next  */
    if (process.env.NODE_ENV !== 'test') console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    /* istanbul ignore next  */
    if (err && process.env.NODE_ENV !== 'test') console.log('Error : Failed to destroy the session during logout.', err)
    req.user = null
    return res.json({ message: 'Logout successful.' })
  })
});
router.get(
  "/auth/discord/callback",
  passport.authenticate("discord", {
    failureRedirect: authRedirectUrl,
    successRedirect: authRedirectUrl,
  })
);

//with the detection of 100Dever passport will pass back one of three things
//The req.user, null, or a string "User is not in 100Devs"
//Considering a string is truthy this .get distinguishes between the string and req.user
router.get("/getDisplayName", (req, res) => {
  
  if(req.session.isNot100Dever){
    res.json("User is not in 100Devs")
  } else {
    res.json(req.user || null);
  }
});

router.delete("/needsToBeWelcome", async (req, res) => {
  if (req.user.needsToBeWelcome) {
    req.user.needsToBeWelcome = undefined
    await req.user.save();
    res.json(req.user || null);
  } 
})

module.exports = router;
