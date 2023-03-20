import API from "./data.js";
import events from "./main.js";

let data = await API();
let objs = events.cardProcess(data).pastEvents;

events.controller(data, objs)