
export async function getdayData({ lon, lat, lang = "en", weatherUnit = "metric" }) {
  try {
    const res = await __getDayWeahter({ lon, lat, weatherUnit });
    console.styledLog("success", "got today's weather, updating UI");
    // UPDATING HTML VALUES 
    let currentLocation = document.getElementById('current-location-name');
    console.log(currentLocation)
    currentLocation.innerText = `${res.city}, ${res.country}`
    return res;
  } catch (error) {
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
      date: Date(result.dt),
      icon_id: result.weather[0].icon,
      state: result.weather[0].main,
      temp: result.main.temp,
      feels_like: result.main.feels_like,
      temp_min: result.main.temp_min,
      temp_max: result.main.temp_max,
      wind_speed: result.wind.speed,
      humidity: result.main.humidity,
      sea_level: result.main.sea_level,
      country: result.sys.country,
      city: result.name,
    };
  } catch (error) {
    //note to self: remember that a bad/denied request is not an error so it won't be catched
    console.styledLog("error", "error fetching weather data");
    console.log(error);
  }
};