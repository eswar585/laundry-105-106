// ==========================================
// Laundry Tracker V2
// Live Weather (Open-Meteo API)
// ==========================================

const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weatherCondition");

const humidityElement = document.querySelectorAll(".weather-info strong")[0];
const windElement = document.querySelectorAll(".weather-info strong")[1];
const rainElement = document.querySelectorAll(".weather-info strong")[2];

const weatherIcon = document.querySelector(".weather-icon");

// ------------------------------------------

function weatherEmoji(code){

    if(code === 0)
        return "☀️";

    if(code === 1 || code === 2)
        return "🌤️";

    if(code === 3)
        return "☁️";

    if(code >= 45 && code <= 48)
        return "🌫️";

    if(code >= 51 && code <= 67)
        return "🌦️";

    if(code >= 71 && code <= 77)
        return "❄️";

    if(code >= 80 && code <= 82)
        return "🌧️";

    if(code >= 95)
        return "⛈️";

    return "☀️";

}

// ------------------------------------------

function weatherText(code){

    if(code === 0)
        return "Clear Sky";

    if(code === 1)
        return "Mainly Clear";

    if(code === 2)
        return "Partly Cloudy";

    if(code === 3)
        return "Cloudy";

    if(code >=45 && code<=48)
        return "Fog";

    if(code>=51 && code<=67)
        return "Drizzle";

    if(code>=71 && code<=77)
        return "Snow";

    if(code>=80 && code<=82)
        return "Rain";

    if(code>=95)
        return "Thunderstorm";

    return "Unknown";

}

// ------------------------------------------

async function loadWeather(lat, lon){

    try{

        const url =
`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&hourly=precipitation_probability&forecast_days=1`;

        const response = await fetch(url);

        const data = await response.json();

        const current = data.current;

        temperature.innerText =
        Math.round(current.temperature_2m) + "°C";

        weatherCondition.innerText =
        weatherText(current.weather_code);

        weatherIcon.innerText =
        weatherEmoji(current.weather_code);

        humidityElement.innerText =
        current.relative_humidity_2m + "%";

        windElement.innerText =
        current.wind_speed_10m + " km/h";

        rainElement.innerText =
        data.hourly.precipitation_probability[0] + "%";

    }

    catch(error){

        console.error(error);

        weatherCondition.innerText =
        "Unable to load weather";

    }

}

// ------------------------------------------

function getLocation(){

    if(!navigator.geolocation){

        weatherCondition.innerText =
        "Location Not Supported";

        return;

    }

    navigator.geolocation.getCurrentPosition(

        position=>{

            loadWeather(

                position.coords.latitude,

                position.coords.longitude

            );

        },

        ()=>{

            // Default Location
            // Vijayawada

            loadWeather(

                16.5062,

                80.6480

            );

        }

    );

}

getLocation();

// Refresh Every 30 Minutes

setInterval(getLocation,1800000);

console.log("Weather Loaded");
