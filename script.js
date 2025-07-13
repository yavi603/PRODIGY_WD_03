const board = document.getElementById("gameBoard");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

function renderBoard() {
  board.innerHTML = "";
  gameState.forEach((value, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = value;
    cell.addEventListener("click", () => makeMove(index));
    board.appendChild(cell);
  });
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function makeMove(index) {
  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  checkWinner();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  renderBoard();
}

function checkWinner() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      gameActive = false;
      statusText.textContent = `Player ${gameState[a]} wins!`;
      return;
    }
  }

  if (!gameState.includes("")) {
    gameActive = false;
    statusText.textContent = "It's a draw!";
  }
}

function restartGame() {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  renderBoard();
}

renderBoard();
