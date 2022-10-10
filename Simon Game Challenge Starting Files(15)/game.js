var byttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

// creating a function to restart the game
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started();
}

// creating an animation when the user clicks
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100)
}

// play music selected by the user and check if functions are the same
function playSoundAndCheckAnswer(name) {
  var lastClick = userClickedPattern.length - 1;
  if (userClickedPattern[lastClick] !== gamePattern[lastClick]) {
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    new Audio("sounds/wrong.mp3").play();
    startOver();
  } else if (userClickedPattern[lastClick] === gamePattern[lastClick]) {
    new Audio("sounds/" + name + ".mp3").play();
  }
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = byttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSoundAndCheckAnswer(randomChosenColour);
  level += 1;
  $("#level-title").text("level " + level);
}

// user input
$(".btn").click(function(a) {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSoundAndCheckAnswer(userChosenColour);
  animatePress(userChosenColour);
  if (gamePattern.length === userClickedPattern.length && gamePattern.length > 0) {
    userClickedPattern = [];
    setTimeout(nextSequence, 1000)
  }
})

// determine the key and start the game
function started() {
  $("body").one("keypress", function() {
    $("#level-title").text("level " + level);
    nextSequence();
  })
}

started();
