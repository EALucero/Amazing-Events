const events = {
    controller: (data, objs) => {
        events.cardProcess(data)
        events.createCategories(objs)
        events.filter(objs);
        /* events.search(objs) */
        events.createCards(objs)
    },
    date: (eDate, cDate) => {
        let eDFilter = Number(eDate.split("-").join(""));
        let cDFilter = Number(cDate.split("-").join(""));
        return eDFilter > cDFilter;
    },
    cardProcess: (data) => {
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

        return { pastEvents, upcomingEvents, todayEvents };
    },
    createCards: (params) => {
        let cardList = document.getElementById("cardList");
        let cards = "";

        params.forEach(e => {
            cards += `<div class="card text-center m-4">
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
    createCategories: (params) => {
        let categories = [];

        params.forEach(e => {
            if (!categories.includes(e.category)) {
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
    filter: (params) => {
        let chkboxList = document.querySelectorAll("input[type=checkbox]");
        let inputSearch = document.querySelector('input[name=search]');

        chkboxList.forEach(chk => {
            chk.addEventListener("change", () => {
                renderSearch();
            })
        })

        inputSearch.addEventListener("input",() => {
            renderSearch();
        })

        function isChecked() {
            let checkList = [];

            chkboxList.forEach(checkbox => {
                if (checkbox.checked) {
                    checkList.push(checkbox.value);
                }
            });
            
            return checkList;
        }

        function renderSearch() {
            let checkList = isChecked();
            let inputText = inputSearch.value.trim().toLowerCase();

            let results = params.filter(event =>
                event.name.toLowerCase().includes(inputText)
                || event.description.toLowerCase().includes(inputText));

            if(checkList.length > 0){
                results = results.filter(e => checkList.includes(e.category))
            } 

            let error = document.getElementById("error");

            if (results.length > 0) {
                error.innerHTML = "";
                events.createCards(results);
            } else {
                error.innerHTML = "<p>Not found</p>";
                events.createCards(params);
            }
        }
    }
};

export default events;