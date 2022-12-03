const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/events");

//test function
router.get("/ping", eventsController.ping);

router.post("/create", eventsController.create);

router.get('/', eventsController.getAll);

router.get('/:id', eventsController.getOne);

module.exports = router;
