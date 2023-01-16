//loader component reference, this component is used to signal that JS is fetching certain resource(s)
const loaderComponent = '<div class="loader-element"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>'


export async function getdayData({ lon, lat, lang = "en", weatherUnit = "metric" }) {
  try {
    // appending loaders
    let currentLocation = document.getElementById('current-location');
    let daySum = document.getElementById('day-summary')
    let dayDetails = document.getElementById("day-details");

    daySum.innerHTML = loaderComponent;
    currentLocation.innerHTML = loaderComponent;
    dayDetails.innerHTML = loaderComponent;

    //fetching data and storing result in proper objects
    const { CurrentCity_Dt, currentSummary, currentDetails } = await __getDayWeahter({ lon, lat, weatherUnit });
    console.styledLog("success", "got today's weather, updating UI");

    //this is for the city, country, and current date
    currentLocation.innerHTML =
      `<div class="place-date">
    <h1 id="current-location-name">${CurrentCity_Dt.city}, ${CurrentCity_Dt.country}</h1>
    <p title="${CurrentCity_Dt.date}"><time id="date-time" datetime="${CurrentCity_Dt.date}">${new Date(CurrentCity_Dt.date).toDateString()
      }</time ></p >
    </div > `


    //set up today summary card (icon and current degrees)
    daySum.innerHTML = `<div><img src="http://openweathermap.org/img/wn/${currentSummary.icon_id}@2x.png" alt="${currentSummary.description}" title="${currentSummary.description}" ></div><h4> ${currentSummary.temp}&deg; C</h4>`

    // setup today details cars 
    // dayDetails.innerHTML =
    //   `<ol><div class="day-detail-entry" translate="no"> <p> more info provided by </p> <p><a href="">weatherapi</a> </p> </div></li></ol>`
    for (const [key, value] of Object.entries(currentDetails)) {
      dayDetails.innerHTML += ` <div class="day-detail-entry"><p>${key}</p><p class="dataChip --primary">${value}</p></div>
      `

    }
    dayDetails.innerHTML += `<ol><div class="day-detail-entry" translate="no"> <p> more info provided by </p> <p><a href="https://openweathermap.org/weather-conditions">OpenWeatherAPI</a> </p> </div></li></ol>`

    // return res;
  } catch (error) {
    console.styledLog('error', 'error occured while loading day data')
    console.error(error);
  }
}


var __getDayWeahter = async function ({ lon, lat, lang, weatherUnit }) {
  try {
    let { __APPID } = await import("./secrets.js");
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${__APPID}&units=${weatherUnit}&lang=${lang}`);
    let result = await response.json();
    console.styledLog("info", "fetched weather data");
    return {
      CurrentCity_Dt: {
        country: result.sys.country,
        city: result.name,
        date: Date(result.dt)
      },
      currentSummary: {
        icon_id: result.weather[0].icon,
        description: result.weather[0].description,
        state: result.weather[0].main,
        temp: result.main.temp,
      },
      currentDetails: {

        "Feels Like": result.main.feels_like,
        "Minimum": result.main.temp_min,
        "Maximum": result.main.temp_max,
        "Wind Speed": result.wind.speed,
        "Sea Level": result.main.sea_level,
        "Humidity": result.main.humidity,

      }
    };
  } catch (error) {
    //note to self: remember that a bad/denied request is not an error so it won't be catched
    console.styledLog("error", "error fetching weather data");
    console.log(error);
  }
};