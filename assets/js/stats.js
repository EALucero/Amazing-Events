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
  let porc = e.assistance * 100 / e.capacity;
  return parseFloat(porc);
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
            <span class="ps-5">${h.name}</span><span class="pe-5">${porcEv(h) != 0? porcEv(h).toFixed(2) : 0} %</span>
            </p>`
});

low.forEach(l => {
  lowRows += `<p class="d-flex justify-content-between">
            <span class="ps-5">${l.name}</span><span class="pe-5">${porcEv(l) != 0? porcEv(l).toFixed(2) : 0} %</span>
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
let sumUpAss = [];
let sumPaPrice = [];
let sumPaAss = [];
let upPorcAss = [];
let paPorcAss = [];
let countUp = [];
let countPa = [];

let upcomingEvents = events.cardProcess(data).upcomingEvents;
let pastEvents = events.cardProcess(data).pastEvents;

let upcoList = document.getElementById("upcoList");
let catRows = "";

categories.sort().forEach((cat, i) => {
  catRows += `<p>${cat}</p>`
  sumUpPrice[i] = 0;
  sumUpAss[i] = 0;
  sumPaPrice[i] = 0;
  sumPaAss[i] = 0;
  countUp[i] = 0;
  countPa[i] = 0;
  upPorcAss[i] = 0;
  paPorcAss[i] = 0;
});

const compArray = (events, categories, arr1, arr2, arr3, count) => {
  events.forEach((e) => {  
    categories.forEach((c,i) => {
      if (e.category == c) {
        arr1[i] += e.price;
        arr2[i] += porcEv(e);
        count[i]++;
        arr3[i] = arr2[i] != 0? (arr2[i] / count[i]).toFixed(2) : 0; 
      }   
    });    
  });
};

compArray(upcomingEvents, categories, sumUpPrice, sumUpAss, upPorcAss, countUp);

/* const rowConstruc = (arr, arg) => {
  arr.forEach(a => {
    arg += `<p>$ ${a}</p>`
  });

  return arg;
}

rowConstruc(sumUpPrice, upPriceRows); */

let upPriceRows = "";
let upAssRows = "";

sumUpPrice.forEach(up => upPriceRows += `<p>$ ${up}</p>`);
upPorcAss.forEach(p => upAssRows += `<p>${p} %</p>`);

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
    <td>${upPriceRows}</td>
    <td>${upAssRows}</td>
  </tr>`;

let pastList = document.getElementById("pastList");
let paPriceRows = "";
let paAssRows = ""

compArray(pastEvents, categories, sumPaPrice, sumPaAss, paPorcAss, countPa);

sumPaPrice.forEach(pa => paPriceRows += `<p>$ ${pa}</p>`);
paPorcAss.forEach(p => paAssRows += `<p>${p} %</p>`);

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
    <td>${paPriceRows}</td>
    <td>${paAssRows}</td>
  </tr>`;