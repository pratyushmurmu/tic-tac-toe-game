package com.tictactoe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TicTacToeApplication {
    public static void main(String[] args) {
        // This line starts the built-in Tomcat web server
        SpringApplication.run(TicTacToeApplication.class, args);
    }
}
