let timeLeft = 75;
let count = 0;
let score = 0;
let initials;
let highScores = [];



//starting the quiz
function startQuiz() {
  let button = document.querySelector("#start-screen");
  button.classList.add("hide");
  let questions = document.querySelector("#questions");
  questions.classList.remove("hide");
  
  //calling the setTime and displayQuestions functions to start the time and display the questions
  setTimer();
  displayQuestions();
}
let start = document.querySelector("#start");
start.addEventListener("click", startQuiz);

//set timer function
function setTimer() {
  let timerInterval = setInterval(function () {
    timeLeft--;
    document.querySelector("#time").textContent = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

// Function to handle what happens when a user clicks on a choice button
function questionsHandler() {
  if (this.value === questions[count].correctAnswer) {
    //when the answer is right Increase score
    score++;
    let correctSound = new Audio("./starter/assets/sfx/correct.wav");
    correctSound.play();
  } else {
    //when the answer is wrong reduce time by 15 seconds
    timeLeft -= 15;
    let inCorrectSound = new Audio("./starter/assets/sfx/incorrect.wav");
    inCorrectSound.play();
  }
  count++;
//check if there are more questions left if not then end the quiz
  if (count < questions.length) {
    displayQuestions();
  } else {
    endQuiz();
  }
}

//display the questions on screen
function displayQuestions() {
  let currentQuestion = questions[count];

  let title = document.querySelector("#question-title");
  title.textContent = currentQuestion.title;

  // Clear out any old question choices
  let answers = document.querySelector("#choices");
  answers.innerHTML = "";

  // Loop the choices
  currentQuestion.answers.forEach(function (answer, index) {

    let answersButton = document.createElement("button");
    answersButton.setAttribute("data-id", "choice");
    answersButton.setAttribute("value", answer);

    answersButton.textContent = index + 1 + ". " + answer;

    answersButton.addEventListener('click', questionsHandler);

    choices.appendChild(answersButton);
  });
}

// Function to handle what happens when the quiz ends
function endQuiz() {
  start.classList.add("hide");
  let endScreen = document.getElementById("end-screen");
  endScreen.classList.remove("hide");

  //displaying the final score
  let finalScore = document.querySelector("#final-score");
  finalScore.textContent = score;

  submit = document.querySelector("#submit");
  submit.addEventListener("click", userInitials);

  //user initials
  let userInitials = document.querySelector("#initials");
  initials = userInitials.value;
}

// Function to save high score
// function saveScore() {
//   let score = document.querySelector("final-score");
//   // let initials = document.querySelector('#intials');
//     // Save the score to the local storage
//   let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
//   highScores.push({ initials, score });
//   localStorage.setItem("highScores", JSON.stringify(highScores));

//   window.location.href = "highscores.html";
  
// };

function userInitials() {

  let initialsInput = document.querySelector('#initials');
  // if user enters more than 3 characters for initials
  if (initialsInput.value.length > 3) {
      alert("You must only enter a maximum of 3 initials");
      // clear the input field
      initialsInput.value = "";
  } else {
      // create new scoreInitials object
      var scoreInitials = {
          // Math.max to make sure score is always greater than or equal to 0
          score: Math.max(timeLeft + 1, 0),
          initials: initialsInput.value
      };

      // adding uniqueKey so that localStorage data isn't overidden
      var uniqueKey = Date.now();

      // Store highScores array in local storage with unique key
      localStorage.setItem(uniqueKey, JSON.stringify(scoreInitials));

      // Redirect to highscores page
      window.location.href = "highscores.html";
  }
};
