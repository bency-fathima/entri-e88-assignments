// questions
const questions = [
  {
    question: "Which keyword is used to declare a constant variable in JavaScript?",
    options: ["var", "let", "const", "constant"],
    correctAnswer: "const"
  },
  {
    question: "Which of the following is NOT a JavaScript data type?",
    options: ["Boolean", "Float", "String", "Undefined"],
    correctAnswer: "Float"
  },
  {
    question: "How do you select an element by its ID in the DOM?",
    options: [
      "document.queryId()",
      "document.getElementById()",
      "document.selectId()",
      "document.findElement()"
    ],
    correctAnswer: "document.getElementById()"
  },
  {
    question: "Which array method adds a new element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    correctAnswer: "push()"
  },
  {
    question: "Which symbol is used for strict equality comparison?",
    options: ["=", "==", "===", "!="],
    correctAnswer: "==="
  },
  {
    question: "Which method is used to attach an event handler to a DOM element?",
    options: [
      "element.addListener()",
      "element.addEventListener()",
      "element.attachEvent()",
      "element.onEvent()"
    ],
    correctAnswer: "element.addEventListener()"
  },
  {
    question: "What will `typeof []` return in JavaScript?",
    options: ["array", "object", "list", "undefined"],
    correctAnswer: "object"
  },
  {
    question: "Which loop is guaranteed to execute at least once?",
    options: ["for loop", "while loop", "do...while loop", "forEach loop"],
    correctAnswer: "do...while loop"
  }
];
  
  // State Variables
  let currentQuestionIndex = 0;
  let score = 0;
  
  // DOM Elements
  const quizScreen = document.getElementById("quiz-screen");
  const resultScreen = document.getElementById("result-screen");
  const questionText = document.getElementById("question-text");
  const questionCount = document.getElementById("question-count");
  const optionsContainer = document.getElementById("options-container");
  const nextBtn = document.getElementById("next-btn");
  const scoreText = document.getElementById("score-text");
  const feedbackText = document.getElementById("feedback-text");
  const restartBtn = document.getElementById("restart-btn");
  
  // Start Quiz Function
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultScreen.style.display = "none";
    quizScreen.style.display = "block";
    showQuestion();
  }
  
  // dynamic function for qus 
  function showQuestion() {

    nextBtn.style.display = "none";
    const currentQ = questions[currentQuestionIndex];  // taking current qus index
  
    
    questionCount.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;   // update qus and qus no.
    questionText.textContent = currentQ.question;
  
    optionsContainer.innerHTML = ""; // removing btns
  
    // dynamic option btns
    currentQ.options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("option-btn");
  
      // Click option function 
      button.addEventListener("click", () => handleOptionClick(button, option, currentQ.correctAnswer));
  
      optionsContainer.appendChild(button);
    });
  }
  
  // select ans
  function handleOptionClick(selectedButton, selectedAnswer, correctAnswer) {

    if (selectedAnswer === correctAnswer) {
      selectedButton.classList.add("correct");  // ans check 
      score++;     // increment score 
    } else {
      selectedButton.classList.add("wrong");
  
      // green colour for correct
      const allButtons = optionsContainer.querySelectorAll(".option-btn");
      allButtons.forEach((btn) => {
        if (btn.textContent === correctAnswer) {
          btn.classList.add("correct");
        }
      });
    }
  
    // disbale btn function after option selected
    const allButtons = optionsContainer.querySelectorAll(".option-btn");
    allButtons.forEach((btn) => {
      btn.disabled = true;
    });
  
   
    nextBtn.style.display = "block"; // next btn 
  }
  
  // next qus function
  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResults(); // show reluts after all qus
    }
  });
  
  // show result screen
  function showResults() {
    quizScreen.style.display = "none";
    resultScreen.style.display = "block";
  
    scoreText.textContent = `You scored ${score} out of ${questions.length}`;  // show score
  
    // feedback message function
    let feedback = "";
    if (score === 8) {
      feedback = "Outstanding! Perfect score! ";
    } else if (score >= 5) {
      feedback = "Good job! You have a solid grasp of JavaScript! ";
    } else {
      feedback = "Keep practicing! Review JavaScript basics and try again. ";
    }
  
    feedbackText.textContent = feedback;
  }
  
  restartBtn.addEventListener("click", startQuiz);  // quiz restart function
  
  startQuiz();