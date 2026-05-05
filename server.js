import express from "express";
import fetch from "node-fetch";
import ical from "node-ical";

const app = express();

const CAL_URL = "https://calendar.google.com/calendar/ical/undergrandradio%40gmail.com/public/basic.ics ";

app.get("/schedule", async (req, res) => {
  const data = await ical.async.fromURL(CAL_URL);
  
  const events = Object.values(data)
    .filter(e => e.type === "VEVENT")
    .map(e => ({
      title: e.summary,
      start: e.start,
      end: e.end
    }));

  res.json(events);
});

app.listen(3001, () => console.log("Server running"));
