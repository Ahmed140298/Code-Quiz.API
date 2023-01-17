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
    score+=15;
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

}

//get the user initials to display
function userInitials() {

  let initialsInput = document.querySelector('#initials');
  // check input/initials characters length
  if (initialsInput.value.length > 3) {
      alert("Initials must not be more 3 characters");
      initialsInput.value = "";
  } else {
      // user Initials and score object
      var scoreAndInitials = {
        
          score: score,
          initials: initialsInput.value
      };

      // Store highScores array in local storage with unique key
      localStorage.setItem("score", JSON.stringify(scoreAndInitials));

      // Redirect to highscores page
      window.location.href = "highscores.html";
  }
};
