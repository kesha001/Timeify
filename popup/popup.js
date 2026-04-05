document.getElementById("show-data-btn").addEventListener("click", async () => {
    const arrayData = await browser.runtime.sendMessage({type: 'get_activities'});

    const dataJson = JSON.parse(arrayData);
    console.log(dataJson);
    

    const dataElem = document.getElementById("data");
    dataElem.innerHTML = "";

    if (!dataJson){
        dataElem.innerText = "no data";
    }

    const list = document.createElement("ul");
    for (let activity in dataJson){
        const activityItem = document.createElement("li");
        activityItem.innerText = `${activity}: ${dataJson[activity]} minutes wasted`;
        list.appendChild(activityItem);
        console.log(activity);
    }
    dataElem.appendChild(list);
});

document.getElementById("download-json-data-btn").addEventListener("click", async () => {
    await browser.runtime.sendMessage({type: 'download_json_data'});
});

document.addEventListener("DOMContentLoaded", async (event) => {
    const dataElem = document.getElementById("data");
    const API_infoElem = document.createElement("p");
    const urlLink = await getAPIURL();
    const apiPeriod = await getAPISendPeriod();
    API_infoElem.innerText = `Sending data to ${urlLink} every ${apiPeriod} minutes`;
    dataElem.after(API_infoElem);
});

const getAPIURL = async () => {
    const urlLink = await browser.runtime.sendMessage({type: 'get_api_url'});
    return urlLink;
}

const getAPISendPeriod = async () => {
    const period = await browser.runtime.sendMessage({type: 'get_send_activity_period'});
    return period;
}
