// variables delcared in the global scope
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
     correctAnswer: "var"
   },
   {
     question: "Which of the following is not a JavaScript data type?",
     answers: {
       a: "string",
       b: "number",
       c: "object",
       d: "boolean"
     },
     correctAnswer: "object"
   },
   {
     question: "What is the keyword used to create a function in JavaScript?",
     answers: {
       a: "function",
       b: "var",
       c: "let"
     },
     correctAnswer: "function"
   },
   {
     question: "What is the keyword used to create a loop in JavaScript?",
     answers: {
       a: "loop",
       b: "for",
       c: "while"
     },
     correctAnswer: "for"
   },
   {
     question: "What is the keyword used to end a loop in JavaScript?",
     answers: {
       a: "break",
       b: "continue",
       c: "end"
     },
     correctAnswer: "break"
   }
 ];

 const quizContainer = document.getElementById("quiz");
 const resultsContainer = document.getElementById("results");
 const startButton = document.getElementById("start-button");

 startButton.addEventListener("click", startQuiz);


//  start Quiz Function

 function startQuiz() {
     time = 30;
     currentQuestionIndex = 0;
     startButton.style.display = "none";
     showtimerId = setInterval(updateTimer, 1000);
     showQuestion();
 }

//  Timer function

 function updateTimer() {
     time--;
     document.getElementById("timer").innerHTML = time;
     if (time <= 0) {
         clearInterval(showtimerId);
         showResults();
     }
 }


// Question function

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

//  Answer Function

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

//  Results function

 function showResults() {
    quizContainer.innerHTML = "";
    document.querySelector("#timer").setAttribute("style", "display:none");
    resultsContainer.innerHTML = "";
    resultsContainer.style.display = "block";
    const score = document.createElement("p");
    score.textContent = `You scored ${correctAnswers} out of ${questions.length}`;
    
    const initials = document.createElement("p");

    initials.textContent = 'Enter Initials: ';

    const input = document.createElement('input');

    input.setAttribute("type", "text");

    input.setAttribute("id", "initials");

    const submit = document.createElement("button");

    submit.setAttribute("id","submit");
    
    submit.textContent = "submit";

    resultsContainer.append(score, initials, input, submit);
    document.querySelector("#submit").addEventListener("click", highScores);
}


// Highscores function

function highScores() {
  let initials = document.querySelector("#intials").value.trim();
  if (initials !== ""){
    let highScores = JSON.parse(window.localStorage.getItem("highScores")) || [];
    let newScore = {
      score: correctAnswers,
      initials: initials,
    }
    highScores.push(newScore);
    window.localStorage.setItem("highScores",JSON.stringify(highScores));
    window.location.href = "highscores.html";
  }
}



