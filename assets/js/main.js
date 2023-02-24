import data from "./data.js";

const Normalize = (eDate, cDate) => {
    let eDFilter = "";
    let cDFilter = "";

    for (let i = 0; i < eDate.length; i++) {
        eDFilter += eDate.charAt(i) == "-"? "" : eDate.charAt(i);
        cDFilter += cDate.charAt(i) == "-"? "" : cDate.charAt(i);
    }

    return eDFilter > cDFilter;
}

const Process = () => {
    let cDate = data.currentDate;
    let pastEvents = [];
    let upcomingEvents = [];
    let todayEvents = [];
    
    data.events.forEach(e => {
        let eDate = e.date;

        switch (Normalize(eDate, cDate)) {
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

    return [pastEvents, upcomingEvents, todayEvents];
}

let events = Process();

export default events;