import events from "./main.js";

let pastEvents = events.cardProcess().pastEvents;
events.createCards(pastEvents);
events.createCategories();
events.categoryProcess(pastEvents);