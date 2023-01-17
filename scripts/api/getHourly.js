

export async function getHourlyData({ lon, lat, lang = "en", weatherUnit = "metric", cnt = 40 }) {
    try {
        // setting up relavent html nodes references
        let weeklySummary = document.getElementById('weekly-summary')

        // rendering loaders
        weeklySummary.innerHTML = loaderComponent('loader-weekly-summary');
        // fetching data and storing result in proper days object 
        // (each day is array of hours, each hour is an object representing the relevant weahter state)
        const days = await __getHourlyWeather({ lon, lat, lang, weatherUnit, cnt })
        console.styledLog("success", "got detailed weather forecast for the next five days");
        document.getElementById('loader-weekly-summary').remove();
        days.forEach((day) => {
            //this desctructuring helps seperating the day summary(aka the clickable card) from the hours for that day
            let [weekDay, ...details] = [...day];
            __setWeekDaySummary(weekDay);
        });
        let activeDay = document.getElementById('weekly-summary');
        activeDay.firstChild.setAttribute('active', 'active')
        console.log(activeDay.firstChild)

    }

    catch (e) {
        console.styledLog("error", "failed to get hourly data");
        console.error(e)
    }
}

const __getHourlyWeather = async function ({ lon, lat, lang, weatherUnit, cnt }) {
    try {
        let { __APPID } = await import("./secrets.js");
        console.styledLog("info", "fetching weekly weather data");
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${__APPID}&units=${weatherUnit}&lang=${lang}&cnt=${cnt}`);
        let result = await response.json();

        console.styledLog('success', 'fetch weekly weather success')
        //turning the response JSON object into an array
        let dateList = result.list.map((entry) => entry);

        // days from Sunday(0) tp Saturday(6) are stored in the days object, 
        // each entry has an array of hours,
        // each hour is an object (a weather state object that holds relevant information) 
        let days = {};

        //grouping given hours into relevant days 
        dateList.forEach((day) => {
            //the index is not a numverical value since apparently JS automatically sorts keys of numerical values
            // _[index] won't be sorted, which is needed in order to get the NEXT 5 following days in order
            let index = "_" + new Date(day.dt_txt).getDay();
            if (days[index] === undefined) days[index] = [];
            days[index].push(day)
        }, days);
        let arrayFromDays = [];
        for (const [key, value] of Object.entries(days)) {
            arrayFromDays.push(value);
        }
        //removing entries for days 6 and 7
        arrayFromDays = arrayFromDays.slice(0, 5)
        //setting up each day
        arrayFromDays.forEach((value, index) => {
            console.styledLog('info', index)
            let newvalue = value.map((hourEntry) => {
                return {
                    "day": new Intl.DateTimeFormat('en-us', { weekday: 'long' }).format(new Date(hourEntry.dt_txt)),
                    "hour": new Intl.DateTimeFormat('en-us', { hour: 'numeric', minute: 'numeric' }).format(new Date(hourEntry.dt_txt)),
                    "icon_id": hourEntry.weather[0].icon,
                    "description": hourEntry.weather[0].description,
                    "state": hourEntry.weather[0].main,
                    "main": hourEntry.main.temp,
                    "Feels Like": hourEntry.main.feels_like,
                    "Minimum": hourEntry.main.temp_min,
                    "Maximum": hourEntry.main.temp_max,
                    "Wind Speed": hourEntry.wind.speed,
                    "Sea Level": hourEntry.main.sea_level,
                    "Humidity": hourEntry.main.humidity,
                }
            });
            //only the needed values are kept and other values are 'pruned'
            arrayFromDays[index] = newvalue;
        })
        return arrayFromDays;

    } catch (error) {
        //note to self: remember that a bad/denied request is not an error so it won't be catched
        console.styledLog("error", "error fetching weather data");
        console.log(error);
    }
};

const loaderComponent = (id) => {
    return `<div id="${id}" class="loader-element"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>`
}

const __setWeekDaySummary = (weekDay) => {
    let weeklySummary = document.getElementById('weekly-summary');
    let icon_id = weekDay.icon_id,
        description = weekDay.description,
        day = weekDay.day,
        main = Math.round(weekDay.main) + "&degC";
    let daySummary = document.createElement('article');
    daySummary.classList = 'weatherCard'
    daySummary.innerHTML = ` <img class="weather-icon" src="http://openweathermap.org/img/wn/${icon_id}@2x.png" alt="${description}" title="${description}">
    <div><h4>${day}</h4>
    <span style="white-space: nowrap;">${description}</span>
    </div>
    <span style class="dataChip --secondary" >${main}</span>`
    weeklySummary.appendChild(daySummary)

    return daySummary
}

const __setWeekDayDetails = (hoursList) => {

}