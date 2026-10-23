const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Paris", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Venus", "Mars", "Jupiter"],
        answer: "Mars"
    },
    {
        question: "What is 5 + 7?",
        options: ["10", "11", "12", "13"],
        answer: "12"
    },
    {
        question: "Which is the largest ocean in the world?",
        options: [
            "Atlantic Ocean",
            "Indian Ocean",
            "Arctic Ocean",
            "Pacific Ocean"
        ],
        answer: "Pacific Ocean"
    },
    {
        question: "Which language is primarily used to structure web pages?",
        options: ["Python", "HTML", "Java", "C++"],
        answer: "HTML"
    },
    {
        question: "How many days are there in a leap year?",
        options: ["365", "366", "364", "367"],
        answer: "366"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
        answer: "Carbon dioxide"
    },
    {
        question: "Who wrote Romeo and Juliet?",
        options: [
            "Charles Dickens",
            "William Shakespeare",
            "Mark Twain",
            "Jane Austen"
        ],
        answer: "William Shakespeare"
    }
];

const feedback = [
    { score: 0, feedback: "No attempt made. Please review the basics and try again." },
    { score: 1, feedback: "Very poor performance. More practice is needed." },
    { score: 2, feedback: "Poor performance. Review the key concepts and practice more." },
    { score: 3, feedback: "Below expectations. Focus on understanding the fundamentals." },
    { score: 4, feedback: "Average performance. Keep practicing to improve your understanding." },
    { score: 5, feedback: "Good effort! Review your mistakes to improve further." },
    { score: 6, feedback: "Good performance! You understand most of the concepts." },
    { score: 7, feedback: "Very good work! You have a strong understanding of the topic." },
    { score: 8, feedback: "Excellent work! You have demonstrated a thorough understanding of the topic." }
];



const quizContainer = document.querySelector(".question-container");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.querySelector(".next-button");
const countNumberElement = document.querySelector(".count-number");
const restartButton = document.querySelector(".restart-button");

let currentQuestionIndex = 0;
let score = 0;
let answered = false;
let count = 1;


function loadQuestion() {
    answered = false;
    nextButton.disabled = true;

    const currentQuestion = questions[currentQuestionIndex];
    optionsElement.innerHTML = "";
    questionElement.textContent = ` ${currentQuestion.question}`;
    countNumberElement.textContent = `Question ${count++} of ${questions.length}`;

    currentQuestion.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;

        button.addEventListener("click", () => {
            if (answered) return;
            answered = true;
            if (option === currentQuestion.answer) {
                button.style.backgroundColor = "green";
                score++;
            } else {
                button.style.backgroundColor = "red";
            }
            nextButton.disabled = false;
        });

        optionsElement.appendChild(button);

    });
};

nextButton.addEventListener("click", () => {

    currentQuestionIndex++;

    const scoreElement = document.getElementById("score");
    const feedbackElement = document.getElementById("feedback");

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        questionElement.textContent = "Quiz Completed!";
        optionsElement.innerHTML = "";
        countNumberElement.textContent = "";

        scoreElement.textContent = `You scored ${score} out of ${questions.length}.`;
        const feedbackMessage = feedback.find(item => item.score === score).feedback;
        feedbackElement.textContent = feedbackMessage;

        nextButton.style.display = "none";

    }
});

restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    count = 1;
    answered = false;

    document.getElementById("score").textContent = "";
    document.getElementById("feedback").textContent = "";

    nextButton.style.display = "block";

    loadQuestion();
});


loadQuestion();