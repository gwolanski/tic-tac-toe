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

    let resetButton = document.getElementById('reset');
    function resetGame() {
    gameBoard.board = ["", "", "", "", "", "", "", "", ""];

    updateDisplay(gameBoard.board);
    }
    resetButton.addEventListener('click', resetGame);

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

        let winnerMark = winnerCheck(gameBoard.board);
        let winner;
        if (winnerMark == gameController.player1.marker) {
            winner = "Player 1";
        } else if (winnerMark == gameController.player2.marker) {
            winner = "Player 2";
        }

        let cells = document.getElementsByClassName("cell");
        let messageDiv = document.getElementById("message");

        if (winnerMark) {
            for (let i = 0; i < 9; i++) {
                cells[i].replaceWith(cells[i].cloneNode(true));
            }
            messageDiv.innerHTML = `${winner} (${winnerMark}) wins!`;
            messageDiv.setAttribute("id", "winner");
        } else if (noMoreMoves) {
            messageDiv.innerHTML = "It's a tie!";
            messageDiv.setAttribute("id", "tie");
        } else {
            switchPlayer();
        }
    }
    
    function switchPlayer() {
        if (gameController.activePlayer == gameController.player1) {
            gameController.activePlayer = gameController.player2;
            gameController.messageDisplay.innerHTML = "Player 2's turn";
            gameController.messageDisplay.classList.remove('playerOne');
            gameController.messageDisplay.classList.add('playerTwo');
        } else if (gameController.activePlayer == gameController.player2) {
            gameController.activePlayer = gameController.player1;
            gameController.messageDisplay.innerHTML = "Player 1's turn";
            gameController.messageDisplay.classList.remove('playerTwo');
            gameController.messageDisplay.classList.add('playerOne');
        }
    }

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
    
        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (board[a] == board[b] && board[b] == board[c] && board[a] !== '') {
                return board[a];
            } 
        }
        return null
    
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

    const controller = new AbortController();
    const { signal } = controller;

    for (let i = 0; i < boardSize; i++) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerHTML = board[i];
        cell.dataset.index = i;
        let cellIndex = cell.dataset.index;
        cell.addEventListener('click', function(){
            playerTurn(cell, cellIndex);
        }, {once: true}, { signal });
        boardContainer.appendChild(cell);
    }
}

const gameBoard = (() => {

    const board = ["", "", "", "", "", "", "", "", ""];

    updateDisplay(board);

    return {board}
})();