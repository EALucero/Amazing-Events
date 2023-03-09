import data from "./data.js";
import events from "./main.js";

events.createCards(data.events);
events.createCategories();
events.categoryProcess(data.events);