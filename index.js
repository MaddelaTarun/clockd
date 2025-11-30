const sun = document.getElementById("icon-sun");
const moon = document.getElementById("icon-moon");
const themeButton = document.getElementById("theme");

const formatToggle = document.getElementById("format-toggle");
const secondsToggle = document.getElementById("seconds-toggle")

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

formatToggle.addEventListener("click", () => {
    is24Hour = !is24Hour;

    formatToggle.textContent = is24Hour ? "[ 12h ]" : " [ 24h ]"

    updateClock();
})

updateClock();
setInterval(updateClock,1000)