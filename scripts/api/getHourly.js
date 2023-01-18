

//this async function is called by main to prepare weather data(the daily weather cards and the hourly cards for each relevant weather)
//every time this function runs it writes to the session Storage in order to preserve fecthed results from API call
// the API in use has no way to allow fetching singular day data (the call in use return @@cnt=40 entries that are seperated by 3 hours interval)
//storing this info in sessionStorage makes it way simpler when switching the active day 
export async function getHourlyData({ lon, lat, lang = "en", weatherUnit = "metric", cnt = 40 }) {
    // i is used as an ID counter
    let i = 0;
    try {
        // setting up relavent html nodes references
        let weeklySummary = document.getElementById('weekly-summary')
        let detailedHourly = document.getElementById('detailed-hourly')
        // rendering loaders
        weeklySummary.innerHTML = loaderComponent('loader-weekly-summary');
        detailedHourly.innerHTML = ''
        // fetching data and storing result in proper days object 
        // (each day is array of hours, each hour is an object representing the relevant weahter state)
        const days = await __getHourlyWeather({ lon, lat, lang, weatherUnit, cnt })
        console.styledLog("success", "got detailed weather forecast for the next five days");
        document.getElementById('loader-weekly-summary').remove();

        days.forEach((day) => {
            //this desctructuring helps seperating the day summary(aka the clickable card) from the hours for that day
            let [weekDay, ...data] = [...day];
            sessionStorage.setItem(`day_${i}`, JSON.stringify(day))
            __setWeekDaySummary(weekDay, i++);
        });
        let activeDay = document.getElementById('weekly-summary');
        activeDay.firstChild.setAttribute('activeDay', 'active');
        __setWeekDayDetails(JSON.parse(sessionStorage.getItem('day_0')), 0);


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

        console.styledLog('success', 'fetched weekly weather success')

        //turning the response JSON object into an array
        let dateList = result.list.map((entry) => entry);

        // days from Sunday(0) tp Saturday(6) are stored in the days object, 
        // each entry has an array of hours,
        // each hour is an object (a weather state object that holds relevant information) 
        let days = {};

        //grouping given hours into relevant days 
        dateList.forEach((day) => {
            //the index is not a numerical value since apparently JS automatically sorts keys of numerical values
            // _[index] won't be sorted, which is needed in order to get the NEXT 5 following days in order
            let index = "_" + new Date(day.dt_txt).getDay();
            if (days[index] === undefined) days[index] = [];
            days[index].push(day)
        });

        // arrayFromDays is an array of days, with each day being an array that contains relevant hours of that day 
        let arrayFromDays = [];
        for (const [key, value] of Object.entries(days)) {
            arrayFromDays.push(value);
        }
        //removing entries for days 6 and 7 (if the exist)
        arrayFromDays = arrayFromDays.slice(0, 5)

        //setting up each day
        arrayFromDays.forEach((value, index) => {

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
        });
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

const __setWeekDaySummary = (weekDay, eventHandlerIdentifier) => {
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
    daySummary.setAttribute('dayId', eventHandlerIdentifier);

    daySummary.addEventListener('click', () => {
        let active = document.querySelectorAll('[activeDay="active"]');
        for (const element of active) {
            element.removeAttribute('activeDay')
        }
        // active.removeAttribute('activeDay')
        daySummary.setAttribute('activeDay', 'active');
        const dayID = daySummary.getAttribute('dayId');
        console.log(dayID);
        const activeDay = JSON.parse(sessionStorage.getItem(`day_${dayID}`))
        __setWeekDayDetails(activeDay, dayID);
    })
    return daySummary
}

const __setWeekDayDetails = (day, id) => {
    console.log('setewe');
    console.log(id)
    let detailedHourly = document.getElementById('detailed-hourly');
    console.styledLog('info', `setting up hours for day ID:${id}`)
    console.log(detailedHourly)
    //emptying previous values 
    detailedHourly.innerHTML = "";
    // console.log(detailedHourly)
    day = Array.from(day)
    day.forEach(hour => {
        detailedHourly.appendChild(__setDayHour(hour))
    });
    let DayHours = document.createElement('article');
}
const __setDayHour = (hourData) => {
    const { Maximum, Minimum, description, hour, day, state, icon_id } = hourData;

    let DayHours = document.createElement('article');
    DayHours.classList = "hourlyWeatherCard"
    DayHours.innerHTML = `<img class="weather-icon" src="http://openweathermap.org/img/wn/${icon_id}@2x.png" alt="${description}" title="${description}">
    <h4>${day}: ${state}</h4>
    <span><time datetime="${hour}">${hour}</time></span>
    <span class="dataChip hot">${Maximum}</span>
    <span class="dataChip cold">${Minimum}</span>`
    return DayHours;
}
