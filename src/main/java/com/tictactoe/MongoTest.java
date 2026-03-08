package com.tictactoe;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import java.io.InputStream;
import java.util.Properties;

public class MongoTest {
    public static void main(String[] args) {
        // 1. Force stable TLS protocol for JDK 24 compatibility
        System.setProperty("jdk.tls.client.protocols", "TLSv1.2");

        // 2. Load the URI from the PROTECTED properties file
        String uri = "";
        Properties props = new Properties();

        try (InputStream input = MongoTest.class.getClassLoader().getResourceAsStream("db.properties")) {
            if (input == null) {
                System.err.println("❌ Error: Could not find db.properties in src/main/resources/");
                return;
            }
            props.load(input);
            uri = props.getProperty("mongodb.uri");
        } catch (Exception e) {
            System.err.println("❌ Error loading properties file.");
            e.printStackTrace();
            return;
        }

        // 3. Connect using the loaded URI
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("admin");
            database.runCommand(new org.bson.Document("ping", 1));

            System.out.println("✅ Success! Your code is now clean and the Cloud is connected!");
        } catch (Exception e) {
            System.err.println("❌ Connection failed. Check your password in db.properties.");
            e.printStackTrace();
        }
    }
}
