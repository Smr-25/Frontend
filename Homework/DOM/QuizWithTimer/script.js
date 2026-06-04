const quizForm = document.getElementById("quiz-form");
const questions = Array.from(quizForm.querySelectorAll("fieldset"));
const timer = document.getElementById("timer");
const result = document.getElementById("result");
const restartButton = document.getElementById("restart");

const quizDuration = 60;
let remainingSeconds = quizDuration;
let timerId;
let finished = false;

function renderTime() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    timer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function setFormDisabled(disabled) {
    quizForm.querySelectorAll("input, button[type='submit']").forEach(function (control) {
        control.disabled = disabled;
    });
}

function gradeQuiz(messagePrefix = "") {
    if (finished) {
        return;
    }

    finished = true;
    clearInterval(timerId);

    const score = questions.reduce(function (total, question) {
        const selectedAnswer = question.querySelector("input:checked");
        return total + Number(selectedAnswer?.value === question.dataset.answer);
    }, 0);

    result.textContent = `${messagePrefix}Score: ${score}/${questions.length}`;
    setFormDisabled(true);
}

function startTimer() {
    clearInterval(timerId);
    timerId = setInterval(function () {
        remainingSeconds--;
        renderTime();

        if (remainingSeconds === 0) {
            gradeQuiz("Time is up. ");
        }
    }, 1000);
}

quizForm.addEventListener("submit", function (event) {
    event.preventDefault();
    gradeQuiz();
});

restartButton.addEventListener("click", function () {
    quizForm.reset();
    result.textContent = "";
    remainingSeconds = quizDuration;
    finished = false;
    setFormDisabled(false);
    renderTime();
    startTimer();
});

renderTime();
startTimer();
