package com.tictactoe;

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
}
