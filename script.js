const gameController = (() => {
    const player = (name, marker) => {
        this.name = name;
        this.marker = marker;
        return {name, marker};
    }
    
    const player1 = player('Player 1', 'X');
    const player2 = player('Player 2', 'O');

    let activePlayer = player1;

    let messageDisplay = document.getElementById('message');
    messageDisplay.innerHTML = `${activePlayer.name}'s turn`;
    messageDisplay.classList.add('playerOne');

    console.log(activePlayer.marker)

    return {
        activePlayer,
        player1,
        player2,
        messageDisplay
    }
    
})()




function playerTurn(cell, cellIndex) {
    if (cell.innerHTML == "") {
        gameBoard.board[cellIndex] = `${gameController.activePlayer.marker}`;
        updateDisplay(gameBoard.board);

        const noMoreMoves = !gameBoard.board.includes("");

        let winner = winnerCheck(gameBoard.board);
        if (winner) {
            console.log('winner!');
        } else if (noMoreMoves) {
            console.log('TIE');
        } else {
            switchPlayer();
        }
        console.log("winner: " + winner);

        
    } else {
        //if cell already contains a mark, do nothing
        console.log("cell is full");
    }
    
}

function switchPlayer() {
    if (gameController.activePlayer == gameController.player1) {
        gameController.activePlayer = gameController.player2;
        gameController.messageDisplay.innerHTML = "Player 2's turn";
        gameController.messageDisplay.classList.remove('playerOne');
        gameController.messageDisplay.classList.add('playerTwo');
        console.log("activePlayer: " + gameController.activePlayer.name)
    } else if (gameController.activePlayer == gameController.player2) {
        gameController.activePlayer = gameController.player1;
        gameController.messageDisplay.innerHTML = "Player 1's turn";
        gameController.messageDisplay.classList.remove('playerTwo');
        gameController.messageDisplay.classList.add('playerOne');
        console.log("activePlayer: " + gameController.activePlayer.name)
    }
}

function updateDisplay(board) {
    const numRows = 3;
    const numColumns = 3;
    const boardSize = numRows * numColumns;
    
    let boardContainer = document.getElementById('gameboard');

    boardContainer.innerHTML = "";

    boardContainer.style.gridTemplateColumns = `repeat(3, 125px)`;
    boardContainer.style.gridTemplateRows = `repeat(3, 125px)`;

    for (let i = 0; i < boardSize; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerHTML = board[i];
        cell.dataset.index = i;
        let cellIndex = cell.dataset.index;
        cell.addEventListener('click', function(){
            playerTurn(cell, cellIndex);
        });
        boardContainer.appendChild(cell);
        
    }
}


//create a gameboard using the module pattern
const gameBoard = (() => {

    const board = ["", "", "", "", "", "", "", "", ""];

    updateDisplay(board);

    return {board}
})();

function winnerCheck(board) {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]

    //see if the board contains the same marker 3x in a row on the gameboard
    //if it does, change the message to show the game winner

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] == board[b] && board[b] == board[c] && board[a] !== '') {
            console.log("board[a]: " + board[a])
            return board[a];
        } 
    }
    return null

    

    
}

// const winner = winnerCheck(gameBoard.board);
//     console.log("winner: " + winner);
//     if (winner) {
//         console.log(`Player ${winner} wins!`)
//     } else {
//         console.log("It's a tie!");
//     }

