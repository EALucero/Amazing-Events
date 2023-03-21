import API from "./data.js";
import events from "./main.js";

let data = await API();
let attArr = [];
let eveCap = [];
let categories = [];

data.events.forEach(e => {
  if (e.assistance == undefined) {
    e.assistance = 0;
  }

  attArr.push(e);
  eveCap.push(e);

  if (!categories.includes(e.category)) {
    categories.push(e.category);
  }
});

let high = [];
let low = [];

const porcEv = (e) => {
  let porc = (e.assistance * 100 / e.capacity);
  return parseFloat(porc).toFixed(2);
}

attArr.sort((a, b) => {
  return (porcEv(a) > porcEv(b) ? -1 : porcEv(a) < porcEv(b) ? 1 : 0);
})

attArr.forEach(e => high.push(e));

attArr.sort(function (a, b) {
  return (porcEv(b) > porcEv(a) ? -1 : porcEv(b) < porcEv(a) ? 1 : 0);
});

attArr.forEach(e => low.push(e));

eveCap.sort((a, b) => {
  return (a.capacity > b.capacity ? -1 : a.capacity < b.capacity ? 1 : 0);
})

let eventList = document.getElementById("eventList");
let highRows = "";
let lowRows = "";
let capRows = "";

high.forEach(h => {
  highRows += `<p class="d-flex justify-content-between">
            <span class="ps-5">${h.name}</span><span class="pe-5">${porcEv(h)} %</span>
            </p>`
});

low.forEach(l => {
  lowRows += `<p class="d-flex justify-content-between">
            <span class="ps-5">${l.name}</span><span class="pe-5">${porcEv(l)} %</span>
            </p>`
});

eveCap.forEach(c => {
  capRows += `<p class="d-flex justify-content-between">
            <span class="ps-5">${c.name}</span><span class="pe-5">${c.capacity}</span>
            </p>`
});

eventList.innerHTML += `<tr>
            <th colspan="3">Events statistics</th>
        </tr>
        <tr class="text-center">
            <td>Events with the highest percentage of attendance</td>
            <td>Events with the lowest percentage of attendance</td>
            <td>Events with larger capacity</td>
        </tr>
        <tr>
            <td>${highRows}</td>
            <td>${lowRows}</td>
            <td>${capRows}</td>
        </tr>`;

let sumUpPrice = [];
let sumPaPrice = 0;
let upcomingEvents = events.cardProcess(data).upcomingEvents;
let pastEvents = events.cardProcess(data).pastEvents;

let upcoList = document.getElementById("upcoList");
let catRows = "";

categories.sort().forEach(cat => {
  catRows += `<p>${cat}</p>`
});

const compArray = (a, b) => {
  a.forEach((e, i) => {
    console.log(e.category, b[i]);
    if (e.category == b[i] && b[i] != undefined) {
      sumUpPrice[i] += e.price;
    }
  })
}

compArray(upcomingEvents, categories);

console.log(sumUpPrice);

upcoList.innerHTML += `<tr>
    <th colspan="3">Upcoming events statistics by category</th>
  </tr>
  <tr>
    <td>Categories</td>
    <td>Revenues</td>
    <td>Percentage of attendance</td>
  </tr>
  <tr>
    <td>${catRows}</td>
    <td>${sumUpPrice}</td>
    <td></td>
  </tr>`;

let pastList = document.getElementById("pastList");
let pastRows = "";

pastList.innerHTML += `<tr>
    <th colspan="3">Past events statistics by category</th>
  </tr>
  <tr>
    <td>Categories</td>
    <td>Revenues</td>
    <td>Percentage of attendance</td>
  </tr>
  <tr>
    <td>${catRows}</td>
    <td></td>
    <td></td>
  </tr>`;