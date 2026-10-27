// 1. Questions Data Array (8 items)
const questions = [
    {
        question: "Which keyword is used to declare a block-scoped variable in JavaScript?",
        options: ["var", "let", "const-var", "define"],
        correct: "let"
    },
    {
        question: "What is the correct syntax for an arrow function?",
        options: ["() => {}", "function => {}", "() -> {}", "call => {}"],
        correct: "() => {}"
    },
    {
        question: "Which HTML element is used to link a JavaScript file?",
        options: ["<javascript>", "<script>", "<js>", "<link>"],
        correct: "<script>"
    },
    {
        question: "What does DOM stand for?",
        options: ["Data Object Model", "Document Output Manager", "Document Object Model", "Dynamic Order Matrix"],
        correct: "Document Object Model"
    },
    {
        question: "Which method adds an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correct: "push()"
    },
    {
        question: "How do you select an element with id 'submit' using querySelector?",
        options: ["querySelector('.submit')", "querySelector('submit')", "querySelector('#submit')", "querySelector('@submit')"],
        correct: "querySelector('#submit')"
    },
    {
        question: "Which event fires when a user clicks on an HTML element?",
        options: ["onhover", "click", "submit", "change"],
        correct: "click"
    },
    {
        question: "What is the result of typeof null in JavaScript?",
        options: ["null", "undefined", "object", "string"],
        correct: "object"
    }
];


let currentQuestionIndex = 0;
let score = 0;


const quizContainer = document.getElementById("quiz-container");


function renderQuestion() {
   
    quizContainer.innerHTML = "";

    const currentData = questions[currentQuestionIndex];

    
    const questionEl = document.createElement("h2");
    questionEl.textContent = `${currentQuestionIndex + 1}. ${currentData.question}`;
    quizContainer.appendChild(questionEl);

    
    const optionsContainer = document.createElement("div");
    optionsContainer.className = "options-container";

    
    currentData.options.forEach(optionText => {
        const button = document.createElement("button");
        button.className = "option-btn";
        button.textContent = optionText;
        
        
        button.addEventListener("click", () => handleAnswerSelection(button, optionText));
        
        optionsContainer.appendChild(button);
    });

    quizContainer.appendChild(optionsContainer);

    
    const nextBtn = document.createElement("button");
    nextBtn.id = "next-btn";
    nextBtn.className = "action-btn hidden";
    nextBtn.textContent = currentQuestionIndex === questions.length - 1 ? "Finish Quiz" : "Next Question";
    
    nextBtn.addEventListener("click", () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            renderQuestion();
        } else {
            renderScoreScreen();
        }
    });

    quizContainer.appendChild(nextBtn);
}

function handleAnswerSelection(selectedButton, chosenOption) {
    const currentData = questions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll(".option-btn");
    const nextBtn = document.getElementById("next-btn");

    
    optionButtons.forEach(btn => btn.disabled = true);

    // Score Tracking & Visual Feedback
    if (chosenOption === currentData.correct) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
        
        
        optionButtons.forEach(btn => {
            if (btn.textContent === currentData.correct) {
                btn.classList.add("correct");
            }
        });
    }

    
    nextBtn.classList.remove("hidden");
}


function renderScoreScreen() {
    quizContainer.innerHTML = "";

    
    let feedback = "";
    if (score === questions.length) {
        feedback = "Perfect score! Outstanding JavaScript skills!";
    } else if (score >= 5) {
        feedback = "Great job! You have a solid grasp of the basics.";
    } else {
        feedback = "Keep practicing! Review DOM concepts and try again.";
    }

    const scoreTitle = document.createElement("h2");
    scoreTitle.textContent = "Quiz Completed!";
    
    const scoreVal = document.createElement("p");
    scoreVal.className = "score-text";
    scoreVal.textContent = `You scored ${score} out of ${questions.length}`;

    const feedbackVal = document.createElement("p");
    feedbackVal.className = "feedback-text";
    feedbackVal.textContent = feedback;

    
    const restartBtn = document.createElement("button");
    restartBtn.className = "action-btn";
    restartBtn.textContent = "Restart Quiz";
    restartBtn.addEventListener("click", restartQuiz);

    quizContainer.appendChild(scoreTitle);
    quizContainer.appendChild(scoreVal);
    quizContainer.appendChild(feedbackVal);
    quizContainer.appendChild(restartBtn);
}


function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    renderQuestion();
}


renderQuestion();
