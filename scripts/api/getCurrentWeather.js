
export async function getdayData({ lon, lat, lang = "en", weatherUnit = "metric" }) {
  try {
    //setting up relavent html nodes references
    let currentLocation = document.getElementById('current-location');
    let daySum = document.getElementById('day-summary')
    let dayDetails = document.getElementById("day-details");

    //rendering loaders
    currentLocation.innerHTML = loaderComponent('loader-currentLocation');
    daySum.innerHTML = loaderComponent('loader-daySum');
    dayDetails.innerHTML = loaderComponent('loader-dayDetails');

    //fetching data and storing result in proper objects
    const { CurrentCity_Dt, currentSummary, currentDetails } = await __getDayWeahter({ lon, lat, weatherUnit });
    console.styledLog("success", "got today's weather, updating UI");

    //rendering city & date
    document.getElementById("loader-currentLocation").remove()
    currentLocation.innerHTML += __setLocationAndDate({ CurrentCity_Dt });

    //rendering day summary
    document.getElementById('loader-dayDetails').remove()
    daySum.innerHTML = __setDaySummary({ currentSummary });

    //rendering day details
    for (const [key, value] of Object.entries(currentDetails)) {
      dayDetails.innerHTML += __setDayDetails({ key, value });
    }
    dayDetails.innerHTML += `<ol><div class="day-detail-entry" translate="no"> <p> more info provided by </p> <p><a href="https://openweathermap.org/weather-conditions">OpenWeatherAPI</a> </p> </div></li></ol>`

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


//loader component reference, this component is used to signal that JS is fetching certain resource(s)
const loaderComponent = (id) => {
  return `<div id="${id}" class="loader-element"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>`
}

const __setLocationAndDate = ({ CurrentCity_Dt }) => {
  let city = CurrentCity_Dt.city,
    date = CurrentCity_Dt.date,
    country = CurrentCity_Dt.country;
  return `<div class="place-date">
  <h1 id="current-location-name">${city}, ${country}</h1>
  <p title="${date}"><time id="date-time" datetime="${date}">${new Date(date).toDateString()
    }</time ></p >
  </div > `
}

const __setDaySummary = ({ currentSummary }) => {
  let icon_id = currentSummary.icon_id,
    description = currentSummary.description,
    temp = currentSummary.temp;
  return `<div><img src="http://openweathermap.org/img/wn/${icon_id}@2x.png" alt="${description}" title="${description}" ></div><h4> ${temp}&deg; C</h4>`

}

const __setDayDetails = ({ key, value }) => {
  return ` <div class="day-detail-entry"><p>${key}</p><p class="dataChip --primary">${value}</p></div>`
}
