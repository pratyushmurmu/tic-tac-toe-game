import java.util.*;

public class Main {
    public static void main(String[] args) {

        // --- 1. SETUP ---
        Scanner in = new Scanner(System.in); // Tool to listen to player input
        GameLogic game = new GameLogic(); // Creating our "Engine" object
        String winner = null; // Variable to track the end state (X, O, or Draw)

        System.out.println("Welcome to 3x3 Tic Tac Toe.");
        game.printBoard(); // Showing the starting empty board
        System.out.println("X plays first. Enter slot:");

        // --- 2. THE GAME LOOP ---
        // Keep running as long as the "Security Guard" hasn't found a winner or draw
        while (winner == null) {
            int numInput;
            try {
                numInput = in.nextInt(); // Try to get a number from the player

                // VALIDATION: Make sure the number is actually on the board (1-9)
                if (numInput < 1 || numInput > 9) {
                    System.out.println("Invalid input; re-enter slot number (1-9):");
                    continue; // Skip the rest of the loop and ask again
                }

                if (game.board[numInput - 1].equals(String.valueOf(numInput))) {
                    // Update the board with the current player's mark (X or O)
                    game.board[numInput - 1] = game.turn;

                    // TURN SWITCH: If it was X, make it O. If it was O, make it X.
                    game.turn = game.turn.equals("X") ? "O" : "X";

                    game.printBoard();// Show the updated board after the move
                    winner = game.checkWinner(); // Ask the brain if the game is over

                    // --- NEW MESSAGE CODE ---
                    // NOTIFICATION: Tell the next player to go if the game is still active
                    if (winner == null) {
                        System.out.println(game.turn + "'s turn; enter a slot:");
                    }

                } else {
                    // This triggers if the player picks a slot that already has an X or O
                    System.out.println("Slot taken; re-enter:");
                }
            } catch (InputMismatchException e) {
                // ERROR HANDLING: Triggers if the user types a letter instead of a number
                System.out.println("Invalid input; re-enter slot number:");
                in.nextLine(); // "Flushing the pipe"- Clear the bad input so we can try again
            }
        }

        // --- Final Result ---
        // If the loop ends, that means the 'winner' is no longer null
        if (winner.equalsIgnoreCase("draw")) {
            System.out.println("It's a draw! Thanks for playing.");
        } else {
            System.out.println("Congratulations! " + winner + "'s won!");
        }
        in.close(); // Closing the game for saving the system resources.
    }
}
