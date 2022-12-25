function getComputerChoice() {

    // Initialize a variable 'randomNumber' with the value of a random number
    // from 0 to 1 (0 < n < 1) 

    let randomNumber = Math.random();
    
    // if randomNumber <= 0.333 assign computerChoice to 'Rock'
    // else if randomNumber <= 0.666 assign computerChoice to 'Paper'
    // otherwise assign it to 'Scissors'

    let computerChoice = (randomNumber <= 0.333) ? 'Rock' :
                         (randomNumber <= 0.666) ? 'Paper' :
                         'Scissors';
    

    return computerChoice;
}

function playRound(playerSelection, computerSelection) {

    // make playerSelection and computerSelection lowerCase to reduce ambiguity

    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    let winOrLose;
    let beatOrGetsBeaten;

    // decide the winner

    switch (true) {
        case (playerSelection == 'rock' && computerSelection == 'scissors'):
        case (playerSelection == 'paper' && computerSelection == 'rock'):
        case (playerSelection == 'scissors' && computerSelection == 'paper'):
            winOrLose = "Won";
            beatOrGetsBeaten = "beats";
            break;

        case (playerSelection == 'rock' && computerSelection == 'paper'):
        case (playerSelection == 'paper' && computerSelection == 'scissors'):
        case (playerSelection == 'scissors' && computerSelection == 'rock'):
            winOrLose = "Lost";
            beatOrGetsBeaten = "gets beaten by";
            break;

        case (playerSelection == computerSelection):
            winOrLose = "Tied";
            beatOrGetsBeaten = "is the same as";
            break;

        default:
            alert("game aborted")
            return;
            break;
    }

    // return an array containing the response and whether the game is won or not

    return (
[
`Game ${winOrLose}!, ${playerSelection} ${beatOrGetsBeaten} ${computerSelection}!`,
(winOrLose == "Won") ? true : (winOrLose == "Tied") ? null : false
]
    );
}

function game() {

    // greeting

    alert("ITS THE GAME OF ROCK PAPER SCISSORS! are you ready?");
    let playerPoints = 0;
    let computerPoints = 0;

    for (let index = 0; index < 5; index++) {

        // start round

        const playerInput = prompt(`Round ${index + 1}! What's your choice?\n'Rock', 'Paper' or 'Scissors'`)
        
        // store the results
        
        const result = playRound(playerInput, getComputerChoice());

        // alert the greeting

        alert(result[0])

        // if won then increase playerPoints otherwise increase computerPoints

        if (result[1] === true) {
            playerPoints++;
        } else if (result[1] === false) {
            computerPoints++;
        } else {
            playerPoints += 1/2;
            computerPoints += 1/2;
        }
    }

    // declare variable winner

    let winner;

    // check who the winner is

    if (playerPoints > computerPoints) {
        winner = "You";
    } else if (playerPoints < computerPoints) {
        winner = "The Computer";
    } else {
        winner = "Nobody";
    }

    // final greeting showing final result points

    alert(
`${winner} won! You had ${playerPoints} and the Computer had ${computerPoints}!`
        );

        // ask if the player wants to play again

    let playAgain = confirm("Do you want to play again?");

    if (playAgain) {
        game();
    }
}

// start game

game();