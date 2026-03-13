/* =============================================================================
   1. CORE VARIABLES & INITIALIZATION
   ============================================================================= */
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const dot = document.getElementById("cursor-dot");
const outline = document.getElementById("cursor-outline");
const scrollBtn = document.getElementById("scrollTopBtn");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

/* =============================================================================
   2. UNBEATABLE AI (MINIMAX ALGORITHM)
   ============================================================================= */
function checkWinnerForMinimax(board) {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function minimax(board, depth, isMaximizing) {
    const winner = checkWinnerForMinimax(board);
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (board.every(cell => cell !== '')) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function bestMove() {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
        if (gameState[i] === '') {
            gameState[i] = 'O';
            let score = minimax(gameState, 0, false);
            gameState[i] = '';
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

/* =============================================================================
   3. GAMEPLAY & INPUT HANDLING
   ============================================================================= */
function executeMove(index, player) {
    gameState[index] = player;
    cells[index].textContent = player;
    cells[index].classList.add(player === "X" ? "x-icon" : "o-icon");
    handleResultValidation();
}

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const clickedIndex = parseInt(cell.getAttribute('data-index'));

        if (gameState[clickedIndex] !== "" || !gameActive || currentPlayer !== "X") return;

        // 1. Human Move
        executeMove(clickedIndex, "X");

        // 2. AI Move (with "Thinking" delay)
        if (gameActive) {
            currentPlayer = "O";
            statusText.innerHTML = "AI is thinking...";

            setTimeout(() => {
                const moveIndex = bestMove();
                if (moveIndex !== undefined) {
                    executeMove(moveIndex, "O");
                    if (gameActive) {
                        currentPlayer = "X";
                        statusText.innerHTML = `Player <span class="x-icon">X</span>'s Turn`;
                    }
                }
            }, 600);
        }
    });
});

/* =============================================================================
   4. WIN LOGIC & CLOUD SYNC
   ============================================================================= */
async function saveResultToCloud(winner) {
    try {
        const response = await fetch('/api/save-result', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ winner })
        });
        if (response.ok) console.log("☁️ Cloud Sync Successful");
    } catch (err) {
        console.error("❌ Cloud Sync Failed", err);
    }
}

function handleResultValidation() {
    let roundWon = false;
    let winningCombo = null;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            winningCombo = winningConditions[i];
            break;
        }
    }

    if (roundWon) {
        statusText.innerHTML = `Player <span class="${currentPlayer === 'X' ? 'x-icon' : 'o-icon'}">${currentPlayer}</span> WINS!`;
        gameActive = false;
        drawWinLine(winningCombo);
        saveResultToCloud(currentPlayer);
        return;
    }

    if (!gameState.includes("")) {
        statusText.innerHTML = "It's a DRAW!";
        gameActive = false;
        saveResultToCloud("Draw");
    }
}

/* =============================================================================
   5. UI EXTRAS (Cursor, Win Line, Scroll)
   ============================================================================= */
function drawWinLine(combination) {
    const line = document.getElementById('win-line');
    if (!line) return;
    const rect1 = cells[combination[0]].getBoundingClientRect();
    const rect2 = cells[combination[2]].getBoundingClientRect();
    const gridRect = document.getElementById('grid').getBoundingClientRect();
    const x1 = rect1.left + rect1.width/2 - gridRect.left;
    const y1 = rect1.top + rect1.height/2 - gridRect.top;
    const x2 = rect2.left + rect2.width/2 - gridRect.left;
    const y2 = rect2.top + rect2.height/2 - gridRect.top;
    const length = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
    const angle = Math.atan2(y2-y1, x2-x1) * 180 / Math.PI;
    line.style.width = `0px`;
    line.style.display = 'block';
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.transform = `rotate(${angle}deg)`;
    setTimeout(() => line.style.width = `${length}px`, 10);
}

window.addEventListener("mousemove", (e) => {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    outline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: "forwards" });
});

window.onscroll = () => {
    scrollBtn.style.display = (window.scrollY > 100) ? "block" : "none";
};

scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
resetBtn.onclick = () => location.reload();