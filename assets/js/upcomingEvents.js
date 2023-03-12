import events from "./main.js";

let upcomingEvents = events.cardProcess().upcomingEvents;

events.createCards(upcomingEvents);
events.createCategories();
events.categoryProcess(upcomingEvents);
events.search(upcomingEvents)