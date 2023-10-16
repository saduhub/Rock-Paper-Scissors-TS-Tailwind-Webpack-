let playerChoice: string;
let computerChoice: string;
let playerScore: number = 0;
let computerScore: number = 0;

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
// Rock, paper, scissors buttons
const rock = document.querySelector('#rock') as HTMLDivElement;

rock.addEventListener( 'click', () => {
    rock.classList.remove('bg-stone-500', 'border-transparent');
    rock.classList.add('bg-stone-400', 'border-stone-200');
    paper.classList.remove('bg-stone-400', 'border-stone-200');
    scissors.classList.remove('bg-stone-400', 'border-stone-200');
    paper.classList.add('border-2', 'border-transparent', 'bg-stone-500');
    scissors.classList.add('border-2', 'border-transparent', 'bg-stone-500');
    playerChoice = "rock"
    console.log(playerChoice);
})

const paper = document.querySelector('#paper') as HTMLDivElement;

paper.addEventListener( 'click', () => {
    paper.classList.remove('bg-stone-500', 'border-transparent');
    paper.classList.add('bg-stone-400', 'border-stone-200');
    rock.classList.remove('bg-stone-400', 'border-stone-200');
    scissors.classList.remove('bg-stone-400', 'border-stone-200');
    rock.classList.add('border-2', 'border-transparent', 'bg-stone-500');
    scissors.classList.add('border-2', 'border-transparent', 'bg-stone-500');
    playerChoice = "paper"
    console.log(playerChoice);
})

const scissors = document.querySelector('#scissors') as HTMLDivElement;

scissors.addEventListener( 'click', () => {
    scissors.classList.remove('bg-stone-500', 'border-transparent');
    scissors.classList.add('bg-stone-400', 'border-stone-200');
    paper.classList.remove('bg-stone-400', 'border-stone-200');
    rock.classList.remove('bg-stone-400', 'border-stone-200');
    paper.classList.add('border-2', 'border-transparent', 'bg-stone-500');
    rock.classList.add('border-2', 'border-transparent', 'bg-stone-500');
    playerChoice = "scissors"
    console.log(playerChoice);
})
// Shoot button
const shootButton = document.querySelector('#shoot') as HTMLButtonElement;
const computerChoiceImage = document.querySelector('#computerChoiceImage') as HTMLImageElement;

let imageSources: string[] = ["./assets/three.svg", "./assets/two.svg", "./assets/one.svg"];
let imageSourcesOptions: string[] = ["./assets/paper.svg", "./assets/rock.svg", "./assets/scissors.svg"];
let currentIndex: number = 0;
// Each interval is assigned number. Undefined beforehand.
let interval: number | undefined;

shootButton.addEventListener('click', () => {
    currentIndex = 0;
    // Prevent effects og multiple clicks.
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
        console.log(result);
        console.log(`Player Score: ${playerScore} Computer Score: ${computerScore}`)

    }, 4000)
});