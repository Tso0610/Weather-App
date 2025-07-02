const url = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "d00eee09bdc52166531f407b3a01211f";

$(document).ready(function () {
    weather('Barrie');
});
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let seconds = now.getSeconds();
async function weather(cityName) {
    const fullURL = `${url}?q=${cityName}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(fullURL);
        const data = await res.json();
        console.log(data.weather[0].description);
        if (res.ok) {
            weatherShow(data);
        }
        else {
            alert('City not found. Please try again.')
        }
    }
    catch (error) {
        console.error(error);
    }
}


function weatherShow(data) {
    $('#city-name').text(data.name);
    $('#temperature').html(`${Math.round(data.main.temp)}°C`);
    $('#weather-desc').text(data.weather[0].description);
    $('#weather-icon').attr('src',`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    $('#temp-feels-like').html(`${Math.round(data.main.feels_like)}°C`);
    $('#wind-speed').html(`${data.wind.speed} m/s`);
    $('#humidity').html(`${data.main.humidity} %`);
    $('#visibility').html(`${data.visibility / 1000} km`);
    $('#time').html(`${hours}:${minutes}:${seconds}`);
}

