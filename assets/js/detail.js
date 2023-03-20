/* import data from "./data.js" */
import API from "./data.js";

let data = await API();

const queryString = location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const event = data.events.find(e => e._id == id)

let detail = document.getElementById("detail");

detail.innerHTML = `<img class="detailImage" src="${event.image}" alt="evento">
    <div class="text-center p-5">
        <h2>${event.name}</h2>
        <p>Date: ${event.date}</p>
        <p>${event.description}</p>
        <h5>${event.category}</h5>
        <p>Place: ${event.place}</p>
        <p>Capacity: ${event.capacity}</p>
        <p>Assistance: ${!isNaN(event.assistance)?event.assistance : "in progress"}</p>
        <p>Price: $${event.price}</p>
        <a href="./" type="button" class="btn btn-outline-primary btn-sm mt-2">Return</a>
    </div>`;
    