var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var cells = document.querySelectorAll('.cell');
var statusText = document.getElementById('status');
var resetBtn = document.getElementById('resetBtn');
var currentPlayer = "X";
var gameActive = true;
var gameState = ["", "", "", "", "", "", "", "", ""];
var winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

// --- 1. CLOUD SYNC LOGIC ---
function saveResultToCloud(winner) {
    return __awaiter(this, void 0, void 0, function () {
        var response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetch('/api/save-result', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ winner: winner })
                        })];
                case 1:
                    response = _a.sent();
                    if (response.ok) {
                        console.log("☁️ Cloud Sync Successful");
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error("❌ Cloud Sync Failed", err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}

// --- 2. WINNING LINE LOGIC ---
function drawWinLine(combination) {
    const line = document.getElementById('win-line');
    if (!line) return;

    const firstCell = cells[combination[0]];
    const lastCell = cells[combination[2]];

    const rect1 = firstCell.getBoundingClientRect();
    const rect2 = lastCell.getBoundingClientRect();
    const gridRect = document.getElementById('grid').getBoundingClientRect();

    const x1 = rect1.left + rect1.width / 2 - gridRect.left;
    const y1 = rect1.top + rect1.height / 2 - gridRect.top;
    const x2 = rect2.left + rect2.width / 2 - gridRect.left;
    const y2 = rect2.top + rect2.height / 2 - gridRect.top;

    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    line.style.width = `0px`;
    line.style.display = 'block';
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;
    line.style.transform = `rotate(${angle}deg)`;

    setTimeout(() => {
        line.style.width = `${length}px`;
    }, 10);
}

// --- 3. WIN/DRAW LOGIC ---
function handleResultValidation() {
    var roundWon = false;
    var winningCombo = null;

    for (var i = 0; i <= 7; i++) {
        var winCondition = winningConditions[i];
        var a = gameState[winCondition[0]];
        var b = gameState[winCondition[1]];
        var c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') continue;

        if (a === b && b === c) {
            roundWon = true;
            winningCombo = winCondition; // Capture the combination
            break;
        }
    }

    if (roundWon) {
        statusText.innerHTML = "Player <span class=\"".concat(currentPlayer === 'X' ? 'x-icon' : 'o-icon', "\">").concat(currentPlayer, "</span> WINS!");
        gameActive = false;
        drawWinLine(winningCombo); // Draw the line!
        saveResultToCloud(currentPlayer);
        return;
    }

    if (gameState.indexOf("") === -1) {
        statusText.innerHTML = "It's a DRAW!";
        gameActive = false;
        saveResultToCloud("Draw");
    }
}

// --- 4. INPUT HANDLING ---
cells.forEach(function (cell) {
    cell.addEventListener('click', function () {
        var clickedCellIndex = parseInt(cell.getAttribute('data-index'));
        if (gameState[clickedCellIndex] !== "" || !gameActive)
            return;
        gameState[clickedCellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer === "X" ? "x-icon" : "o-icon");
        handleResultValidation();
        if (gameActive) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.innerHTML = "Player <span class=\"".concat(currentPlayer === 'X' ? 'x-icon' : 'o-icon', "\">").concat(currentPlayer, "</span>'s Turn");
        }
    });
});

resetBtn.addEventListener('click', function () { location.reload(); });

// --- 5. CUSTOM CURSOR & SCROLL LOGIC ---

const dot = document.getElementById("cursor-dot");
const outline = document.getElementById("cursor-outline");
const scrollBtn = document.getElementById("scrollTopBtn");

// Move Cursor
window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    dot.style.left = `${posX}px`;
    dot.style.top = `${posY}px`;

    // Outline follows with a slight delay for a "trail" effect
    outline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Handle Scroll Button visibility
window.onscroll = function() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};

// Scroll to top function
scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =============================================================================
   MINIMAX ALGORITHM (Unbeatable AI)
   ============================================================================= */

// Helper to check winner without ending the actual game
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
    if (winner === 'O') return 10 - depth; // AI wins (Maximize)
    if (winner === 'X') return depth - 10; // Human wins (Minimize)
    if (board.every(cell => cell !== '')) return 0; // Draw

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

// --- UPDATED INPUT HANDLING WITH AI ---
cells.forEach(function (cell) {
    cell.addEventListener('click', function () {
        var clickedCellIndex = parseInt(cell.getAttribute('data-index'));

        // Only allow move if it's Player X's turn and game is active
        if (gameState[clickedCellIndex] !== "" || !gameActive || currentPlayer !== "X")
            return;

        // Player X Move
        executeMove(clickedCellIndex, "X");

        if (gameActive) {
            currentPlayer = "O";
            statusText.innerHTML = "AI is thinking...";

            // Artificial delay to simulate "thinking"
            setTimeout(() => {
                const aiMove = bestMove();
                if (aiMove !== undefined) {
                    executeMove(aiMove, "O");
                    if (gameActive) {
                        currentPlayer = "X";
                        statusText.innerHTML = `Player <span class="x-icon">X</span>'s Turn`;
                    }
                }
            }, 600); // 600ms delay
        }
    });
});

// Helper function to handle UI and Validation
function executeMove(index, player) {
    gameState[index] = player;
    const cell = cells[index];
    cell.textContent = player;
    cell.classList.add(player === "X" ? "x-icon" : "o-icon");
    handleResultValidation();
}