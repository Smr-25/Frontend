const display = document.getElementById("display");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const laps = document.getElementById("laps");

let elapsedMilliseconds = 0;
let startedAt = 0;
let timerId;

function formatTime(milliseconds) {
    const totalTenths = Math.floor(milliseconds / 100);
    const tenths = totalTenths % 10;
    const totalSeconds = Math.floor(totalTenths / 10);
    const seconds = totalSeconds % 60;
    const totalMinutes = Math.floor(totalSeconds / 60);
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${tenths}`;
}

function renderElapsedTime() {
    display.value = formatTime(elapsedMilliseconds);
}

function updateElapsedTime() {
    elapsedMilliseconds = Date.now() - startedAt;
    renderElapsedTime();
}

startButton.addEventListener("click", function () {
    if (timerId) {
        return;
    }

    startedAt = Date.now() - elapsedMilliseconds;
    timerId = setInterval(updateElapsedTime, 100);
});

pauseButton.addEventListener("click", function () {
    clearInterval(timerId);
    timerId = undefined;
});

resetButton.addEventListener("click", function () {
    clearInterval(timerId);
    timerId = undefined;
    elapsedMilliseconds = 0;
    laps.innerHTML = "";
    renderElapsedTime();
});

lapButton.addEventListener("click", function () {
    if (elapsedMilliseconds === 0) {
        return;
    }

    const lap = document.createElement("li");
    lap.textContent = display.value;
    laps.appendChild(lap);
});
