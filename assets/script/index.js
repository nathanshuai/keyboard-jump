'use strict';


/*animation
*/


const figure = document.querySelector(".minions");
const center = document.querySelector(".center");
const playGround = document.querySelector('.playground');

const backgroundSound = new Audio('./assets/audio/backgroundsound.mp3');
backgroundSound.type = 'audio/mp3';

const hitsSound = new Audio('./assets/audio/hitssound.mp3');
hitsSound.type = 'audio/mp3';

const finishSound = new Audio('./assets/audio/finishsounds.mp3');
finishSound.type = 'audio/mp3';

window.onload = function() {
  figure.style.top = "50%";
}




//scoreboard timer

//playboard 

class Score {
  #date;
  #points;
  #percentage;

  constructor(date, points, total) {
    this.#date = date;
    this.#points = points;
    this.#percentage = Math.round((points / total) * 100);
  }

  get date() {
    return this.#date;
  }

  get points() {
    return this.#points;
  }

  get percentage() {
    return this.#percentage;
  }
}

const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population', 
'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute', 
'discipline', 'machine', 'accurate', 'connection', 'rainbow', 'bicycle', 
'eclipse', 'calculator', 'trouble', 'watermelon', 'developer', 'philosophy', 
'database', 'periodic', 'capitalism', 'abominable', 'component', 'future', 
'pasta', 'microwave', 'jungle', 'wallet', 'canada', 'coffee', 'beauty', 'agency', 
'chocolate', 'eleven', 'technology', 'alphabet', 'knowledge', 'magician', 
'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution', 
'banana', 'perfumer', 'computer', 'management', 'discovery', 'ambition', 'music', 
'eagle', 'crown', 'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button',
'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework', 
'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery', 
'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow', 
'keyboard', 'window']; 

let points = 0;
let timeLeft = 99;
let gameTimer;
let randomWord = getRandomWord();
const wordElement = document.getElementById('word');

const wordInput = document.getElementById('input');
const message = document.getElementById('message');
const pointsDisplay = document.getElementById('points');
const timeLeftDisplay = document.getElementById('time-left');
const submitButton = document.getElementById('submit-button');
const resultContainer = document.querySelector('.result-container');
const restartButton = document.getElementById('restart-button');
const scoreDisplay = document.getElementById('score');
const dateDisplay = document.getElementById('date');
const percentageDisplay = document.getElementById('percentage');

const scores = [];

submitButton.addEventListener('click', submitWord);
wordInput.addEventListener('keypress', handleKeyPress);
restartButton.addEventListener('click', reStartGame);

// Function to start game
function startGame() {
  figure.remove();
  center.remove();
  hitsSound.play();
  backgroundSound.play();
  playGround.classList.remove('playground');
  points = 0;
  timeLeft = 99;
  randomWord = getRandomWord();
  message.textContent = '';
  wordElement.textContent = randomWord;
  pointsDisplay.textContent = `Points: ${points}`;
  timeLeftDisplay.textContent = ` ${timeLeft} `;
  wordInput.value = '';
  wordInput.disabled = false;
  submitButton.disabled = false;
  resultContainer.classList.add('hidden');
  gameTimer = setInterval(updateTimer, 1000);
}  

function reStartGame() {
  hitsSound.play();
  backgroundSound.play();
  playGround.classList.remove('playground');
  points = 0;
  timeLeft = 99;
  randomWord = getRandomWord();
  message.textContent = '';
  wordElement.textContent = randomWord;
  pointsDisplay.textContent = `Points: ${points}`;
  timeLeftDisplay.textContent = ` ${timeLeft}`;
  wordInput.value = '';
  wordInput.disabled = false;
  submitButton.disabled = false;
  resultContainer.classList.add('hidden');
  gameTimer = setInterval(updateTimer, 1000);
}  

function submitWord() {
  hitsSound.play();
  const word = wordInput.value.toLowerCase().trim();
  if (word === randomWord) {
      points++;
      message.textContent = 'Hit!';
      pointsDisplay.textContent = `Points: ${points}`;
  } else {
      message.textContent = 'Miss!';
  }
  randomWord = getRandomWord();
  wordElement.textContent = randomWord;
  wordInput.value = '';
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    submitWord();
    randomWord = getRandomWord();
    wordElement.textContent = randomWord;
    wordInput.value = '';
  }
}

function updateTimer() {
  timeLeft--;
  timeLeftDisplay.textContent = ` ${timeLeft}`;
  if (timeLeft <= 0) {
      endGame();
  }
}

function endGame() {
  finishSound.play();
  clearInterval(gameTimer);
  wordInput.disabled = true;
  submitButton.disabled = true;
  scoreDisplay.textContent = points;
  resultContainer.classList.remove('hidden');
  playGround.classList.add('playground');
  let total = 90
  const date = new Date();
  const score = new Score(date, points, total);
  scores.push(score);
  
  scoreDisplay.textContent = `You points: ${score.points}`;
  percentageDisplay.textContent = `Percentage: ${score.percentage} %`;
  dateDisplay.textContent = `Date: ${score.date.toString().substring(3, 15)}`;

}

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}




