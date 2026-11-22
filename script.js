
const timerDisplay = document.getElementById("timer");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

const focusBtn = document.getElementById("focusBtn");
const breakBtn = document.getElementById("breakBtn");

const sessionsDisplay = document.getElementById("sessions");

let focusTime = 25 * 60;
let breakTime = 5 * 60;

let remainingTime = focusTime;
let currentMode = "focus";
let timerInterval = null;
let sessions = 0;

function updateDisplay() {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    timerDisplay.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
}

function startTimer() {
    if (timerInterval !== null) return;

    timerInterval = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;

            if (currentMode === "focus") {
                sessions++;
                sessionsDisplay.textContent = sessions;
                alert("Great job! Time for a break.");
            } else {
                alert("Break finished! Back to focus.");
            }
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    pauseTimer();

    remainingTime =
        currentMode === "focus" ? focusTime : breakTime;

    updateDisplay();
}

function changeMode(mode) {
    pauseTimer();

    currentMode = mode;

    focusBtn.classList.toggle("active", mode === "focus");
    breakBtn.classList.toggle("active", mode === "break");

    remainingTime = mode === "focus" ? focusTime : breakTime;

    updateDisplay();
}

startBtn.addEventListener("click", startTimer);

pauseBtn.addEventListener("click", pauseTimer);

resetBtn.addEventListener("click", resetTimer);

focusBtn.addEventListener("click", () => {
    changeMode("focus");
});

breakBtn.addEventListener("click", () => {
    changeMode("break");
});

updateDisplay();
