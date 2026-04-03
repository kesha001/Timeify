// // document.body.style.border = "5px solid red";
// console.log("hello extention");
// console.log(window.location.hostname);
// const hostName = window.location.hostname;

// let startTime = new Date().getTime();
// console.log(`Loaded to : ${hostName}`);


// document.addEventListener("visibilitychange", async function() {
//   // console.log(document.hidden, document.visibilityState);
//   // let cat = await browser.storage.local.get("myCat");
//   // console.log(cat);


//   if (document.hidden){
//     let endTime = new Date().getTime();
//     let timeDiff = endTime - startTime;
//     console.log(`Loaded from : ${hostName}`);
//     console.log(`Time spent on this was: ${timeDiff}`);
//   }

//   if (!document.hidden){
//     startTime = new Date().getTime();
//     console.log(`Loaded to : ${hostName}`);
//   }

//   let hostN = await browser.storage.local.get("hostName");
//   // console.log(hostN.hostName);

//   let visits = await browser.storage.local.get("visits");
//   // console.log(visits.visits);
  

//   // visits.visits += 1;

//   await browser.storage.local.set({
//     "visits": visits.visits + 1
//   });

//   // console.log(visits);

  
// }, false);

// browser.storage.local.set({
//   "hostName": hostName,
//   "visits": 1
// }).then(console.log("intialised"));