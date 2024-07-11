// script.js
let startTime;
let updatedTime;
let difference;
let tInterval;
let savedTime = 0;
let running = false;

const display = document.querySelector(".display");
const startStopBtn = document.getElementById("startStop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");
const lapTimesList = document.getElementById("lapTimes");

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);

function startStop() {
  if (!running) {
    startTime = new Date().getTime() - savedTime;
    tInterval = setInterval(getShowTime, 10);
    running = true;
    startStopBtn.textContent = "Stop";
    resetBtn.disabled = true;
    lapBtn.disabled = false;
  } else {
    savedTime = new Date().getTime() - startTime;
    clearInterval(tInterval);
    running = false;
    startStopBtn.textContent = "Start";
    resetBtn.disabled = false;
    lapBtn.disabled = true;
  }
}

function reset() {
  clearInterval(tInterval);
  savedTime = 0;
  running = false;
  startStopBtn.textContent = "Start";
  resetBtn.disabled = true;
  lapBtn.disabled = true;
  display.textContent = "00:00:00:000";
  lapTimesList.innerHTML = "";
}

function lap() {
  const lapTime = display.textContent;
  const li = document.createElement("li");
  li.textContent = lapTime;
  li.classList.add("list-group-item");
  lapTimesList.appendChild(li);
}

function getShowTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  const milliseconds = difference % 1000;

  display.textContent =
    (hours < 10 ? "0" : "") +
    hours +
    ":" +
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds +
    ":" +
    (milliseconds < 100 ? (milliseconds < 10 ? "00" : "0") : "") +
    milliseconds;
}
