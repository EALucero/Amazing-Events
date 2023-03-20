import API from "./data.js";
import events from "./main.js";

let data = await API();
let objs = events.cardProcess(data).upcomingEvents;

events.controller(data, objs)