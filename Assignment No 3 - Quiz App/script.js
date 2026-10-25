//8 question
const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats"
    ],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborghinis"
    ],
    answer: "Hypertext Markup Language"
  },
  {
    question: "Which HTML tag is used to define an internal style sheet?",
    options: ["<script>", "<css>", "<style>", "<link>"],
    answer: "<style>"
  },
  {
    question: "Which property is used in CSS to change background color?",
    options: ["color", "bgcolor", "background-color", "canvas-color"],
    answer: "background-color"
  },
  {
    question: "How do you write a single-line comment in JavaScript?",
    options: [
      "<!-- This is a comment -->",
      "// This is a comment",
      "/* This is a comment",
      "# This is a comment"
    ],
    answer: "// This is a comment"
  },
  {
    question: "Which method is used to select an element by ID in JavaScript?",
    options: [
      "document.getElementById()",
      "document.selectId()",
      "document.queryId()",
      "document.findId()"
    ],
    answer: "document.getElementById()"
  },
  {
    question: "Which event occurs when a user clicks on an HTML button?",
    options: ["onchange", "onclick", "onmouseclick", "onmouseover"],
    answer: "onclick"
  }
];

// question index and score
let currentQuestionIndex = 0;
let score = 0;

// DOM references
const quizScreen = document.getElementById("quiz-screen");
const scoreScreen = document.getElementById("score-screen");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const scoreText = document.getElementById("score-text");
const feedbackMessage = document.getElementById("feedback-message");
const restartBtn = document.getElementById("restart-btn");

//question and dynamic buttons
function renderQuestion() {
  
  nextBtn.style.display = "none";

  optionsContainer.innerHTML = "";

  const currentQuestion = questions[currentQuestionIndex];
  
 
  questionText.textContent = "Question " + (currentQuestionIndex + 1) + ": " + currentQuestion.question;

  
  currentQuestion.options.forEach(function (option) {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option-btn");

    button.addEventListener("click", function () {
      selectOption(button, option, currentQuestion.answer);
    });

    optionsContainer.appendChild(button);
  });
}


function selectOption(selectedButton, selectedAnswer, correctAnswer) {

  const allButtons = optionsContainer.querySelectorAll("button");
  allButtons.forEach(function (btn) {
    btn.disabled = true;
  });


  if (selectedAnswer === correctAnswer) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("wrong");

    
    allButtons.forEach(function (btn) {
      if (btn.textContent === correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }


  nextBtn.style.display = "block";
}


nextBtn.addEventListener("click", function () {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    showFinalScore();
  }
});


function showFinalScore() {
  quizScreen.classList.add("hidden");
  scoreScreen.classList.remove("hidden");


  scoreText.textContent = "You scored " + score + " out of " + questions.length;

  if (score === questions.length) {
    feedbackMessage.textContent = "Excellent work! Perfect score!";
  } else if (score >= 5) {
    feedbackMessage.textContent = "Good job! You passed the quiz!";
  } else {
    feedbackMessage.textContent = "Keep practicing! You can do better next time.";
  }
}


restartBtn.addEventListener("click", function () {
  currentQuestionIndex = 0;
  score = 0;

  scoreScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  renderQuestion();
});


renderQuestion();