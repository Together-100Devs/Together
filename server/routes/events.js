const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/events");

//test function
router.get("/ping", eventsController.ping);

router.post("/create", eventsController.create);

module.exports = router;