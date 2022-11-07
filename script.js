const gameboardItems = document.querySelectorAll('.gameboard-items');
const buttonRestart = document.querySelector('#button-restart');
const resultID = document.querySelector('#result-id')

resultID.style.visibility="hidden"
//Setting global variables
let currentTurn = 'O';
let gameboard = ['','','','','','','','',''];
let winCounter = 0;
let PlayerO = [];
let PlayerX = [];
let turnCount = 0;
const winningPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

const playRound = (e) => {
    
    //If target items is not empty do nothing
    const gridItem = e.target;
    if(gridItem.innerHTML !== '') return
    matchChoices();
    
    let PlayerO_combinations = []
    let PlayerX_combinations = []

    gridItem.innerHTML = currentTurn;
    e.target.classList.add("fadeIn");

    gridIndex = gridItem.id.slice(gridItem.id.length-1,gridItem.id.length)
    gameboard[gridIndex] = currentTurn

    //Check if there is a winner
    if(currentTurn ==='O'){
        if(checkWinner(PlayerO,PlayerO_combinations) > 0){
            resultID.style.visibility="visible"
            resultID.classList.add('fadeIn')
            resultID.innerHTML = 'Player O won the game!';
            for(i of gameboardItems){
                i.removeEventListener('click',playRound);
            };
            buttonRestart.classList.add('grow-anim');
        }
    } else {
        if(checkWinner(PlayerX,PlayerX_combinations) > 0){
            resultID.style.visibility="visible"
            resultID.classList.add('fadeIn')
            resultID.innerHTML = 'Player X won the game!';
            for(i of gameboardItems){
                i.removeEventListener('click',playRound);
            };
            buttonRestart.classList.add('grow-anim');
        }
    };

    //If no one won, then pop up message to restart
    turnCount ++
    if(turnCount === 9 && (winCounter === 0)){
        console.log('No one won the match. Restart the game for a new match')
    }
}

//Add event listener for each cell in the grid
gameboardItems.forEach( (items) =>
    items.addEventListener('click', playRound)
);

//Restart button
buttonRestart.addEventListener('click', () => {
    location.reload();
})

//Match choices
const matchChoices = () => {
    if (currentTurn === 'X') {
        currentTurn = 'O'
    } else {
        currentTurn = 'X'
    };
    return currentTurn
}

//Look for a match in the winning patterns
const checkWinner = (Player,PlayerCombination) => {
    //Return index
    Player.push(gridIndex);
    if(Player.length>2){
        //Sort contents then run a for loop to to see if the current list contains a winning combination
        Player.sort();
        for(let i=0; i <= Player.length -1; i++){
            for(let j=1; j <= Player.length -1; j++){
                for(let k=2; k <= Player.length -1; k++){
                    if(k>j && j>i){
                        PlayerCombination.push([Player[i]+','+Player[j]+','+Player[k]])
                    }
                }
            } 
        }
        //Check the combination collection if it matches any of the winning patterns
        for(let i=0; i <= winningPatterns.length - 1; i++){
            for(let j=0; j <= PlayerCombination.length -1; j++){
                if(winningPatterns[i].toString() === (PlayerCombination[j].toString())){
                winCounter++
                }
            }
        }
    }
    return winCounter
}