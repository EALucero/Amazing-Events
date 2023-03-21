async function API() {
    let urlApi = "https://mindhub-xj03.onrender.com/api/amazing";
    let data;

    try {
        const res = await fetch(urlApi);
        data = await res.json();
    } catch (err) {
        return console.log(`ocurrio un error: ${err.message}`);
    }

    return data;
};

export default API;

/* filter: (params) => {
    let inputSearch = document.querySelector('input[name=search]');
    let chkboxList = document.querySelectorAll("input[type=checkbox]");
    let categories = [];
    let selected = [];

    inputSearch.addEventListener("input", () => {
        renderSearch();
    })

    function getCheckedTypes() {
        let chequeados = [];

        chkboxList.forEach(checkbox => {
            if (checkbox.checked) {
                chequeados.push(checkbox.value);
            }
        })
        return chequeados;
    }

    function renderSearch() {
        let chequeados = getCheckedTypes();
        let inputText = inputSearch.value.trim().toLowerCase();
        let htmlResuldados = "";

        let results =  params.filter(event =>
            event.name.toLowerCase().includes(inputText)
            || event.description.toLowerCase().includes(inputText));

        if (chequeados.length > 0) {
            results = results.filter(e => chequeados.includes(e.category))
        }

        if (results.length < 1) {
            htmlResuldados = '<h3>No event was found, try again</h3>'
        } 

        if (chequeados.length > 0) {
            results = results.filter(pokemon => {
                let pokemonTypes = pokemon.types.map(item => item.type.name);
                //forma 1
                let pasaFiltro = false;
                pokemonTypes.forEach(tipo => {
                    if (chequeados.includes(tipo)) {
                        pasaFiltro = true;
                    }
                })
                return pasaFiltro;
                // forma 2
                // return chequeados.some(type => pokemonTypes.includes(type));
            })
        }
        events.createCards(results);
    }
} */