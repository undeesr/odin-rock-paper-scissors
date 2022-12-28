let computerPoints = 0;
let playerPoints = 0;
let counter = 0;

function getComputerChoice() {
  // Initialize a variable 'randomNumber' with the value of a random number
  // from 0 to 1 (0 < n < 1)

  let randomNumber = Math.random();

  // if randomNumber <= 0.333 assign computerChoice to 'Rock'
  // else if randomNumber <= 0.666 assign computerChoice to 'Paper'
  // otherwise assign it to 'Scissors'

  let computerChoice =
    randomNumber <= 0.333
      ? "Rock"
      : randomNumber <= 0.666
      ? "Paper"
      : "Scissors";

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
    case playerSelection == "rock" && computerSelection == "scissors":
    case playerSelection == "paper" && computerSelection == "rock":
    case playerSelection == "scissors" && computerSelection == "paper":
      winOrLose = "Won";
      beatOrGetsBeaten = "beats";
      break;

    case playerSelection == "rock" && computerSelection == "paper":
    case playerSelection == "paper" && computerSelection == "scissors":
    case playerSelection == "scissors" && computerSelection == "rock":
      winOrLose = "Lost";
      beatOrGetsBeaten = "gets beaten by";
      break;

    case playerSelection == computerSelection:
      winOrLose = "Tied";
      beatOrGetsBeaten = "is the same as";
      break;

    default:
      alert("game aborted");
      return;
      break;
  }

  // return an array containing the response and whether the game is won or not

  return [
    `Round ${winOrLose}!, ${playerSelection} ${beatOrGetsBeaten} ${computerSelection}!`,
    winOrLose == "Won" ? true : winOrLose == "Tied" ? null : false,
  ];
}

function detectNode(node) {
  if (node === "👊") return "Rock";
  else if (node === "📃") return "Paper";
  else if (node === "✂") return "Scissors";
}

function game() {
  const gameArea = document.querySelector(".game-area");
  const optionsContainers = [
    document.createElement("div"),
    document.createElement("div"),
    document.createElement("div"),
  ];

  // build game scoreboard and it's sections

  const scoreboard = document.createElement("div");
  const upper = document.createElement("div");
  const lower = document.createElement("div");

  // build the scoreboards

  const computerArea = document.createElement("div");
  const playerArea = document.createElement("div");

  const computerList = document.createElement("ul");
  const playerList = document.createElement("ul");

  // build the greeting box

  const greetingBox = document.createElement("p");

  // add classes

  scoreboard.classList.toggle("scoreboard");
  upper.classList.toggle("upper");
  lower.classList.toggle("lower");
  computerArea.classList.toggle("scoreboard-area");
  playerArea.classList.toggle("scoreboard-area");
  computerList.classList.toggle("scoreboard-list");
  playerList.classList.toggle("scoreboard-list");
  greetingBox.classList.toggle("greeting-box");

  // add textContent to lists and greeting box

  computerList.innerHTML = "<li>POINTS</li>";
  playerList.innerHTML = "<li>POINTS</li>";

  greetingBox.textContent =
    "You'll be displayed with what happened this round right here.";

  // make them appear in the document

  document.body.appendChild(scoreboard);
  scoreboard.appendChild(upper);
  scoreboard.appendChild(lower);
  upper.appendChild(playerArea);
  upper.appendChild(computerArea);
  computerArea.appendChild(computerList);
  playerArea.appendChild(playerList);
  lower.appendChild(greetingBox);

  optionsContainers.forEach((container) => {
    container.classList.add("option-container");

    switch (optionsContainers.indexOf(container) + 1) {
      case 1:
        container.textContent = "👊";
        break;

      case 2:
        container.textContent = "📃";
        break;

      case 3:
        container.textContent = "✂";
        break;

      default:
        container.textContent = "NODE NOT FOUND";
    }

    gameArea.appendChild(container);

    // actually plays the game

    container.addEventListener("click", () => {
      if (counter < 3) {
        displayResult(container, computerList, playerList, greetingBox);
      } else {
        displayResult(container, computerList, playerList, greetingBox);
        let condition =
          playerPoints > computerPoints
            ? true
            : playerPoints < computerPoints
            ? false
            : null;
        computerList.innerHTML = "<li>POINTS</li>";
        playerList.innerHTML = "<li>POINTS</li>";

        let ctx = "";

        switch (condition) {
          case true:
            ctx += `You win! You score more points ${playerPoints}-${computerPoints}. Click another node to start a new game`;
            break;

          case false:
            ctx += `You lose! The computer scores more points ${playerPoints}-${computerPoints}. Click another node to start a new game`;
            break;

          case null:
            ctx += `Tied! both have same amount of points ${playerPoints}-${computerPoints}. Click another node to start a new game`;
            break;
        }

        counter = -1;
        computerPoints = 0;
        playerPoints = 0;

        greetingBox.textContent = ctx;
      }
    });
  });
}

function displayResult(ctr, cl, pl, gb) {
  let roundResult = playRound(detectNode(ctr.textContent), getComputerChoice());
  counter++;

  switch (roundResult[1]) {
    case true:
      pl.innerHTML += `<li>1</li>`;
      cl.innerHTML += `<li>0</li>`;
      playerPoints++;
      break;

    case false:
      cl.innerHTML += `<li>1</li>`;
      pl.innerHTML += `<li>0</li>`;
      computerPoints++;
      break;

    case null:
      pl.innerHTML += `<li>1/2</li>`;
      cl.innerHTML += `<li>1/2</li>`;
      playerPoints += 0.5;
      computerPoints += 0.5;
      break;
  }

  gb.textContent = roundResult[0];
  console.log(roundResult);
}

game();
