document.getElementById("action-btn").addEventListener("click", async () => {
    console.log("Button clicked inside the popup!");
    const arrayData = await browser.runtime.sendMessage({type: 'get_array'});

    const dataJson = JSON.parse(arrayData);
    console.log(dataJson);
    

    const dataElem = document.getElementById("data");
    const list = document.createElement("ul");
    for (let activity in dataJson){
        const activityItem = document.createElement("li");
        activityItem.innerText = `${activity}: ${dataJson[activity]} minutes wasted`;
        list.appendChild(activityItem);
        console.log(activity);
    }
    dataElem.appendChild(list);
});

