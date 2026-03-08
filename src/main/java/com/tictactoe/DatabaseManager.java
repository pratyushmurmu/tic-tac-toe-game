package com.tictactoe;

import java.util.Map;
import java.util.HashMap;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.Date;

public class DatabaseManager {
    // Your verified connection string
    private static final String URI = "mongodb+srv://pratyushmurmu2004_db_user:6Fs5fPEDLcv3K4Ra@cluster0.pp2snak.mongodb.net/?retryWrites=true&w=majority";

    public static void saveGameResult(String winnerName) {
        // Force TLS 1.2 for JDK 24 compatibility
        System.setProperty("jdk.tls.client.protocols", "TLSv1.2");

        try (MongoClient mongoClient = MongoClients.create(URI)) {
            // This will create 'tictactoe_db' and 'scores' collection if they don't exist
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
    public static void showLeaderboard() {
        // Force TLS 1.2 for JDK 24 compatibility
        System.setProperty("jdk.tls.client.protocols", "TLSv1.2");

        try (MongoClient mongoClient = MongoClients.create(URI)) {
            MongoDatabase database = mongoClient.getDatabase("tictactoe_db");
            MongoCollection<Document> collection = database.getCollection("scores");

            // Use the 'countDocuments' filter to find specific winners
            long xWins = collection.countDocuments(new Document("winner", "X"));
            long oWins = collection.countDocuments(new Document("winner", "O"));
            long draws = collection.countDocuments(new Document("winner", "Draw"));

            System.out.println("\n--- 🏆 GLOBAL LEADERBOARD ---");
            System.out.println("Player X Total Wins: " + xWins);
            System.out.println("Player O Total Wins: " + oWins);
            System.out.println("Total Draws: " + draws);
            System.out.println("-----------------------------\n");
        } catch (Exception e) {
            System.err.println("❌ Could not fetch leaderboard: " + e.getMessage());
        }
    }

    public static Map<String, Long> getLeaderboardData() {
        System.setProperty("jdk.tls.client.protocols", "TLSv1.2");
        Map<String, Long> stats = new HashMap<>();

        try (com.mongodb.client.MongoClient mongoClient = com.mongodb.client.MongoClients.create(URI)) {
            var db = mongoClient.getDatabase("tictactoe_db");
            var col = db.getCollection("scores");

            stats.put("xWins", col.countDocuments(new org.bson.Document("winner", "X")));
            stats.put("oWins", col.countDocuments(new org.bson.Document("winner", "O")));
            stats.put("draws", col.countDocuments(new org.bson.Document("winner", "Draw")));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return stats;
    }
}
