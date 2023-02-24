import events from "./main.js";
let pastEvents = events[0];

const Show = (pastEvents) => {
    let cardList = document.getElementById("cardList");

    pastEvents.forEach(e => {
        cardList.innerHTML += `<div class="card text-center m-2 mt-5">
            <img src="${e.image}" class="card-img-top" alt="imagen">
            <div class="card-body">
                <h5 class="card-title">${e.name}</h5>
                <p class="card-text">${e.description}</p>
                <div class="d-flex justify-content-around">
                    <p class="card-text">Price $ ${e.price}</p>
                    <a href="./details.html" type="button" class="btn btn-outline-secondary btn-sm">ver mas</a>
                </div>           
                </div>
            </div>`
    });
}

Show(pastEvents);