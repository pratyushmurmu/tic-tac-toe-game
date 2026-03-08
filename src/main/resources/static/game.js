const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '')
            continue;
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusText.innerHTML = `Player <span class="${currentPlayer === 'x-icon' ? 'x-icon' : 'o-icon'}">${currentPlayer}</span> WINS!`;
        gameActive = false;
        return;
    }
    if (gameState.indexOf("") === -1) {
        statusText.innerHTML = "It's a DRAW!";
        gameActive = false;
    }
}
// ONLY ONE LOOP NEEDED
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const clickedCellIndex = parseInt(cell.getAttribute('data-index'));
        // Guard clause: stop if cell is taken or game over
        if (gameState[clickedCellIndex] !== "" || !gameActive)
            return;
        // 1. Update Logic
        gameState[clickedCellIndex] = currentPlayer;
        // 2. Update UI
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer === "X" ? "x-icon" : "o-icon");
        // 3. Check Win
        handleResultValidation();
        // 4. Switch Player ONLY if no one won yet
        if (gameActive) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.innerHTML = `Player <span class="${currentPlayer === 'X' ? 'x-icon' : 'o-icon'}">${currentPlayer}</span>'s Turn`;
        }
    });
});
resetBtn.addEventListener('click', () => { location.reload(); });
