'use strict';

// Selecting elements
const playerZeroElement = document.querySelector('.player--0');
const playerOneElement = document.querySelector('.player--1');
const scoreZeroElement = document.querySelector('#score--0');
const currentZeroScore = document.querySelector('#current--0');
const scoreOneElement = document.querySelector('#score--1');
const currentOneScore = document.querySelector('#current--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting values

let finalScores, currentScore, activePlayer, playing;

const init = () => {
  finalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  scoreZeroElement.textContent = 0;
  currentZeroScore.textContent = 0;
  scoreOneElement.textContent = 0;
  currentOneScore.textContent = 0;

  diceElement.classList.add('hidden');

  playerZeroElement.classList.remove('player--winner');
  playerOneElement.classList.remove('player--winner');
  playerZeroElement.classList.add('player--active');
  playerOneElement.classList.remove('player--active');
};
init();

const togglePlayer = () => {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  playerZeroElement.classList.toggle('player--active');
  playerOneElement.classList.toggle('player--active');
};

// Rolling Dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    // 3. Check for a rolled 1:
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // if true, switch players\
      togglePlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    finalScores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      finalScores[activePlayer];

    if (finalScores[activePlayer] >= 100) {
      playing = false;
      diceElement.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }

    togglePlayer();
  }
});

btnNew.addEventListener('click', init);
