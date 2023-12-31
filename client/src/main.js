"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./output.css");
const workbox_window_1 = require("workbox-window");
// Check if service workers are supported
if ('serviceWorker' in navigator) {
    // register workbox service worker
    const workboxSW = new workbox_window_1.Workbox('./src-sw.js');
    workboxSW.register();
}
else {
    console.error('Service workers are not supported in this browser.');
}
// Global variables
let playerChoice;
let computerChoice;
let playerScore = 0;
let computerScore = 0;
// Default method needed as TS does not know how to interpret .svg files without module declaration. 
let questionSvg = require("./assets/question.svg");
let imageSources = [
    require("./assets/three.svg").default,
    require("./assets/two.svg").default,
    require("./assets/one.svg").default
];
let imageSourcesOptions = [
    require("./assets/paper.svg").default,
    require("./assets/rock.svg").default,
    require("./assets/scissors.svg").default
];
let currentIndex = 0;
let interval; // Each interval is assigned number. Undefined beforehand.
// Selected elements.
const rock = document.querySelector('#rock');
const paper = document.querySelector('#paper');
const scissors = document.querySelector('#scissors');
const shootButton = document.querySelector('#shoot');
const computerChoiceImage = document.querySelector('#computerChoiceImage');
const outcome = document.querySelector('#outcome');
const playerPoints = document.querySelector('#playerPoints');
const computerPoints = document.querySelector('#computerPoints');
const resetButton = document.querySelector('#resetButton');
// Global functions.
const determineWinner = (playerChoice, computerChoice) => {
    if (playerChoice === computerChoice) {
        return "It's a draw!";
    }
    switch (playerChoice) {
        case 'rock':
            if (computerChoice === 'scissors') {
                playerScore++;
                return 'You win!';
            }
            if (computerChoice === 'paper') {
                computerScore++;
                return 'Computer wins!';
            }
        case 'paper':
            if (computerChoice === 'rock') {
                playerScore++;
                return 'You win!';
            }
            if (computerChoice === 'scissors') {
                computerScore++;
                return 'Computer wins!';
            }
        case 'scissors':
            if (computerChoice === 'rock') {
                computerScore++;
                return 'Computer wins!';
            }
            if (computerChoice === 'paper') {
                playerScore++;
                return 'You win!';
            }
        default:
            return 'Something went wrong';
    }
};
const setOutcome = (resultOfShoot) => {
    outcome.textContent = resultOfShoot;
    outcome.classList.remove('text-transparent', 'text-green-500', 'text-red-500', 'text-teal-300');
    if (resultOfShoot === "You win!") {
        outcome.classList.add('text-green-500');
    }
    else if (resultOfShoot === "Computer wins!") {
        outcome.classList.add('text-red-500');
    }
    else if (resultOfShoot === "It's a draw!") {
        outcome.classList.add('text-teal-300');
    }
};
const setScore = (scorePlayer, scoreComputer) => {
    const scorePlayerToText = scorePlayer.toString();
    const scoreComputerToText = scoreComputer.toString();
    playerPoints.textContent = scorePlayerToText;
    computerPoints.textContent = scoreComputerToText;
};
const loadScoresFromLocalStorage = () => {
    const storedScores = localStorage.getItem('rockPaperScissorsScores');
    if (storedScores) {
        const scores = JSON.parse(storedScores);
        playerScore = scores.playerScore;
        computerScore = scores.computerScore;
        setScore(playerScore, computerScore);
    }
};
const saveScoresToLocalStorage = () => {
    const scores = {
        playerScore: playerScore,
        computerScore: computerScore
    };
    localStorage.setItem('rockPaperScissorsScores', JSON.stringify(scores));
};
const deleteScoresFromLocalStorage = () => {
    localStorage.removeItem('rockPaperScissorsScores');
};
// Event listeners.
rock.addEventListener('click', () => {
    rock.classList.remove('bg-stone-500', 'border-transparent');
    rock.classList.add('bg-stone-400', 'border-stone-200');
    paper.classList.remove('bg-stone-400', 'border-stone-200');
    scissors.classList.remove('bg-stone-400', 'border-stone-200');
    paper.classList.add('border-2', 'border-transparent', 'bg-stone-500');
    scissors.classList.add('border-2', 'border-transparent', 'bg-stone-500');
    playerChoice = "rock";
    shootButton.classList.remove('cursor-not-allowed');
    shootButton.removeAttribute('disabled');
});
paper.addEventListener('click', () => {
    paper.classList.remove('bg-stone-500', 'border-transparent');
    paper.classList.add('bg-stone-400', 'border-stone-200');
    rock.classList.remove('bg-stone-400', 'border-stone-200');
    scissors.classList.remove('bg-stone-400', 'border-stone-200');
    rock.classList.add('border-2', 'border-transparent', 'bg-stone-500');
    scissors.classList.add('border-2', 'border-transparent', 'bg-stone-500');
    playerChoice = "paper";
    shootButton.classList.remove('cursor-not-allowed');
    shootButton.removeAttribute('disabled');
});
scissors.addEventListener('click', () => {
    scissors.classList.remove('bg-stone-500', 'border-transparent');
    scissors.classList.add('bg-stone-400', 'border-stone-200');
    paper.classList.remove('bg-stone-400', 'border-stone-200');
    rock.classList.remove('bg-stone-400', 'border-stone-200');
    paper.classList.add('border-2', 'border-transparent', 'bg-stone-500');
    rock.classList.add('border-2', 'border-transparent', 'bg-stone-500');
    playerChoice = "scissors";
    shootButton.classList.remove('cursor-not-allowed');
    shootButton.removeAttribute('disabled');
});
shootButton.addEventListener('click', () => {
    currentIndex = 0;
    // Prevent effects of multiple clicks.
    shootButton.setAttribute('disabled', '');
    if (interval !== undefined) {
        clearInterval(interval);
    }
    interval = window.setInterval(() => {
        computerChoiceImage.src = imageSources[currentIndex];
        currentIndex++;
        // Stop interval at end of array
        if (currentIndex >= imageSources.length) {
            clearInterval(interval);
        }
    }, 1000);
    const randomNumber = Math.floor(Math.random() * 3);
    setTimeout(() => {
        computerChoiceImage.src = imageSourcesOptions[randomNumber];
        const filename = computerChoiceImage.src.split('/').pop();
        if (filename) {
            computerChoice = filename.split('.')[0];
        }
        const result = determineWinner(playerChoice, computerChoice);
        setOutcome(result);
        setScore(playerScore, computerScore);
        saveScoresToLocalStorage();
        shootButton.removeAttribute('disabled');
    }, 4000);
});
resetButton.addEventListener('click', () => {
    playerScore = 0,
        computerScore = 0,
        setScore(playerScore, computerScore);
    outcome.classList.remove('text-green-500', 'text-red-500', 'text-white');
    outcome.classList.add('text-transparent');
    deleteScoresFromLocalStorage();
});
// Onload functions
loadScoresFromLocalStorage();
