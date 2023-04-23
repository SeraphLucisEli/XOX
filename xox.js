const board = document.querySelector('.board');
const squares = [];
let currentPlayer = 'X';
let squaresFilled = 0;
let gameBoard = ['', '', '', '', '', '', '', '', ''];

function checkWin() {
  const winningCombos = [    // horizontal    
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combo of winningCombos) {
    if (gameBoard[combo[0]] !== '' &&
        gameBoard[combo[0]] === gameBoard[combo[1]] &&
        gameBoard[combo[1]] === gameBoard[combo[2]]) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  return squaresFilled === 9;
}

function endGame(message) {
  alert(message);
  // TODO: reset game state and board
}

function switchPlayers() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function handleClick(e) {
  const square = e.target;
  const squareIndex = squares.indexOf(square);
  if (gameBoard[squareIndex] !== '') {
    return;
  }
  gameBoard[squareIndex] = currentPlayer;
  square.textContent = currentPlayer;
  squaresFilled++;

  if (checkWin()) {
    endGame(`Player ${currentPlayer} wins!`);
  } else if (checkTie()) {
    endGame('It\'s a tie!');
  } else {
    switchPlayers();
  }
}

// create a 3x3 grid
for (let i = 0; i < 9; i++) {
  const square = document.createElement('div');
  square.classList.add('square');
  square.setAttribute('id', i);
  square.addEventListener('click', handleClick);
  board.appendChild(square);
  squares.push(square);
}
