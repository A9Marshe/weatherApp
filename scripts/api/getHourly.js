export async function getHourlyData({ lon, lat, lang = "en", weatherUnit = "metric", cnt = 3 }) {
    try {
        const res = await __getHourlyWeather({ lon, lat, lang, weatherUnit, cnt })
        console.styledLog("success", "got today's weather");
        return res;
    }
    catch (e) {
        console.styledLog("error", "failed to get hourly data");
        console.error(e)
    }
}

let __getHourlyWeather = async function ({ lon, lat, lang, weatherUnit, cnt }) {
    try {
        let { __APPID } = await import("./secrets.js");
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${__APPID}&units=${weatherUnit}&lang=${lang}`);
        //api.openweathermap.org/data/2.5/forecast?lat={{lat}}&lon={{lon}}&appid={{apiKey}}&units=metric&cnt=3
        let result = await response.json();
        console.styledLog("info", "fetched weather data");

    } catch (error) {
        //note to self: remember that a bad/denied request is not an error so it won't be catched
        console.styledLog("error", "error fetching weather data");
        console.log(error);
    }
};
