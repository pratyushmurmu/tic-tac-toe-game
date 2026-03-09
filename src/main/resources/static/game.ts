const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status') as HTMLElement;
const resetBtn = document.getElementById('resetBtn') as HTMLButtonElement;

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// --- 1. CLOUD SYNC LOGIC ---
// Define this outside so any part of your code can use it
async function saveResultToCloud(winner: string) {
    try {
        const response = await fetch('/api/save-result', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ winner: winner })
        });
        if (response.ok) {
            console.log("☁️ Cloud Sync Successful");
        }
    } catch (err) {
        console.error("❌ Cloud Sync Failed", err);
    }
}

// --- 2. WIN/DRAW LOGIC ---
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') continue;
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerHTML = `Player <span class="${currentPlayer === 'X' ? 'x-icon' : 'o-icon'}">${currentPlayer}</span> WINS!`;
        gameActive = false;
        saveResultToCloud(currentPlayer); // Trigger Sync
        return;
    }

    if (gameState.indexOf("") === -1) {
        statusText.innerHTML = "It's a DRAW!";
        gameActive = false;
        saveResultToCloud("Draw"); // Trigger Sync
    }
}

// --- 3. INPUT HANDLING ---
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const clickedCellIndex = parseInt(cell.getAttribute('data-index')!);

        if (gameState[clickedCellIndex] !== "" || !gameActive) return;

        gameState[clickedCellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer === "X" ? "x-icon" : "o-icon");

        handleResultValidation();

        if (gameActive) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.innerHTML = `Player <span class="${currentPlayer === 'X' ? 'x-icon' : 'o-icon'}">${currentPlayer}</span>'s Turn`;
        }
    });
});

resetBtn.addEventListener('click', () => { location.reload(); });