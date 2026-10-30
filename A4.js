const questions = [
    {
        question: "Which language structures a web page?",
        options: ["CSS", "HTML", "Java", "Python"],
        answer: "HTML"
    },
    {
        question: "Which language styles a web page?",
        options: ["CSS", "HTML", "C", "SQL"],
        answer: "CSS"
    },
    {
        question: "Which language adds interactivity to websites?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: "JavaScript"
    },
    {
        question: "Which tag creates a heading?",
        options: ["<p>", "<h1>", "<img>", "<br>"],
        answer: "<h1>"
    },
    {
        question: "Which symbol starts a JavaScript comment?",
        options: ["##", "//", "**", "!!"],
        answer: "//"
    },
    {
        question: "Which keyword declares a changeable variable?",
        options: ["const", "let", "fixed", "static"],
        answer: "let"
    },
    {
        question: "Which method displays a message in the console?",
        options: ["console.log()", "print.page()", "show()", "write.log()"],
        answer: "console.log()"
    },
    {
        question: "Which brackets create an array?",
        options: ["{}", "()", "[]", "<>"],
        answer: "[]"
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
    answered = false;

    document.getElementById("message").innerText = "";
    document.getElementById("next").disabled = true;

    let q = questions[currentQuestion];

    document.getElementById("question").innerText = q.question;
    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    for (let i = 0; i < q.options.length; i++) {
        let button = document.createElement("button");

        button.innerText = q.options[i];

        button.onclick = function () {
            checkAnswer(button, q.options[i]);
        };

        optionsDiv.appendChild(button);
    }

    document.getElementById("score").innerText = "Score: " + score;
}

function checkAnswer(button, selectedAnswer) {
    if (answered === true) {
        return;
    }

    answered = true;

    let correctAnswer = questions[currentQuestion].answer;
    let buttons = document.getElementById("options").children;

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;

        if (buttons[i].innerText === correctAnswer) {
            buttons[i].classList.add("correct");
        }
    }

    if (selectedAnswer === correctAnswer) {
        score++;
        document.getElementById("message").innerText = "Correct answer!";
    } else {
        button.classList.add("wrong");
        document.getElementById("message").innerText =
            "Wrong answer! Correct answer: " + correctAnswer;
    }

    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("next").disabled = false;
}

function nextQuestion() {
    if (answered === false) {
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        document.getElementById("question").innerText = "Quiz Completed!";
        document.getElementById("options").innerHTML = "";
        document.getElementById("next").disabled = true;

        if (score >= 6) {
            document.getElementById("message").innerText = "Great job!";
        } else if (score >= 4) {
            document.getElementById("message").innerText = "Good effort!";
        } else {
            document.getElementById("message").innerText = "Keep practicing!";
        }

        document.getElementById("score").innerText =
            "Final Score: " + score + " out of " + questions.length;
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

showQuestion();