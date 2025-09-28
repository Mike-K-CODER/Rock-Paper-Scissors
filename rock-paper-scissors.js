let score = JSON.parse(localStorage.getItem('score'));

if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
    consecutiveWins: 0 // store streak inside score object
  };
};

// If old score in localStorage doesn't have streak yet, add it
if (score.consecutiveWins === undefined) {
  score.consecutiveWins = 0;
}

function updateScoreElements() {
  document.querySelector('.play-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
};

updateScoreElements();

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';
  
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.😂';
    } else if (computerMove === 'paper') {
      result = 'You win.😒';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  }

  else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.😒';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.😂';
    }
  }
  
  else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.😂';
    } else if (computerMove === 'scissors') {
      result = 'You win.😒';
    }
  }

  if (result === 'You win.😒') {
    score.wins += 1;
    score.consecutiveWins += 1; // increase streak

    if (score.consecutiveWins > 2) {
      alert("You're winning too much, stop it 👊.");
      score.consecutiveWins = 0; // reset after alert
    }
  }
  else if (result === 'You lose.😂') {
    score.losses += 1;
    score.consecutiveWins = 0; // reset streak
  }
  else if (result === 'Tie.') {
    score.ties += 1;
    score.consecutiveWins = 0; // reset streak
  }
  
  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElements();

  document.querySelector('.play-result').innerHTML = result;

  document.querySelector('.play-moves').innerHTML = `You chose
   <img src="./hand icons/${playerMove}-gloved.png" class="hand-icon"> 
    ,  I chose <img src="./hand icons/${computerMove}-gloved.png" class="hand-icon">`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove ='';
  
   if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
    } 
    else if (randomNumber >= 1 / 3 && randomNumber  < 2 / 3) {
      computerMove = 'paper';
    } 
    else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = 'scissors';
    }

  return computerMove; 
}
