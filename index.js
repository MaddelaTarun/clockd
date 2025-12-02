const sun = document.getElementById("icon-sun");
const moon = document.getElementById("icon-moon");
const themeButton = document.getElementById("theme");

const formatToggle = document.getElementById("format-toggle");
const secondsToggle = document.getElementById("seconds-toggle");
const navLinks = document.querySelectorAll("#nav-center a");
const screens = document.querySelectorAll(".screen");
const timerMessage = document.getElementById("timer-message");
const stopWatchMessage = document.getElementById("stopwatch-message");

let is24Hour = true;
let showSeconds = true;

themeButton.addEventListener("click", ()=> {
    document.body.classList.toggle("dark");

    const isLight = document.body.classList.contains("dark");

    sun.style.display = isLight ? "inline" : "none";
    moon.style.display = isLight ? "none" : "inline";
})

function updateClock() {

    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    let period = "";
    if(!is24Hour) {
        period = hours >= 12 ? "PM":"AM";
        hours = hours % 12 || 12;
    }

    hours = hours.toString().padStart(2,"0");
    minutes = minutes.toString().padStart(2,"0");
    seconds = seconds.toString().padStart(2,"0");

    let timeString = `${hours}:${minutes}`

    if(showSeconds) {
        timeString += `:${seconds}`
    }

    if(!is24Hour) {
        timeString += ` ${period}`
    }
    document.getElementById("clock").textContent = timeString;
}

navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const screenName = link.dataset.screen;
        const targetScreen = document.getElementById(`screen-${screenName}`);
        if(!targetScreen) return;

        screens.forEach((screen) => {
            screen.style.display = "none";
        })

        targetScreen.style.display = "block";

        if(screenName === "timer" && timerMessage) {
            timerMessage.textContent = "still in progress";
        }

        if(screenName === "stopwatch" && stopWatchMessage) {
            stopWatchMessage.textContent = "still in progress";
        }
    })
})


// navLinks.forEach((link) => {
//     link.addEventListener("click", (event) => {
//       event.preventDefault();
  
//       const screenName = link.dataset.screen;
//       const targetScreen = document.getElementById(`screen-${screenName}`);
//       if (!targetScreen) return;
  
//       // hide all screens
//       screens.forEach((screen) => {
//         screen.style.display = "none";
//       });
  
//       // show the selected screen
//       targetScreen.style.display = "block";
  
//       // when timer is selected, show "still in progress"
//       if (screenName === "timer" && timerMessage) {
//         timerMessage.textContent = "still in progress

formatToggle.addEventListener("click", () => {
    is24Hour = !is24Hour;

    formatToggle.textContent = is24Hour ? "[ 12h ]" : " [ 24h ]"

    updateClock();
})

secondsToggle.addEventListener("click", () => {
    showSeconds = !showSeconds;

    secondsToggle.textContent = showSeconds ? "[ hide seconds ]" : "[ show seconds ]"

    updateClock();
})

updateClock();
setInterval(updateClock,1000)