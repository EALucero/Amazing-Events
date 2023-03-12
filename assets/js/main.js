import data from "./data.js";

const events = {
    date: (eDate, cDate) => {
        let eDFilter = Number(eDate.split("-").join(""));
        let cDFilter = Number(cDate.split("-").join(""));
        return eDFilter > cDFilter;
    },
    cardProcess: () => {
        let cDate = data.currentDate;
        let pastEvents = [];
        let upcomingEvents = [];
        let todayEvents = [];
        
        data.events.forEach(e => {
            let eDate = e.date;

            switch (events.date(eDate, cDate)) {
                case true:
                    upcomingEvents.push(e);
                    break;
                case false:
                    pastEvents.push(e);
                    break;
                default:
                    todayEvents.push(e);
                    break;
            }
        });

        return {pastEvents, upcomingEvents, todayEvents};
    },
    createCards: (params) => {   
        let cardList = document.getElementById("cardList");
        let cards = "";

        params.forEach(e => { 
            cards += `<div class="card text-center m-2 mt-5">
                    <img src="${e.image}" class="card-img-top" alt="imagen">
                    <div class="card-body">
                        <h5 class="card-title">${e.name}</h5>
                        <p class="card-text">${e.description}</p>
                        <div class="d-flex justify-content-around mt-5">
                            <p class="card-price">Price $ ${e.price}</p>
                            <a href="./details.html?id=${e._id}" type="button" class="btn btn-outline-secondary btn-sm">ver mas</a>
                        </div>           
                    </div>
                </div>`
        });

        cardList.innerHTML = cards;
    },
    createCategories: () => {
        let categories = [];

        data.events.forEach(e => {
            if(!categories.includes(e.category)) {
                categories.push(e.category);
            }
        });

        let checkList = document.getElementById("checkList");
        let checkboxes = "";

        categories.forEach(cat => { 
            checkboxes += `<div class="form-check">
                <input class="form-check-input flexCheck" type="checkbox" id="${cat}"value="${cat}">
                <label class="form-check-label" form="${cat}">${cat}</label>
            </div>`
        });

        checkList.innerHTML += checkboxes;
    },
    categoryProcess: (params) => {
        let chkboxList = document.querySelectorAll("input[type=checkbox]");    
        let selected = [];
        
        chkboxList.forEach(chk => {
            chk.onclick = () => {       
                let selectedHTML = [];
                selected = Array.from(chkboxList).filter(i => i.checked).map(i => i.value);

                if (selected.length > 0) {
                    params.forEach(e => {
                        if (!selectedHTML.includes(e) && selected.includes(e.category)) {
                            selectedHTML.push(e);
                        }                  
                    });

                    events.createCards(selectedHTML);
                    events.search(selectedHTML)
                } else {
                    events.createCards(params)
                }   
            }    
        });
    },
    search: (params) => {
        let form = document.querySelector('form');

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let inputSearch = document.querySelector('input[name=search]').value;
            let inputText = inputSearch.trim().toLowerCase();
            let results = [];
        
            params.forEach(e => {
                if(e.name.toLowerCase().includes(inputText) || e.description.toLowerCase().includes(inputText)) {
                    results.push(e);
                }
            });

            if (results.length > 0) {
                events.createCards(results);
                events.search(results);
            } /* else {
                console.log("t");
                let error = document.querySelector('error');
                error.innerHTML += "<p>not results</p>";
            } */
        }); 
    }
};

export default events;