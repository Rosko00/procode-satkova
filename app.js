// Globálne premenné
let correctCount = 0;
let incorrectCount = 0;
let totalTime = 0;
let questionCount = 0;
let timer;
let startTime;
let currentProblem;

// Spustenie časovača
function startTimer() {
    startTime = new Date();
    timer = setInterval(() => {
        const now = new Date();
        totalTime = Math.floor((now - startTime) / 1000);
        document.getElementById("totalTime").innerText = totalTime;
    }, 1000);
}

// Zastavenie časovača
function stopTimer() {
    clearInterval(timer);
}

// Generovanie nového príkladu
function generateProblem() {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    const operator = Math.random() > 0.5 ? '+' : '-';

    if (operator === '-' && a < b) {
        currentProblem = { a: b, b: a, operator };
    } else {
        currentProblem = { a, b, operator };
    }

    document.getElementById("mathProblem").innerText = `${currentProblem.a} ${operator} ${currentProblem.b} = ?`;
}

// Kontrola odpovede
function checkAnswer() {
    const userAnswer = parseInt(document.getElementById("answerInput").value);
    let correctAnswer;

    if (currentProblem.operator === '+') {
        correctAnswer = currentProblem.a + currentProblem.b;
    } else {
        correctAnswer = currentProblem.a - currentProblem.b;
    }

    if (userAnswer === correctAnswer) {
        correctCount++;
        document.getElementById("feedbackMessage").innerText = "Správne!";
        document.getElementById("feedbackMessage").style.color = "green";
    } else {
        incorrectCount++;
        totalTime += 60; // Pridať 1 minútu za nesprávnu odpoveď
        document.getElementById("feedbackMessage").innerText = "Nesprávne!";
        document.getElementById("feedbackMessage").style.color = "red";
    }

    document.getElementById("correctCount").innerText = correctCount;
    document.getElementById("incorrectCount").innerText = incorrectCount;
}

// Ďalšia otázka alebo ukončenie testu
function nextQuestion() {
    questionCount++;
    document.getElementById("answerInput").value = "";

    if (questionCount >= 10) {
        stopTimer();
        document.getElementById("feedbackMessage").innerText = "Koniec, dokončili ste všetky otázky!";
        document.getElementById("mathProblem").innerText = "";
        return;
    }

    generateProblem();
}

// Reštartovanie testu
function resetTest() {
    correctCount = 0;
    incorrectCount = 0;
    totalTime = 0;
    questionCount = 0;
    stopTimer();
    document.getElementById("totalTime").innerText = 0;
    document.getElementById("correctCount").innerText = 0;
    document.getElementById("incorrectCount").innerText = 0;
    document.getElementById("feedbackMessage").innerText = "";
    generateProblem();
    startTimer();
}

// Inicializácia aplikácie
function init() {
    // Pridanie udalostí
    document.getElementById("submitAnswerBtn").addEventListener("click", () => {
        if (questionCount === 0) startTimer();
        checkAnswer();
        nextQuestion();
    });

    document.getElementById("answerInput").addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            if (questionCount === 0) startTimer();
            checkAnswer();
            nextQuestion();
        }
    });

    document.getElementById("repeatTestBtn").addEventListener("click", resetTest);

    // Generovanie prvého príkladu
    generateProblem();
}

// Silná inicializácia pri každom obnovení stránky
window.addEventListener("load", () => {
    init();
});
