//Create gameboard as an array inside of an object

//Store players in objects
const player = (name, marker) => {
    this.name = name;
    this.marker = marker;
    return {name, marker};
}

const player1 = player('Player 1', 'X');
const player2 = player('Player 2', 'O');

//create a gameboard using the module pattern
const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = ["X", "O", "X", "O", "X", "O", "X", "X", "O"];
    displayBoard(board)
})();

//this function should render the contents of the gameboard array to the webpage;
const displayBoard = ((board) => {

    //to start: I want to display the array items from board in a 3x3 grid
    //eventually: every time a player takes a turn, i want the board to display their marker in the selected cell
})();