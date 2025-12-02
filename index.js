const sun = document.getElementById("icon-sun");
const moon = document.getElementById("icon-moon");
const themeButton = document.getElementById("theme");

const formatToggle = document.getElementById("format-toggle");
const secondsToggle = document.getElementById("seconds-toggle");
const navLinks = document.querySelectorAll("#nav-center a");
const screens = document.querySelectorAll(".screen");
const timerMessage = document.getElementById("timer-message");
const stopWatchMessage = document.getElementById("stopwatch-message");

const introOverlay = document.getElementById("intro-overlay");
const introText = document.getElementById("intro-text");

let is24Hour = true;
let showSeconds = true;

themeButton.addEventListener("click", ()=> {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    sun.style.display = isDark ? "inline" : "none";
    moon.style.display = isDark ? "none" : "inline";
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
      runIntro();
  
      const screenName = link.dataset.screen;
      const targetScreen = document.getElementById(`screen-${screenName}`);
      if (!targetScreen) return;
  
      screens.forEach((screen) => {
        screen.style.display = "none";
      });
  
      targetScreen.style.display = "block";
  
      if (screenName === "timer" && timerMessage) {
        timerMessage.textContent = "still in progress";
      }
  
      if (screenName === "stopwatch" && stopWatchMessage) {
        stopWatchMessage.textContent = "still in progress";
      }
    });
  });


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

function runIntro() {
    if (!introOverlay || !introText) return;
  
    introText.textContent = "";
    introOverlay.classList.remove("hidden");
    introOverlay.classList.add("visible");
  
    const word = "CLOCKD";
    let index = 0;
  
    setTimeout(() => {
      const typingInterval = setInterval(() => {
        introText.textContent += word[index];
        index++;
  
        if (index === word.length) {
          clearInterval(typingInterval);
  
          setTimeout(() => {
            introOverlay.classList.remove("visible");
            introOverlay.classList.add("hidden");
          }, 500);
        }
      }, 120);
    }, 600);
  }

updateClock();
setInterval(updateClock,1000);

runIntro();