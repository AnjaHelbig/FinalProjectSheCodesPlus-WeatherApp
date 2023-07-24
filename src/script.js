// API Key

let apiKey = "f6314bt59a4db7709bf2fa9bob1f9379";

// Time Date Definitions

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// weather forecast functions

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response);

  let forecast = response.data.daily;
  console.log(forecast);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
                <div class="weatherForecastDate">${formatDay(
                  forecastDay.time
                )}</div>
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                    forecastDay.condition.icon
                  }.png"
                  alt=""
                  width="100"
                />
                <div class="weatherForecastTemperatures">
                  <span class="weatherForecastTempMax">${Math.round(
                    forecastDay.temperature.maximum
                  )}°</span>
                  <span class="weatherForecastTempMin">${Math.round(
                    forecastDay.temperature.minimum
                  )}°</span>
                </div>
              </div>
              `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  let urlForecast = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(urlForecast).then(displayForecast);
}

// City Input Function - Adjusting Entries for Temperature, Humidity, WindSpeed, Weather Condition, Icon

function showTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  let weatherCondition = document.querySelector("#weather-condition");

  celciusTemperature = response.data.temperature.current;

  temperature.innerHTML = Math.round(response.data.temperature.current);
  humidity.innerHTML = Math.round(response.data.temperature.humidity);
  windSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
  iconElement.setAttribute(
    "src",
    `${response.data.condition.icon_url}`,
    (width = 100)
  );
  weatherCondition.innerHTML = response.data.condition.description;

  getForecast(response.data.coordinates);
}

function callApi(city) {
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(showTemperature);
}

function enterCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityChanged = document.querySelector("#city");
  cityInput = `${cityInput.value}`;
  cityChanged.innerHTML = `${cityInput}`;

  callApi(cityInput);
}

// Functions - Temperature Conversion

function convertToFahrenheit(event) {
  event.preventDefault();
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelcius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celciusTemperature);
}

// Time Date Script

let now = new Date();

let date = document.querySelector("#date");
let day = now.getDate();
let month = months[now.getMonth()];
let year = now.getFullYear();
let weekDay = weekDays[now.getDay()];
date.innerHTML = `${weekDay}: ${day}.${month} ${year}`;

let time = document.querySelector("#time");
let hour = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  let minutesstring = `0${minutes}`;
  time.innerHTML = `${hour}:${minutesstring}`;
} else {
  time.innerHTML = `${hour}:${minutes}`;
}

// Function Current Position

function showCurrentPosition(response) {
  let currentCity = document.querySelector("#city");
  let currentTemperature = document.querySelector("#temperature");
  let currentWeatherCondition = document.querySelector("#weather-condition");
  let currentHumidity = document.querySelector("#humidity");
  let currentWindSpeed = document.querySelector("#wind-speed");
  let currentIconElement = document.querySelector("#icon");

  celciusTemperature = response.data.temperature.current;

  currentCity.innerHTML = response.data.city;
  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  currentWeatherCondition.innerHTML = response.data.condition.description;
  currentHumidity.innerHTML = response.data.temperature.humidity;
  currentWindSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
  currentIconElement.setAttribute("src", `${response.data.condition.icon_url}`);

  getForecast(response.data.coordinates);
}

function getLatLon(position) {
  let lat = `${position.coords.latitude}`;
  let lon = `${position.coords.longitude}`;

  let urlLatLon = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(urlLatLon).then(showCurrentPosition);
}

// Default place and weather conditions

navigator.geolocation.getCurrentPosition(getLatLon);

// Search City - Enter Temperature, Humidity, WindSpeed, Weather Condition, Icon

let celciusTemperature = null;

let cityInput = document.querySelector("#form");
cityInput.addEventListener("submit", enterCity);

// Temperature conversion (Celcius / Fahrenheit)

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);
