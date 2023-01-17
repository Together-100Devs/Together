const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/events");
const auth = require("../middleware/auth");


//test function
router.post("/create", auth.ensureAuth, eventsController.create);

router.get("/", eventsController.getAll);

router.get("/:id", eventsController.getOne);

router.delete("/:id", auth.ensureAuth, eventsController.deleteEvent)

router.delete("/deleteAllEvents/:groupId", auth.ensureAuth, eventsController.deleteAllEvents)

module.exports = router;
