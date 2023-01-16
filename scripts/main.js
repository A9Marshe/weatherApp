// the import from DevUtils is used to append styledLog method to the console object for eas of acces while in development
import { updateThemeMode, updateThemeScheme } from "./Theme.js";
import { } from "./devUtils.js";
import { setupLocation } from "./jeoLoc.js";
import { getDayWeahter } from "./api/get.js";

//assign click event listenrs to buttons with their appropriate function invocations
document
  .querySelectorAll("[data-color]")
  .forEach((b) =>
    b.addEventListener("click", (e) => updateThemeScheme(e.target.value))
  );

document.getElementById('theme-scheme-select').addEventListener('change', (e) => {
  updateThemeScheme(e.target.value)
})

// const svg = document.querySelector("svg  path.cls-1");
// console.log(svg)
// // svg.setAttribute('style', "fill:#182094")
// document.querySelector('#button').addEventListener('click', getCoord);

let lon, lat;
async function getdatData() {
  try {
    let { lon, lat } = await setupLocation();
    let response = await getDayWeahter(lon, lat);
    console.styledLog('success', 'got today\'s weather')
    let res = await response.json();
    console.table(res)
    return {
      "icon_id": res.weather[0],
      "temp": res.main.temp,
      "feels_like": res.main.feels_like,
      "temp_min": res.main.temp_min,
      "temp_max": res.main.temp_max,
      "wind_speed": res.wind.speed,
      "humidity": res.main.humidity,
      "sea_level": res.main.sea_level,
      "country": res.sys.country,
      "city": res.name,
    }
    console.table(res);
  } catch (error) {
    console.styledLog('error', 'unable to get today\'s weather');
    console.log(error)
  }
}
getdatData()


// let app = document.querySelector('header');

// let button = document.createElement('button');
// button.textContent = "get weather";
// button.addEventListener('click', () => document.removeChild())
// button.className = "btn "
// let place = document.getElementsByClassName("place-date");
// let header = document.getElementsByTagName("header")
// // body.removeChild(button)
// console.log(place);
// place.prepend(button);


// button.remove();// let langs = ['CSS', 'JavaScript', 'TypeScript'];

// let nodes = langs.map(lang => {
//     let li = document.createElement('li');
//     li.textContent = lang;
//     return li;
// });
// console.log(nodes)
// app.prepend(...nodes);