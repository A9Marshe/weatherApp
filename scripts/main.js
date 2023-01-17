// the import from DevUtils is used to append styledLog method to the console object for eas of acces while in development
import { updateThemeMode, updateThemeScheme } from "./Theme.js";
import { } from "./devUtils.js";
import { setupLocation } from "./jeoLoc.js";
import { getHourlyData } from "./api/getHourly.js"
import { getdayData } from "./api/getCurrentWeather.js"


// const svg = document.querySelector("svg  path.cls-1");
// console.log(svg)
// // svg.setAttribute('style', "fill:#182094")
// document.querySelector('#button').addEventListener('click', getCoord);
let { lon, lat } = await setupLocation();
console.styledLog("info", "getting day data");

async function setupDayData({ lon, lat }) {
  let res = await getdayData({ lon, lat });
  // res = Array.from(res);
  console.table(res)
}
setupDayData({ lon, lat })
getHourlyData({ lon, lat })

document.getElementById('button-update').addEventListener('click', () => { setupDayData({ lon, lat }) })
