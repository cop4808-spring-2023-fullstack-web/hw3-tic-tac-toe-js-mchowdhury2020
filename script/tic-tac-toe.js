
// Mohammad Chowdhury

const statusDisplay = document.querySelector('.status');

let gameActive = true;
const player =  ["X", "O"];


let currentPlayer = player[Math.floor(Math.random()*2)]; // random Function to see who Goes first
let gameState = ["", "", "", "", "", "", "", "", ""];
let scorePlayer = 0; // keeps score VAR
let scoreComputer = 0; // keeps score VAR

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
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
function thinking(){

    let clickedCellIndex = 0;
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
     
    //let colorC = Math.floor(Math.random()*9)
    const m = 'div[data-cell-index= "';
    const n = '"] ';
    const colorCell = m + clickedCellIndex + n; // concatanates together 'div[data-cell-index= "randomnumber"]' which selects element by the data index attribute
    //alert("It's Player O's Turn");
    

    document.querySelector(colorCell).style.background = "red"; 
    setTimeout(clearCell,300);
   // clearCell();

}
function clearCell(){
    document.querySelector('div[data-cell-index= "0"]').style.background = "white"; 
    document.querySelector('div[data-cell-index= "1"]').style.background = "white"; 
    document.querySelector('div[data-cell-index= "2"]').style.background = "white"; 
    document.querySelector('div[data-cell-index= "3"]').style.background = "white"; 
    document.querySelector('div[data-cell-index= "4"]').style.background = "white"; 
    document.querySelector('div[data-cell-index= "5"]').style.background = "white"; 
    document.querySelector('div[data-cell-index= "6"]').style.background = "white"; 
    document.querySelector('div[data-cell-index= "7"]').style.background = "white"; 
    document.querySelector('div[data-cell-index= "8"]').style.background = "white"; 
}

   

   


if (currentPlayer == "O"){ // if it is player 0 it will call a funtion called computer turn which will deal with the computer moves
    console.log("Computer goes First ");
    //computerTurn();
   
    var mytime = setInterval(thinking,400);
    setTimeout(computerTurn, 2000) ;
    }
    else {console.log("Players goes first: Player is X ");}
      
statusDisplay.innerHTML = currentPlayerTurn();



function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    // only if player x change inner html since computerTurn takes care of computer move
    if (currentPlayer == "X"){
        clickedCell.innerHTML = currentPlayer;
        } 
        
 
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
    console.log("Current player is " + currentPlayer);
    //calls the computerTurn function
    if (currentPlayer == "O"){
        //computerTurn();
         mytime = setInterval(thinking,400);
        setTimeout(computerTurn, 2000) ;
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
          
        statusDisplay.innerHTML = winningMessage();
        const m = '[data-cell-index= "';
        const n = '"] ';
        const winningCell1 = m + winCondition[0] + n;
        const winningCell2 = m + winCondition[1] + n;
        const winningCell3 = m + winCondition[2] + n;
        document.querySelector(winningCell1).style.background = 'yellow';
        document.querySelector(winningCell2).style.background = 'yellow';
        document.querySelector(winningCell3).style.background = 'yellow';
            
            break
        }
    }

    if (roundWon) {
       
        statusDisplay.innerHTML = winningMessage();
        if(currentPlayer == "X"){
            scorePlayer +=1; // increments based on player
            document.getElementById("human").innerHTML = "Human: " + scorePlayer;    //changes the HTML with scores 
            console.log("Player has Won!");

        }else if(currentPlayer == "O"){
            scoreComputer +=1; // increments based on player
            document.getElementById("comp").innerHTML = "Computer: " + scoreComputer;    
            console.log("Computer has Won!");

        }

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
   console.log("Player has made a move.");
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
    currentPlayer = player[Math.floor(Math.random()*2)];
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.style.color = "rgb(65, 65, 65)";
    console.log("New Game Has started");
    console.log("Current player is " + currentPlayer );
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    document.querySelectorAll('.cell').forEach(cell => cell.style.background = "white");

    if (currentPlayer == "O"){ 
        mytime = setInterval(thinking,400);
        setTimeout(computerTurn, 2000) ;
        }
}

function computerTurn(){
    // This checks if the cell is free once chosen by random if not random again 
    
   let clickedCellIndex = 0;
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
/////end of choosing random number


    const m = 'div[data-cell-index= "';
    const n = '"] ';
    const CellInput = m + clickedCellIndex + n; // concatanates together 'div[data-cell-index= "randomnumber"]' which selects element by the data index attribute
    //alert("It's Player O's Turn");
    console.log("Computer's Turn ");
    let clickedCell = 0; // arbitary value since computer does not click
    document.querySelector(CellInput).innerHTML = "O";
    document.querySelector(CellInput).style.background = "red"; // places a O based on random cell choosen
    clearInterval(mytime);
   
    
    console.log("Computer has made a move ");
   
    handleCellPlayed(clickedCell,clickedCellIndex);  // puts the mark in the gamestate winning condition array.

    handleResultValidation(); // checks for winners

   
}


document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.restart').addEventListener('click', handleRestartGame);