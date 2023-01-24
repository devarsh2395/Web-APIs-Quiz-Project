
 let currentQuestionIndex = 0;
 let time = 0;
 let timerId;
 let correctAnswers = 0;
 const questions = [
   {
     question: "What is the keyword used to create a variable in JavaScript?",
     answers: {
       a: "var",
       b: "let",
       c: "const"
     },
     correctAnswer: "b"
   },
   {
     question: "Which of the following is not a JavaScript data type?",
     answers: {
       a: "string",
       b: "number",
       c: "object",
       d: "boolean"
     },
     correctAnswer: "c"
   },
   {
     question: "What is the keyword used to create a function in JavaScript?",
     answers: {
       a: "function",
       b: "var",
       c: "let"
     },
     correctAnswer: "a"
   },
   {
     question: "What is the keyword used to create a loop in JavaScript?",
     answers: {
       a: "loop",
       b: "for",
       c: "while"
     },
     correctAnswer: "b"
   },
   {
     question: "What is the keyword used to end a loop in JavaScript?",
     answers: {
       a: "break",
       b: "continue",
       c: "end"
     },
     correctAnswer: "a"
   }
 ];

 const quizContainer = document.getElementById("quiz");
 const resultsContainer = document.getElementById("results");
 const startButton = document.getElementById("start-button");

 startButton.addEventListener("click", startQuiz);

 function startQuiz() {
     time = 30;
     currentQuestionIndex = 0;
     correctAnswers = 0;
     startButton.style.display = "none";
     showtimerId = setInterval(updateTimer, 1000);
     showQuestion();
 }

 function updateTimer() {
     time--;
     document.getElementById("timer").innerHTML = time;
     if (time <= 0) {
         clearInterval(timerId);
         showResults();
     }
 }

 function showQuestion() {
     quizContainer.innerHTML = "";
     const question = questions[currentQuestionIndex];
     const questionElement = document.createElement("p");
     questionElement.textContent = question.question;
     quizContainer.appendChild(questionElement);
     const answers = Object.values(question.answers);
     for (let i = 0; i < answers.length; i++) {
         const answer = answers[i];
         const answerButton = document.createElement("button");
         answerButton.textContent = answer;
         answerButton.addEventListener("click", selectAnswer);
         quizContainer.appendChild(answerButton);
     }
 }

 function selectAnswer(event) {
     const selectedButton = event.target;
     const correct = selectedButton.textContent.startsWith(questions[currentQuestionIndex].correctAnswer);
     if (correct) {
         correctAnswers++;
     }
     currentQuestionIndex++;
     if (currentQuestionIndex === questions.length || time === 0) {
         clearInterval(timerId);
         showResults();
     } else {
         showQuestion();
     }
 }

 function showResults() {
    quizContainer.innerHTML = "";
    resultsContainer.innerHTML = "";
    resultsContainer.style.display = "block";
    const score = document.createElement("p");
    score.textContent = `You scored ${correctAnswers} out of ${questions.length}`;
    resultsContainer.appendChild(score);
}

