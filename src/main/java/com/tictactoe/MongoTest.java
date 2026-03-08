package com.tictactoe;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

public class MongoTest {
    public static void main(String[] args) {
        // 1. Force stable TLS protocol for JDK 24 compatibility
        System.setProperty("jdk.tls.client.protocols", "TLSv1.2");

        // 2. Your specific connection string from Cluster0 in Mumbai
        String uri = "mongodb+srv://pratyushmurmu2004_db_user:6Fs5fPEDLcv3K4Ra@cluster0.pp2snak.mongodb.net/?retryWrites=true&w=majority";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // This 'ping' checks if the cloud can actually hear your laptop
            MongoDatabase database = mongoClient.getDatabase("admin");
            database.runCommand(new org.bson.Document("ping", 1));

            System.out.println("✅ Success! Your Tic-Tac-Toe game is now connected to the Mumbai Cloud!");
        } catch (Exception e) {
            System.err.println("❌ Connection still failing.");
            e.printStackTrace();
        }
    }
}
