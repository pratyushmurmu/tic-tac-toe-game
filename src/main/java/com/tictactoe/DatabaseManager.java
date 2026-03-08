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

    // 1. HELPER METHOD: This pulls the URI from your HIDDEN db.properties file
    private static String getSecureUri() {
        Properties props = new Properties();
        try (InputStream input = DatabaseManager.class.getClassLoader().getResourceAsStream("db.properties")) {
            if (input == null) {
                throw new RuntimeException("❌ Could not find db.properties in src/main/resources/");
            }
            props.load(input);
            return props.getProperty("mongodb.uri");
        } catch (Exception e) {
            throw new RuntimeException("❌ Error loading secure database credentials", e);
        }
    }

    public static void saveGameResult(String winnerName) {
        System.setProperty("jdk.tls.client.protocols", "TLSv1.2");

        // 2. USE THE HELPER: No hardcoded password here!
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

    public static void showLeaderboard() {
        System.setProperty("jdk.tls.client.protocols", "TLSv1.2");

        try (MongoClient mongoClient = MongoClients.create(getSecureUri())) {
            MongoDatabase database = mongoClient.getDatabase("tictactoe_db");
            MongoCollection<Document> collection = database.getCollection("scores");

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

        try (MongoClient mongoClient = MongoClients.create(getSecureUri())) {
            var db = mongoClient.getDatabase("tictactoe_db");
            var col = db.getCollection("scores");

            stats.put("xWins", col.countDocuments(new Document("winner", "X")));
            stats.put("oWins", col.countDocuments(new Document("winner", "O")));
            stats.put("draws", col.countDocuments(new Document("winner", "Draw")));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return stats;
    }
}
