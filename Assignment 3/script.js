const questions = [
    {
      question: "Which keyword declares a variable that cannot be reassigned?",
      options: ["var", "let", "const", "static"],
      answer: "const"
    },
    {
      question: "Which method adds an element to the END of an array?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      answer: "push()"
    },
    {
      question: "What does document.querySelector('.box') return?",
      options: [
        "All elements with class box",
        "The first element with class box",
        "The element with id box",
        "An array of elements"
      ],
      answer: "The first element with class box"
    },
    {
      question: "Which method attaches an event handler to an element?",
      options: ["addEventListener()", "attachEvent()", "onEvent()", "setEvent()"],
      answer: "addEventListener()"
    },
    {
      question: "What is the output of typeof [] ?",
      options: ["array", "object", "list", "undefined"],
      answer: "object"
    },
    {
      question: "Which loop is guaranteed to run its body at least once?",
      options: ["for", "while", "do...while", "for...of"],
      answer: "do...while"
    },
    {
      question: "How do you access the property 'name' of an object user?",
      options: ["user->name", "user.name", "user::name", "user(name)"],
      answer: "user.name"
    },
    {
      question: "Which DOM method creates a new HTML element?",
      options: [
        "document.makeElement()",
        "document.newElement()",
        "document.createElement()",
        "document.addElement()"
      ],
      answer: "document.createElement()"
    }
  ];
  
  
  let currentIndex = 0;
  let score = 0;
  let answered = false;
  
  
  const container = document.getElementById("quiz-container");
  const progressEl = document.getElementById("progress");
  const scoreEl = document.getElementById("score-display");
  
  
  function renderQuestion() {
    answered = false;
    const current = questions[currentIndex];
  
    container.innerHTML = "";
    progressEl.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
    scoreEl.textContent = `Score: ${score}`;
  
    const questionEl = document.createElement("h2");
    questionEl.className = "question";
    questionEl.textContent = current.question;
    container.appendChild(questionEl);
  
    const optionsEl = document.createElement("div");
    optionsEl.className = "options";
  
    current.options.forEach((optionText) => {
      const btn = document.createElement("button");
      btn.className = "option-btn";
      btn.textContent = optionText;
      btn.addEventListener("click", () => handleAnswer(btn, optionText));
      optionsEl.appendChild(btn);
    });
    container.appendChild(optionsEl);
  
    const feedbackEl = document.createElement("p");
    feedbackEl.id = "feedback";
    feedbackEl.className = "feedback";
    container.appendChild(feedbackEl);
  
    const nextBtn = document.createElement("button");
    nextBtn.id = "next-btn";
    nextBtn.className = "action-btn";
    nextBtn.textContent = currentIndex === questions.length - 1 ? "Show Result" : "Next Question";
    nextBtn.disabled = true; 
    nextBtn.addEventListener("click", nextQuestion);
    container.appendChild(nextBtn);
  }
  
  
  function handleAnswer(selectedBtn, selectedText) {
    if (answered) return; 
    answered = true;
  
    const correctAnswer = questions[currentIndex].answer;
    const feedbackEl = document.getElementById("feedback");
    const allButtons = document.querySelectorAll(".option-btn");
  
    if (selectedText === correctAnswer) {
      selectedBtn.classList.add("correct");
      score++;
      feedbackEl.textContent = "Correct!";
      feedbackEl.classList.add("ok");
    } else {
      selectedBtn.classList.add("wrong");
      allButtons.forEach((btn) => {
        if (btn.textContent === correctAnswer) btn.classList.add("correct");
      });
      feedbackEl.textContent = `Wrong. The correct answer is: ${correctAnswer}`;
      feedbackEl.classList.add("bad");
    }
  
    allButtons.forEach((btn) => (btn.disabled = true));
    scoreEl.textContent = `Score: ${score}`;
    document.getElementById("next-btn").disabled = false;
  }
  
  
  function nextQuestion() {
    currentIndex++;
    if (currentIndex < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }
  
  
  function getFeedbackMessage(finalScore) {
    if (finalScore === 8) return "Perfect score! Outstanding work!";
    if (finalScore >= 6) return "Great job! You know your JavaScript well.";
    if (finalScore >= 4) return "Good effort! A little more practice and you'll get there.";
    return "Keep practicing. Review the basics and try again!";
  }
  
  function showResult() {
    container.innerHTML = "";
    progressEl.textContent = "Quiz completed";
    scoreEl.textContent = "";
  
    const result = document.createElement("div");
    result.className = "result";
  
    const heading = document.createElement("h2");
    heading.textContent = `You scored ${score} out of ${questions.length}`;
  
    const message = document.createElement("p");
    message.textContent = getFeedbackMessage(score);
  
    const restartBtn = document.createElement("button");
    restartBtn.className = "action-btn";
    restartBtn.textContent = "Restart Quiz";
    restartBtn.addEventListener("click", restartQuiz);
  
    result.append(heading, message, restartBtn);
    container.appendChild(result);
  }
  
  
  function restartQuiz() {
    currentIndex = 0;
    score = 0;
    renderQuestion();
  }
  
  
  renderQuestion();