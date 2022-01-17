const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  },
  allDay: {
    type: String,
  },
});

const Event = mongoose.model("Event", eventSchema);

exports.Event = Event;
