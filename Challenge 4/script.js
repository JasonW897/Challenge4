const questions = [
    {
      question: "What is JavaScript?",
      options: ["A programming language", "A fruit", "A car"],
      answer: "A programming language",
    },
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Transfer Markup Language",
        "Hyper Text Makeup Language",
        "Hyper Text Markup Language",
      ],
      answer: "Hyper Text Markup Language",
    },
    {
      question: "Which programming language is often used for building web applications?",
      options: ["Java", "Python", "JavaScript"],
      answer: "JavaScript",
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Cascading Style Sheet",
        "Computer Style Sheet",
        "Creative Style Sheet",
      ],
      answer: "Cascading Style Sheet",
    },
    {
      question: "What symbol is used to indicate a comment in JavaScript?",
      options: ["#", "//", "/*"],
      answer: "//",
    },
    {
      question: "Which tag is used to create an ordered list in HTML?",
      options: ["<ul>", "<li>", "<ol>"],
      answer: "<ol>",
    },
    {
      question: "What is the result of 2 + 2 in JavaScript?",
      options: ["3", "4", "5"],
      answer: "4",
    },
  ];
  
  let currentQuestionIndex = 0;
  let timer;
  let timeLeft = 60;
  
  function startQuiz() {
    timer = setInterval(function () {
      timeLeft--;
      document.getElementById("timer").textContent = timeLeft;
      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);
    
    document.getElementById("start-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    
    displayQuestion();
  }
  
  function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    
    document.getElementById("question-text").textContent = currentQuestion.question;
  
    const optionsList = document.getElementById("options-list");
    optionsList.innerHTML = "";
  
    currentQuestion.options.forEach((option, index) => {
      const optionButton = document.createElement("button");
      optionButton.textContent = option;
      optionButton.classList.add("option-button", "btn", "btn-outline-primary");
      optionButton.addEventListener("click", () => checkAnswer(option));
      optionsList.appendChild(optionButton);
    });
  }
  
  function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];
  
    if (selectedOption === currentQuestion.answer) {
      document.getElementById("score").textContent++;
    } else {
      timeLeft -= 10;
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endGame();
    }
  }
  
  function endGame() {
    clearInterval(timer);
  
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("end-container").style.display = "block";
  
    const initialsForm = document.getElementById("initials-form");
    const score = document.getElementById("score").textContent;
  
    initialsForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const initials = document.getElementById("initials").value;
  
      const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
      highScores.push({ initials, score });
      localStorage.setItem("highScores", JSON.stringify(highScores));
  
    });
  }
  
  document.getElementById("start-button").addEventListener("click", startQuiz);