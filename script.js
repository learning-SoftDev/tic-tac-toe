const gameboardItems = document.querySelectorAll('.gameboard-items');
const buttonRestart = document.querySelector('#button-restart');

let currentTurn = 'O'
let gameboard = ['','','','','','','','',''];
let winCounterO = 0
let winCounterX = 0
const winningPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

let PlayerO = [];
let PlayerX = [];

let turnCount = 0

buttonRestart.addEventListener('click', () => {
    location.reload();
})


const playRound = (e) => {
    //If target items is not empty do nothing
    const gridItem = e.target;
    if(gridItem.innerHTML !== '') return
    matchChoices();
    
    let PlayerO_combinations = []
    let PlayerX_combinations = []

    gridItem.innerHTML = currentTurn
    
    gridIndex = gridItem.id.slice(gridItem.id.length-1,gridItem.id.length)
    gameboard[gridIndex] = currentTurn
    
    if(currentTurn ==='O'){
        PlayerO.push(gridIndex);
        if(PlayerO.length>2){

            //Sort contents then run a for loop to to see if the current list contains a winning combination
            PlayerO.sort();
            for(let i=0; i <= PlayerO.length -1; i++){
                for(let j=1; j <= PlayerO.length -1; j++){
                  for(let k=2; k <= PlayerO.length -1; k++){
                    if(k>j && j>i){
                      PlayerO_combinations.push([PlayerO[i]+','+PlayerO[j]+','+PlayerO[k]])
                    }
                  }
                } 
              }
              
            for(let i=0; i <= winningPatterns.length - 1; i++){
                for(let j=0; j <= PlayerO_combinations.length -1; j++){
                    if(winningPatterns[i].toString() === (PlayerO_combinations[j].toString())){
                    winCounterO ++
                    }
                }
            }
        }
    } else {
        PlayerX.push(gridIndex);
        if(PlayerX.length>2){
            PlayerX.sort();
            for(let i=0; i <= PlayerX.length -1; i++){
                for(let j=1; j <= PlayerX.length -1; j++){
                  for(let k=2; k <= PlayerX.length -1; k++){
                    if(k>j && j>i){
                      PlayerX_combinations.push([PlayerX[i]+','+PlayerX[j]+','+PlayerX[k]])
                    }
                  }
                } 
              }
              
            for(let i=0; i <= winningPatterns.length - 1; i++){
                for(let j=0; j <= PlayerX_combinations.length -1; j++){
                    if(winningPatterns[i].toString() === (PlayerX_combinations[j].toString())){
                    winCounterX ++
                    }
                }
            }
        };
    };

    
    
    
    if(winCounterO > 0 || winCounterX > 0){
        if(winCounterO > 0){
            console.log('O has won!')
            
        } else if(winCounterX > 0) {
            console.log('X has won!')
        }
        for(i of gameboardItems){
            i.removeEventListener('click',playRound);
        };

    }

    turnCount ++
    if(turnCount === 9 && (winCounterO === 0 && winCounterX === 0)){
        console.log('No one won the match. Restart the game for a new match')
    }
    
}

gameboardItems.forEach( (items) =>
    items.addEventListener('click', playRound)
);

const matchChoices = () => {
    if (currentTurn === 'X') {
        currentTurn = 'O'
    } else {
        currentTurn = 'X'
    };
    return currentTurn
}
