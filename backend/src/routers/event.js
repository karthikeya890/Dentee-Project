const {
  getEvents,
  addEvent,
  deleteEvent,
  updateEvent,
} = require("../controllers/event");
const { Router } = require("express");
const router = Router();

router.get("/all", getEvents);
router.post("/", addEvent);
router.delete("/", deleteEvent);
router.put("/", updateEvent);
module.exports = router;
