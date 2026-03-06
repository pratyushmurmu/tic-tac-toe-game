import java.util.*;

public class GameLogic {
    String[] board; // for laying out the board for the game
    String turn; // for turning between player 'X' and 'O'

    public GameLogic() {
        board = new String[9]; // create a 1-D array of 9 spots
        turn = "X"; // if the turn is "X" player

        for (int a = 0; a < board.length; a++) {
            board[a] = String.valueOf(a + 1);
        }
    }

    public String checkWinner() {
        for (int a = 0; a < 8; a++) {
            String line = null; // Pick up an empty tray to hold our three-in-a-row combination

            switch (a) {
                case 0:
                    line = board[0] + board[1] + board[2];// Row wise 1
                    break;
                case 1:
                    line = board[3] + board[4] + board[5];// Row wise 2
                    break;
                case 2:
                    line = board[6] + board[7] + board[8];// Row wise 3
                    break;
                case 3:
                    line = board[0] + board[4] + board[8];// Diagonal wise 1
                    break;
                case 4:
                    line = board[2] + board[4] + board[6];// Diagonal wise 2
                    break;
                case 5:
                    line = board[0] + board[3] + board[6];// Column wise 1
                    break;
                case 6:
                    line = board[1] + board[4] + board[7];// Column wise 2
                    break;
                case 7:
                    line = board[2] + board[5] + board[8];// Column wise 3
                    break;
            }

            // If the tray has three X's or three O's, we have a winner!
            if (line.equals("XXX")) {
                return "X";
            }
            if (line.equals("OOO")) {
                return "O";
            }
        }

        for (int a = 0; a < 9; a++) {
            if (Arrays.asList(board).contains(String.valueOf(a + 1))) {
                /* When I hit the 'break', the computer stops looking at the numbers (1-9), but it stays inside the
                 'checkWinner' method. It "falls through" to whatever code is written right after the loop.

                 Think of a Security Guard checking rooms in a hotel to see if the building is empty. His job is to report: "It's Empty" or "Someone is still here."

                The "Break" Mistake (The Logical Fall-through)
                Imagine the guard starts at Room 1.
                He opens Room 1 and sees a guest (a number like "1" is on the board).
                He says, "Okay, I'll stop checking the rooms now!" (This is the break).
                He walks out of the hallway into the lobby.
                In the lobby, the next instruction on his clipboard says: Shout "THE BUILDING IS EMPTY!" (This is the return "draw" line).

                Because he stopped checking the rooms but didn't leave the building, he ended up giving the wrong report! Even though he saw a guest
                in Room 1, he still shouted that the building was empty.

                The "Return" Success (The Correct Way)
                Now imagine the guard has a walkie-talkie.
                He opens Room 1 and sees a guest.
                He immediately picks up the walkie-talkie and tells the boss: "The building is NOT empty. Keep the lights on!" (This is return null).

                Crucial part: He doesn't even bother looking at the lobby clipboard. He is done. He leaves the building through the back door.
                The only way he ever shouts "THE BUILDING IS EMPTY" is if he checks every single room (1 through 9) and finds nobody in any of them.

                In "Old Programmer" Terms:
                break just stops the Loop (the circle). The code then continues to the very next line outside that loop.
                return stops the Entire Method (the whole task). It teleports you out of the method instantly with your answer.*/

                return null;
            }
        }

        /*
        The Reality: In our game design, null means "The game is still going" and "draw" means "The board is full."
        Your logic was essentially saying: "If I've checked everything and found no winners, then keep playing."
        That’s the opposite of a draw!
        */
        return "draw"; // If I looked everywhere and found NO numbers, it's a draw.
    }

    public void printBoard() {
        System.out.println("|----|----|----|");
        System.out.println("|  " + board[0] + " | " + board[1] + " | " + board[2] + "  |");
        System.out.println("|----------|");
        System.out.println("|  " + board[3] + " | " + board[4] + " | " + board[5] + "  |");
        System.out.println("|----------|");
        System.out.println("|  " + board[6] + " | " + board[7] + " | " + board[8] + "  |");
        System.out.println("|----|----|----|");
    }
}