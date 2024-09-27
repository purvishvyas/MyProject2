// Select all the cells in the game board
const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');

// Track whose turn it is - X starts first
let isXTurn = true;

// Set up event listeners for each cell
cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true }); // Allow only one click per cell
});

// Handle the click event
function handleClick(e) {
    const cell = e.target;
    const currentPlayer = isXTurn ? 'X' : 'O'; // If it's X's turn, current player is X, otherwise it's O
    
    // Place the current player's mark in the cell
    placeMark(cell, currentPlayer);
    
    // Check if this move wins the game
    if (checkWin(currentPlayer)) {
        endGame(false); // A win condition
    } else if (isDraw()) {
        endGame(true); // A draw condition
    } else {
        // Swap turns
        swapTurns();
    }
}

// Function to place X or O in the clicked cell
function placeMark(cell, currentPlayer) {
    cell.textContent = currentPlayer;
}

// Function to swap turns between X and O
function swapTurns() {
    isXTurn = !isXTurn; // Flip the turn
    updateStatusMessage(); // Update the game status display
}

// Function to update the status message
function updateStatusMessage() {
    statusMessage.textContent = isXTurn ? "X's turn" : "O's turn";
}

// Function to check for a win (you can define winning logic here)
function checkWin(currentPlayer) {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Check if any winning combination is satisfied
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

// Function to check for a draw
function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent === 'X' || cell.textContent === 'O';
    });
}

// End the game and display the result
function endGame(draw) {
    if (draw) {
        statusMessage.textContent = "It's a Draw!";
    } else {
        statusMessage.textContent = `${isXTurn ? "X" : "O"} Wins!`;
    }
    // Disable further clicks on cells
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

// Restart the game
restartButton.addEventListener('click', restartGame);

function restartGame() {
    isXTurn = true; // Reset to X's turn
    statusMessage.textContent = "X's turn";
    // Clear the board and re-enable cell clicks
    cells.forEach(cell => {
        cell.textContent = ''; // Clear X and O marks
        cell.addEventListener('click', handleClick, { once: true }); // Re-enable clicking
    });
}
