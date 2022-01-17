const { Event } = require("../models/event");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const events = await Event.find().sort("event");
  res.send(events);
});

router.delete("/", async (req, res) => {
  const event = await Event.findByIdAndRemove(req.body.id);

  if (!event)
    return res.status(404).send("The Event with the given ID was not found");

  res.send(event);
});

router.post("/", async (req, res) => {
  const event = new Event(
    _.pick(req.body, ["title", "start", "end", "allDay"])
  );
  await event.save();
  res.send(event);
});

module.exports = router;
