const CHECK_ACTIVITY_PERIOD_IN_MINUTES = 0.5;
const CLEAN_ACTIVITY_STORAGE_IN_MINUTES = 0.5;

let storageActivities;

browser.alarms.onAlarm.addListener((e) => console.log("hello alarm"));
browser.alarms.onAlarm.addListener(handleAlarm);

browser.runtime.onInstalled.addListener(async () => {
    console.log("intialising");

    const checkActivityAlarm = await browser.alarms.get("checkActivity");
    if (!checkActivityAlarm){
        browser.alarms.create("checkActivity", {periodInMinutes: CHECK_ACTIVITY_PERIOD_IN_MINUTES});
    }

    const cleanActivityStorageAlarm = await browser.alarms.get("cleanActivityStorage");
    if (!cleanActivityStorageAlarm){
        browser.alarms.create("cleanActivityStorage", {periodInMinutes: CLEAN_ACTIVITY_STORAGE_IN_MINUTES});
    }
});


async function handleAlarm(alarmInfo) {
    console.log(`on alarm: ${alarmInfo.name}; ${alarmInfo.periodInMinutes}`);
    if (alarmInfo.name === "checkActivity"){    
        const detectionIntervalInSeconds = 60*CHECK_ACTIVITY_PERIOD_IN_MINUTES;
        let querying = browser.idle.queryState(detectionIntervalInSeconds);
        querying.then(onGot);
    }
    if (alarmInfo.name === "cleanActivityStorage"){
        cleanActivityStorage();
    }
}

function onGot(newState) {
    if (newState === "idle") {
        console.log("Idle state");
    } else if (newState === "active") {
        // we should experiment with it and query later, whats different between active and not hidden tab
        browser.tabs.query({currentWindow: true, active: true}).then(logTabs, console.error);
        console.log("Active state");
    }
}

async function logTabs(tabs) {
    if (tabs.length === 0){
        return;
    }
    let tab = tabs[0]; // assume that there is only 1 active tab 
    // getting url and hostname on the tab
    const tabURL = tab.url;
    const tabURLObj = new URL(tabURL);
    const tabHostName = tabURLObj.hostname;

    if (tabHostName === ""){
        console.log("hostname is empty...returning");
        return;
    }
    
    console.log("you are on : ");
    console.log(tabHostName);


    storageActivities = await browser.storage.local.get("activities");
    console.log(JSON.stringify(storageActivities));

    const activityStorageIsEmpty = Object.keys(storageActivities).length === 0 && storageActivities.constructor === Object;
    
    if (activityStorageIsEmpty){
        console.log("storage is empty!");
        intialiseEmptyActivityStorage();
    }

    updateActivityTime(tabHostName, CHECK_ACTIVITY_PERIOD_IN_MINUTES);
}

const intialiseEmptyActivityStorage = async () => {
    const newActivityStorageObj = {};
    newActivityStorageObj["activities"] = {};
    await browser.storage.local.set(newActivityStorageObj);
}

const updateActivityTime = async (hostName, timeToAdd) => {
    if (storageActivities["activities"].hasOwnProperty(hostName)){
        storageActivities["activities"][hostName] += timeToAdd;
    } else {
        storageActivities["activities"][hostName] = timeToAdd;
    }
    await browser.storage.local.set(storageActivities);
}

const cleanActivityStorage = async () => {
    console.log("Storage is cleaned !");
    // await browser.storage.local.clean();
}


// does not work with on installed


// browser.runtime.onStartup.addListener(() => {
    
// })



// browser.alarms.create("checkActivity", {periodInMinutes: CHECK_ACTIVITY_PERIOD_IN_MINUTES});
// browser.alarms.create("cleanActivityStorage", {periodInMinutes: CLEAN_ACTIVITY_STORAGE_IN_MINUTES});

// browser.alarms.onAlarm.addListener((e) => console.log("hello alarm"));
// browser.alarms.onAlarm.addListener(handleAlarm);

// console.log(browser.alarms.onAlarm.hasListener(handleAlarm));
// console.log(await browser.alarms.getAll());
    

