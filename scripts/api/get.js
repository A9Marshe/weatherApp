import { __AAPID } from "./secrets.js";
let lang = 'en', weatherUnit = "metric"
export let getDayWeahter = async function (lon, lat) {
    let weatherData;
    try {
        weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${__AAPID}&units=${weatherUnit}&lang=${lang}`)
        console.styledLog('info', 'fetched weather data');
        return weatherData;

    }
    //note to self: remember that a bad/denied request is not an error so it won't be catched
    catch (error) {
        console.styledLog('error', 'error fetching weather data')
        console.log(error)
    }
}


