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

// City Input Function

function showTemperature(response) {
  let temperature = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  let weatherCondition = document.querySelector("#weather-condition");

  temperature.innerHTML = Math.round(response.data.temperature.current);
  humidity.innerHTML = Math.round(response.data.temperature.humidity);
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", `${response.data.condition.icon_url}`);
  weatherCondition.innerHTML = response.data.condition.description;
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

// Search City - Enter Temperature, Humidity, WindSpeed

let cityInput = document.querySelector("#form");
cityInput.addEventListener("submit", enterCity);
