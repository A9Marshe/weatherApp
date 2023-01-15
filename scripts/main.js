// the import from DevUtils is used to append styledLog method to the console object for eas of acces while in development
import { updateThemeMode, updateThemeScheme } from "./Theme.js";
import { } from "./devUtils.js";
import { setupLocation } from "./jeoLoc.js";
import { getHourlyData } from "./api/getHourly.js"
import { getdayData } from "./api/getCurrentWeather.js"
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
let { lon, lat } = await setupLocation();
getdayData({ lon, lat })

// let icon = await fetch(` http://openweathermap.org/img/wn/${currentweather.icon_id}d@2x.png`)

// getHourlyData({ lon, lat });
// getHourlyData({ lon, lat });

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
