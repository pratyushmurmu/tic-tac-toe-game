// 1. Navigation: Go to the game
const playButton = document.getElementById('playBtn') as HTMLButtonElement;

if (playButton) {
    playButton.addEventListener('click', () => {
        window.location.href = 'game.html';
    });
}

// 2. Leaderboard: Fetch data from your Java Backend
async function updateLeaderboard() {
    try {
        const response = await fetch('/api/stats');
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();

        // Update the <span> elements we added to index.html
        const xElement = document.getElementById('xWins');
        const oElement = document.getElementById('oWins');
        const drawsElement = document.getElementById('draws');

        if (xElement && oElement && drawsElement) {
            xElement.textContent = data.xWins.toString();
            oElement.textContent = data.oWins.toString();
            drawsElement.textContent = data.draws.toString();
        }
    } catch (error) {
        console.error("❌ Stats fetch failed:", error);
        // Fallback: update the text to show an error if the server is down
        const statusDiv = document.getElementById('leaderboard-container');
        if (statusDiv) statusDiv.innerHTML = "Offline: Showing local data only.";
    }
}

// 3. Execution: Run the fetch when the menu opens
updateLeaderboard();




