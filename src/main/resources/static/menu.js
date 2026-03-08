// Get the button element
var playButton = document.getElementById('playBtn'); // Add a click listener
playButton.addEventListener('click', function () {
    // Redirect to the game page
    window.location.href = 'game.html';
});
var cells = document.querySelectorAll('.cell');
var statusText = document.getElementById('status');
var resetBtn = document.getElementById('resetBtn');
var currentPlayer = "X";
var gameActive = true;
// Handle clicking a cell
cells.forEach(function (cell) {
    cell.addEventListener('click', function () {
        if (cell.textContent === "" && gameActive) {
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer === "X" ? "x-icon" : "o-icon");
            // Switch players for now (we will add win logic next!)
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.innerHTML = "Player <span class=\"".concat(currentPlayer === "X" ? 'x-icon' : 'o-icon', "\">").concat(currentPlayer, "</span>'s Turn");
        }
    });
});
// Reset logic
resetBtn.addEventListener('click', function () {
    location.reload();
});
