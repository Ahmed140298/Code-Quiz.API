window.onload = function () {
  // get the highscores ordered list
  var highScores = document.querySelector("#highscores");

  // setting variable for 'clear highscores' button
  clearScoreButton = document.querySelector("#clear");

  // create an empty array to store the scores
  var scores = [];
  // loop through the items in local storage
  for (var i = 0; i < localStorage.length; i++) {
      // get the key for the current item
      var key = localStorage.key(i);
      // get the scoreInitials object from local storage
      var scoreInitials = JSON.parse(localStorage.getItem(key));
      // push the scoreInitials object into the scores array
      scores.push(scoreInitials);
  }

  // sort the scores array by score in descending order
  scores.sort(function (a, b) {
      return b.score - a.score;
  });

  // loop through the sorted scores array
  for (var i = 0; i < scores.length; i++) {
      // create a new list item
      var output = document.createElement("li");
      // set the text content of list item to the score and initials
      output.textContent = scores[i].initials + " - " + scores[i].score;
      // add list item to the highscores ordered list
      highScores.appendChild(output);
  }

  clearScoreButton.addEventListener("click", function() {
      localStorage.clear();
      // var ol = document.getElementById("highscores");
      highScores.innerHTML = "";
  });
};
