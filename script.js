let maxNumber = 100;
let randomNumber = generateRandomNumber(maxNumber);
let attempts = 0;
let highScore = localStorage.getItem("highScore") || null;

function generateRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function setDifficulty() {
  maxNumber = parseInt(document.getElementById("difficulty").value);
  restartGame(); // restart when difficulty changes
}

function checkGuess() {
  const userGuess = parseInt(document.getElementById("guessInput").value);
  const message = document.getElementById("message");
  const attemptsDisplay = document.getElementById("attempts");

  if (isNaN(userGuess)) {
    message.textContent = "⛔ Please enter a valid number.";
    return;
  }

  attempts++;

  if (userGuess === randomNumber) {
    message.textContent = `🎉 Correct! You guessed it in ${attempts} attempts.`;
    message.style.color = "green";

    // Check and update high score
    if (!highScore || attempts < highScore) {
      highScore = attempts;
      localStorage.setItem("highScore", highScore);
      updateHighScoreDisplay();
    }
  } else if (userGuess < randomNumber) {
    message.textContent = "📉 Too low! Try a higher number.";
    message.style.color = "orange";
  } else {
    message.textContent = "📈 Too high! Try a lower number.";
    message.style.color = "orange";
  }

  attemptsDisplay.textContent = `Attempts: ${attempts}`;
}

function updateHighScoreDisplay() {
  const highScoreDisplay = document.getElementById("highScoreDisplay");
  if (highScore) {
    highScoreDisplay.textContent = `🏆 Best Score: ${highScore} attempts`;
  } else {
    highScoreDisplay.textContent = `🏆 Best Score: --`;
  }
}

function restartGame() {
  randomNumber = generateRandomNumber(maxNumber);
  attempts = 0;
  document.getElementById("guessInput").value = "";
  document.getElementById("message").textContent = "";
  document.getElementById("attempts").textContent = "";
  updateHighScoreDisplay();
}

// Initial load
updateHighScoreDisplay();
