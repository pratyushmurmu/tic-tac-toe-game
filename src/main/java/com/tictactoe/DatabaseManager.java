package com.tictactoe;

import java.util.Map;
import java.util.HashMap;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.Date;
import java.io.InputStream;
import java.util.Properties;

public class DatabaseManager {

    // 1. HELPER METHOD: Priority check for Render Environment Variables
    private static String getSecureUri() {
        // Try Render's Environment Variables first
        String envUri = System.getenv("MONGODB_URI");
        if (envUri != null && !envUri.isEmpty()) {
            return envUri;
        }

        // Fallback to local db.properties for local development
        Properties props = new Properties();
        try (InputStream input = DatabaseManager.class.getClassLoader().getResourceAsStream("db.properties")) {
            if (input != null) {
                props.load(input);
                return props.getProperty("mongodb.uri");
            }
        } catch (Exception e) {
            System.out.println("No db.properties found, looking for env vars...");
        }

        throw new RuntimeException("❌ Database URI not found in Environment Variables or db.properties");
    }

    public static void saveGameResult(String winnerName) {
        System.setProperty("jdk.tls.client.protocols", "TLSv1.2");

        try (MongoClient mongoClient = MongoClients.create(getSecureUri())) {
            MongoDatabase database = mongoClient.getDatabase("tictactoe_db");
            MongoCollection<Document> collection = database.getCollection("scores");

            Document result = new Document("winner", winnerName)
                    .append("timestamp", new Date())
                    .append("project", "B.Tech CSE Tic-Tac-Toe");

            collection.insertOne(result);
            System.out.println("☁️ Game result synced to MongoDB Atlas!");
        } catch (Exception e) {
            System.err.println("❌ Failed to sync to cloud: " + e.getMessage());
        }
    }

    // 2. CONSOLE LEADERBOARD: Fixes the 'Cannot resolve method' error in Main.java
    public static void showLeaderboard() {
        System.setProperty("jdk.tls.client.protocols", "TLSv1.2");
        try (MongoClient mongoClient = MongoClients.create(getSecureUri())) {
            var database = mongoClient.getDatabase("tictactoe_db");
            var collection = database.getCollection("scores");

            long xWins = collection.countDocuments(new Document("winner", "X"));
            long oWins = collection.countDocuments(new Document("winner", "O"));
            long draws = collection.countDocuments(new Document("winner", "Draw"));

            System.out.println("\n--- 🏆 GLOBAL LEADERBOARD (Console) ---");
            System.out.println("Player X: " + xWins + " | Player O: " + oWins + " | Draws: " + draws);
        } catch (Exception e) {
            System.err.println("❌ Console leaderboard failed: " + e.getMessage());
        }
    }

    // 3. API LEADERBOARD LOGIC: Prevents "undefined" in frontend
    public static Map<String, Long> getLeaderboardData() {
        System.setProperty("jdk.tls.client.protocols", "TLSv1.2");
        Map<String, Long> stats = new HashMap<>();

        // Initialize with 0 so the frontend never crashes on 'undefined'
        stats.put("xWins", 0L);
        stats.put("oWins", 0L);
        stats.put("draws", 0L);

        try (MongoClient mongoClient = MongoClients.create(getSecureUri())) {
            var db = mongoClient.getDatabase("tictactoe_db");
            var col = db.getCollection("scores");

            // Fetch real counts from MongoDB
            stats.put("xWins", col.countDocuments(new Document("winner", "X")));
            stats.put("oWins", col.countDocuments(new Document("winner", "O")));
            stats.put("draws", col.countDocuments(new Document("winner", "Draw")));
        } catch (Exception e) {
            System.err.println("❌ Database fetch failed: " + e.getMessage());
        }
        return stats;
    }
}
