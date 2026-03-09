package com.tictactoe;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class LeaderboardController {

    @GetMapping("/api/stats")
    public Map<String, Long> getStats() {
        // We reuse your logic but return it as JSON for the web
        return DatabaseManager.getLeaderboardData();
    }

    @PostMapping("/api/save-result")
    public void saveResult(@RequestBody Map<String, String> payload) {
        String winner = payload.get("winner");
        // This calls your existing MongoDB logic!
        DatabaseManager.saveGameResult(winner);
    }
}
