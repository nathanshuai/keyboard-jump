'use strict';


/*animation
*/


const figure = document.querySelector('.minions');
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

const dialog = document.querySelector('dialog');
const scoreTable = document.querySelector('dialog table tbody');



submitButton.addEventListener('click', submitWord);
wordInput.addEventListener('keypress', handleKeyPress);
restartButton.addEventListener('click', reStartGame);


dialog.addEventListener('click', function(e) {
  const rect = this.getBoundingClientRect();

  if (e.clientY < rect.top || e.clientY > rect.bottom ||
      e.clientX < rect.left || e.clientX > rect.right){
        dialog.close();
      }
});


// Function to start game
function startGame() {
  figure.remove();
  center.remove();
  reStartGame();
}  

function reStartGame() {
  hitsSound.play();
  backgroundSound.play();
  playGround.classList.remove('playground');
  points = 0;
  timeLeft = 9;
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
  dialog.close();
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

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}


function endGame() {
  finishSound.play();
  clearInterval(gameTimer);
  wordInput.disabled = true;
  submitButton.disabled = true;
  scoreDisplay.textContent = points;
  dialog.innerHTML = '<h3>High Score</h3>';
  resultContainer.classList.remove('hidden');
  playGround.classList.add('playground');

  let scores = [];
  const score = new Score(new Date(), points, 90);

  scoreDisplay.textContent = `You points: ${score.points}`;
  percentageDisplay.textContent = `Percentage: ${score.percentage} %`;
  dateDisplay.textContent = `Date: ${score.date.toString().substring(3, 15)}`;
  
  const scoreObject = {
    hits: points,
    percentage: Math.round((points / 90) * 100)
  };

  scores.push(scoreObject);
  scores.sort((a, b) => b.hits - a.hits);
  scores.splice(9);
  const toString = JSON.stringify(scores)
  localStorage.setItem('scores', toString);
  displayScores();
}  

function displayScores() {
  const storedScores = JSON.parse(localStorage.getItem('scores'));

  // If there are no scores, display a message
  if (!storedScores || storedScores.length === 0) {
    console.log('No scores to display.');
    return;
  }

  const table = document.createElement('table');

  const headerRow = document.createElement('tr');
  const rankHeader = document.createElement('th');
  const hitsHeader = document.createElement('th');
  const percentageHeader = document.createElement('th');
  rankHeader.textContent = 'Rank';
  hitsHeader.textContent = 'Hits';
  percentageHeader.textContent = 'Percentage';
  headerRow.appendChild(rankHeader);
  headerRow.appendChild(hitsHeader);
  headerRow.appendChild(percentageHeader);
  table.appendChild(headerRow);

  // Create a row for each score
  storedScores.forEach((score, index) => {
    const row = document.createElement('tr');
    const rankCell = document.createElement('td');
    const hitsCell = document.createElement('td');
    const percentageCell = document.createElement('td');
    rankCell.textContent = ` No.${index + 1}`;
    hitsCell.textContent = score.hits;
    percentageCell.textContent = `${score.percentage} %`;
    row.appendChild(rankCell);
    row.appendChild(hitsCell);
    row.appendChild(percentageCell);
    table.appendChild(row);
  });

  // Display the table in a dialog
  const dialog = document.querySelector('dialog');
  dialog.appendChild(table);
  dialog.showModal();
}






