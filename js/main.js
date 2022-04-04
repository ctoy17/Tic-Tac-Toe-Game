
/*constants - player color and wins*/
const play = {
    '1': 'Salmon',
    '-1': 'darkslategrey',
    'null': 'transparent'
};
const winCombos = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],    
];

/*----- app's state (variables) -----*/
let board;
let turn;
let winner;

/*----- cached element references ; will be frequently used-----*/
const squares = document.querySelectorAll('td div');
const result = document.querySelector('h2');

/*----- event listeners -----*/
document.querySelector('table').addEventListener('click', playerChoice);
document.querySelector('button').addEventListener('click', reloadGame);

/*----- functions -----*/
reloadGame();  
function reloadGame() {
    board = new Array(9).fill(null); /* start with blank game */
    turn = 1;
    winner = null;
    render();
}
function render() {
    board.forEach(function(sq, ind) {
        squares[ind].style.background = play[sq];
    });
    if (winner === 'T') {
        result.innerHTML = 'Tic-Tac-TOOOOOHHHH NO. A Tie!';
    } else if (winner) {
        result.innerHTML = `And the winner is... ${play[winner].toUpperCase()}!`;
    } else {
        result.innerHTML = `Make a move, ${play[turn].toUpperCase()}!`;
    }
}
function playerChoice(evt) {
    const ind = (evt.target.id.replace('sq', ''));
    if (board[ind] || winner) {
        return;
    }
    board[ind] = turn;
    turn *= -1; /*flips turn to other player*/
    winner = whoWon();
    render();
}


/* loop through all winning combinations. total of board positions in the index, and if equal to 3, set winner. if not check tie */
function whoWon() {
    for (let i = 0; i < winCombos.length; i++) {
        if (Math.abs(board[winCombos[i][0]] + board[winCombos[i][1]] + board[winCombos[i][2]]) === 3) {
            return board[winCombos[i][0]];
    } 
}
    if (board.includes(null)) {   /* if there are open boxes*/
        return null;
    }
    return 'T'; /* if there are no more nulls, return tie */
    }





