const gameController = (() => {
    const player = (name, marker) => {
        this.name = name;
        this.marker = marker;
        return {name, marker};
    }
    
    const player1 = player('Player 1', 'X');
    const player2 = player('Player 2', 'O');

    let activePlayer = player1;

    console.log(activePlayer.marker)

    return {
        activePlayer,
        player1,
        player2
    }
    
})()




function playerTurn(cell) {
    //if cell already contains a mark, do nothing
    //if cell if empty, add mark for the current player's turn. 
    //then run a function that checks for a winner
    //then run change the activePlayer to the other player
    if (cell.innerHTML == "") {
        console.log("empty");
        switchPlayer();

    } else {
        console.log("full");
    }
    
}

function switchPlayer() {
    if (gameController.activePlayer == gameController.player1) {
        gameController.activePlayer = gameController.player2;
        console.log("activePlayer: " + gameController.activePlayer.name)
    } else if (gameController.activePlayer == gameController.player2) {
        gameController.activePlayer = gameController.player1;
        console.log("activePlayer: " + gameController.activePlayer.name)
    }
    }


//create a gameboard using the module pattern
const gameBoard = (() => {
    const numRows = 3;
    const numColumns = 3;
    const boardSize = numRows * numColumns;
    const board = ["X", "O", "X", "O", "X", "O", "X", "X", "O"];

    let boardContainer = document.getElementById('gameboard');

    boardContainer.style.gridTemplateColumns = `repeat(3, 125px)`;
    boardContainer.style.gridTemplateRows = `repeat(3, 125px)`;

    for (let i = 0; i < boardSize; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerHTML = board[i];
        cell.addEventListener('click', function(){
            playerTurn(cell);
        });
        boardContainer.appendChild(cell);
    }
})();