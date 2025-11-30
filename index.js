const sun = document.getElementById("icon-sun");
const moon = document.getElementById("icon-moon");
const themeButton = document.getElementById("theme");

themeButton.addEventListener("click", ()=> {
    document.body.classList.toggle("dark");

    const isLight = document.body.classList.contains("dark");

    sun.style.display = isLight ? "inline" : "none";
    moon.style.display = isLight ? "none" : "inline";
})

function updateClock() {

    const now = new Date();
    const hours = now.getHours().toString().padStart(2,0);
    const minutes = now.getMinutes().toString().padStart(2,0);
    const seconds = now.getSeconds().toString().padStart(2,0);
    const timeString = `${hours}:${minutes}:${seconds}`
    document.getElementById("clock").textContent = timeString;
}

updateClock();
setInterval(updateClock,1000)