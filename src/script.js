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
