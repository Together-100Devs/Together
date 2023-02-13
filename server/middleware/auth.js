module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      /* istanbul ignore next  */
      if (process.env.NODE_ENV !== 'test') console.log("user is authenticated, proceeeding")
      return next();
    } else {
      /* istanbul ignore next  */
      if (process.env.NODE_ENV !== 'test') console.log("user is not authenticated")
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


