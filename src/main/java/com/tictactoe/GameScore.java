package com.tictactoe;

import org.bson.Document;
import java.util.Date;

public class GameScore {
    private String winner; // "X", "O", or "Draw"
    private Date timestamp;

    public GameScore(String winner) {
        this.winner = winner;
        this.timestamp = new Date();
    }

    // This converts our Java object into a format MongoDB understands
    public Document toDocument() {
        return new Document("winner", winner)
                .append("date", timestamp);
    }
}
