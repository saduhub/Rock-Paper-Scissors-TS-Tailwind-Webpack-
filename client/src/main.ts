import './output.css'
// Global variables
let playerChoice: string;
let computerChoice: string;
let playerScore: number = 0;
let computerScore: number = 0;
let imageSources: string[] = ["./assets/three.svg", "./assets/two.svg", "./assets/one.svg"];
let imageSourcesOptions: string[] = ["./assets/paper.svg", "./assets/rock.svg", "./assets/scissors.svg"];
let currentIndex: number = 0;
let interval: number | undefined;  // Each interval is assigned number. Undefined beforehand.
// Types
type Scores = {
    playerScore: number;
    computerScore: number;
}
// Selected elements.
const rock = document.querySelector('#rock') as HTMLDivElement;
const paper = document.querySelector('#paper') as HTMLDivElement;
const scissors = document.querySelector('#scissors') as HTMLDivElement;
const shootButton = document.querySelector('#shoot') as HTMLButtonElement;
const computerChoiceImage = document.querySelector('#computerChoiceImage') as HTMLImageElement;
const outcome = document.querySelector('#outcome') as HTMLHeadingElement
const playerPoints = document.querySelector('#playerPoints') as HTMLSpanElement
const computerPoints = document.querySelector('#computerPoints') as HTMLSpanElement
const resetButton = document.querySelector('#resetButton') as HTMLButtonElement

// Global functions.
const determineWinner = (playerChoice: string, computerChoice: string): string => {
    if (playerChoice === computerChoice) {
        return "It's a draw!";
    }

    switch (playerChoice) {
        case 'rock':
            if (computerChoice === 'scissors') {
                playerScore++
                return 'You win!';
            }
            if (computerChoice === 'paper') {
                computerScore++
                return 'Computer wins!';
            } 
        case 'paper':
            if (computerChoice === 'rock') {
                playerScore++
                return 'You win!';
            }
            if (computerChoice === 'scissors') {
                computerScore++
                return 'Computer wins!';
            }
        case 'scissors':
            if (computerChoice === 'rock') {
                computerScore++
                return 'Computer wins!';
            }
            if (computerChoice === 'paper') {
                playerScore++
                return 'You win!';
            }
        default:
            return 'Something went wrong'
            
    }
};

const setOutcome = (resultOfShoot: string): void => {
    outcome.textContent = resultOfShoot;
    outcome.classList.remove('text-transparent', 'text-green-500', 'text-red-500', 'text-teal-300');
    if (resultOfShoot === "You win!") {
        outcome.classList.add('text-green-500');
    } else if (resultOfShoot === "Computer wins!") {
        outcome.classList.add('text-red-500');
    } else if (resultOfShoot === "It's a draw!") {
        outcome.classList.add('text-teal-300');
    }
}

const setScore = (scorePlayer: number, scoreComputer:number): void => {
    const scorePlayerToText: string = scorePlayer.toString();
    const scoreComputerToText: string = scoreComputer.toString();
    playerPoints.textContent = scorePlayerToText;
    computerPoints.textContent = scoreComputerToText;
}

const loadScoresFromLocalStorage = (): void => {
    const storedScores = localStorage.getItem('rockPaperScissorsScores');
    if (storedScores) {
        const scores: Scores = JSON.parse(storedScores);
        playerScore = scores.playerScore;
        computerScore = scores.computerScore;
        setScore(playerScore, computerScore);
    }
}

const saveScoresToLocalStorage = (): void => {
    const scores: Scores = {
        playerScore: playerScore,
        computerScore: computerScore
    };
    localStorage.setItem('rockPaperScissorsScores', JSON.stringify(scores));
}

const deleteScoresFromLocalStorage = (): void => {
    localStorage.removeItem('rockPaperScissorsScores');
}

// Event listeners.
rock.addEventListener( 'click', () => {
    rock.classList.remove('bg-stone-500', 'border-transparent');
    rock.classList.add('bg-stone-400', 'border-stone-200');
    paper.classList.remove('bg-stone-400', 'border-stone-200');
    scissors.classList.remove('bg-stone-400', 'border-stone-200');
    paper.classList.add('border-2', 'border-transparent', 'bg-stone-500');
    scissors.classList.add('border-2', 'border-transparent', 'bg-stone-500');
    playerChoice = "rock"
    shootButton.classList.remove('cursor-not-allowed');
    shootButton.removeAttribute('disabled');
})

paper.addEventListener( 'click', () => {
    paper.classList.remove('bg-stone-500', 'border-transparent');
    paper.classList.add('bg-stone-400', 'border-stone-200');
    rock.classList.remove('bg-stone-400', 'border-stone-200');
    scissors.classList.remove('bg-stone-400', 'border-stone-200');
    rock.classList.add('border-2', 'border-transparent', 'bg-stone-500');
    scissors.classList.add('border-2', 'border-transparent', 'bg-stone-500');
    playerChoice = "paper"
    shootButton.classList.remove('cursor-not-allowed');
    shootButton.removeAttribute('disabled');
})

scissors.addEventListener( 'click', () => {
    scissors.classList.remove('bg-stone-500', 'border-transparent');
    scissors.classList.add('bg-stone-400', 'border-stone-200');
    paper.classList.remove('bg-stone-400', 'border-stone-200');
    rock.classList.remove('bg-stone-400', 'border-stone-200');
    paper.classList.add('border-2', 'border-transparent', 'bg-stone-500');
    rock.classList.add('border-2', 'border-transparent', 'bg-stone-500');
    playerChoice = "scissors"
    shootButton.classList.remove('cursor-not-allowed');
    shootButton.removeAttribute('disabled');
})

shootButton.addEventListener('click', () => {
    currentIndex = 0;
    // Prevent effects of multiple clicks.
    shootButton.setAttribute('disabled', '')
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

    const randomNumber: number = Math.floor(Math.random() * 3);

    setTimeout(() => {
        computerChoiceImage.src = imageSourcesOptions[randomNumber];
        const filename: string | undefined = computerChoiceImage.src.split('/').pop(); 
        if (filename) {
            computerChoice = filename.split('.')[0];
        }

        const result: string = determineWinner(playerChoice, computerChoice);

        setOutcome(result);
        setScore(playerScore, computerScore);
        saveScoresToLocalStorage();

        shootButton.removeAttribute('disabled')
    }, 4000)
});

resetButton.addEventListener ('click', () => {
    playerScore = 0,
    computerScore = 0,
    setScore(playerScore, computerScore);
    outcome.classList.remove('text-green-500', 'text-red-500', 'text-white');
    outcome.classList.add('text-transparent');
    deleteScoresFromLocalStorage(); 
} )

// Onload functions
loadScoresFromLocalStorage();