import events from "./main.js";

let upcomingtEvents = events.cardProcess().upcomingEvents;
events.createCards(upcomingtEvents);
events.createCategories();
events.categoryProcess(upcomingtEvents);