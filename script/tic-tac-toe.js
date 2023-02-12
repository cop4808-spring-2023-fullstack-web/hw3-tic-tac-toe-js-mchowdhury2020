const statusDisplay = document.querySelector('.status');

let gameActive = true;
const player =  ["X", "O"];


let currentPlayer = player[Math.floor(Math.random()*2)]; // random Function to see who Goes first
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
if (currentPlayer == "O"){ // if it is player 0 it will call a funtion called computer turn which will deal with the computer moves
    computerTurn();
    }
      
statusDisplay.innerHTML = currentPlayerTurn();

function computerTurn(){
    // This checks if the cell is free once chosen by random if not random again 
    let empty = "NO";
while(empty == "NO"){
    clickedCellIndex = Math.floor(Math.random()*9);
    if (gameState[clickedCellIndex] !== "" ){
        empty = "NO";
    }
    else {
        empty = "YES";
    }
}   



const m = 'div[data-cell-index= "';
const n = '"] ';
const CellInput = m + clickedCellIndex + n; // concatanates together 'div[data-cell-index= "randomnumber"]' which selects element by the data index attribute
alert("It's Player O's Turn");
 let clickedCell = 0;
document.querySelector(CellInput).innerHTML = "f"; //places f for now for testing 


}



  





const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],  
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];



function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    
    if (currentPlayer == "X"){
        clickedCell.innerHTML = currentPlayer;
        } 
        
 
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
    if (currentPlayer == "O"){
        computerTurn();
        } 
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        statusDisplay.style.color = "rgb(251,100,204)";
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
   
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(65, 65, 65)";
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);