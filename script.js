let timer;
let isRunning = false;
let [hours, minutes, seconds] = [0, 0, 0];
const display = document.getElementById('display');
const lapList = document.getElementById('lap-list');

function updateDisplay() {
    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number < 10 ? `0${number}` : number;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
            updateDisplay();
        }, 1000);
    }
}

function stopTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function resetTimer() {
    stopTimer();
    [hours, minutes, seconds] = [0, 0, 0];
    updateDisplay();
    lapList.innerHTML = ''; // Clear lap times
}

function recordLap() {
    if (isRunning) {
        const lapTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
        const lapElement = document.createElement('div');
        lapElement.textContent = `Lap: ${lapTime}`;
        lapList.appendChild(lapElement);
    }
}

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);
