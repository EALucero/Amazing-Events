import API from "./data.js";
import events from "./main.js";

let data = await API();
let objs = data.events;

events.controller(data, objs)