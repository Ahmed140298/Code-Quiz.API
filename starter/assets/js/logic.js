var timeLeft = 76;

var screenStart = document.querySelector('#start-screen');
var timer =  document.querySelector('#time');
var startButton = document.querySelector('#start');
var questions = document.querySelector('#questions');
var questionTitle = document.querySelector('#question-title');
var answers = document.querySelector('#choices');
var endScreen = document.querySelector('#end-screen');
var finalScore = document.querySelector('#final-score');
var initials = document.querySelector('#initials');
var submit = document.querySelector('#submit');
var feedback = document.querySelector('#feedback');

var questionCount = 0;
startButton.addEventListener('click', setTime);

function setTime() {
    displayQestions();

    let timeInterval = setInterval(function() {
        timeLeft --;
        timer.textContent = '';
        timer.textContent = 'Timer: ' + timeLeft;

        if(timeLeft <= 0 || questionsCount === questions.length) {
            clearInterval(timeInterval);
            getUserScore();
        }
    }, 1000);
}

function displayQuestions() {
    removeElements(startButton);
    if(questionCount < questions.length) {
        questions.innerHTML = questions[questionCount].question;
        answers.textContent = '';

        for(let i = 0; i < questions[questionCount.length]; i++) {
            let
        }
    }
}

function removeElements(elements) {
    for (let element of elements) element.remove();
  }