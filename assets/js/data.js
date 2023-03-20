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