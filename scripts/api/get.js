let lang = "en",
  weatherUnit = "metric";

async function loadAPI() {}
export let getDayWeahter = async function (lon, lat) {
  let weatherData;
  try {
    let __APPID = await import("./secrets.js");
    weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${__AAPID}&units=${weatherUnit}&lang=${lang}`
    );
    console.styledLog("info", "fetched weather data");
    return weatherData;
  } catch (error) {
    //note to self: remember that a bad/denied request is not an error so it won't be catched
    console.styledLog("error", "error fetching weather data");
    console.log(error);
  }
};
