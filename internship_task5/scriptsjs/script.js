let timer;
let remainingTime = 0;
let initialDuration = 0;

const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const restartBtn = document.getElementById('restart-btn');

function getInputTime() {
    const days = parseInt(document.getElementById('days').value) || 0;
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    return ((days * 24 + hours) * 60 + minutes) * 60 + seconds;
}

function updateDisplay() {
    const days = Math.floor(remainingTime / (3600 * 24));
    const hours = Math.floor((remainingTime % (3600 * 24)) / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;
    timerDisplay.textContent = `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (timer) return;
    initialDuration = getInputTime();
    remainingTime = initialDuration;
    if (remainingTime <= 0) {
        alert("Please set a valid duration.");
        return;
    }
    timer = setInterval(() => {
        if (remainingTime > 0) {
            remainingTime--;
            updateDisplay();
        } else {
            clearInterval(timer);
            timer = null;
            alert('Timer finished!');
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    stopTimer();
    remainingTime = initialDuration;
    updateDisplay();
}

function restartTimer() {
    resetTimer();
    startTimer();
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
restartBtn.addEventListener('click', restartTimer);


updateDisplay();
