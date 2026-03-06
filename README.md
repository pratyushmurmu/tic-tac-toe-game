# 🕹️ Java Tic-Tac-Toe: Console to Web Evolution
Welcome to the Tic-Tac-Toe Engine project! This started as a deep dive into Java Data Structures and Object-Oriented Programming (OOPs) and is currently evolving from a terminal-based logic engine into a full-stack web application.

## 🚀 Present Condition
Currently, the project is a fully functional Java Console Application.

## Key Features:
**Robust Game Logic:** A centralized GameLogic class that handles board state, turn management, and win/draw detection.

**Input Validation:** Uses try-catch blocks and conditional checks to handle InputMismatchException and prevent illegal moves (e.g., choosing a taken slot or a number outside 1-9).

**OOP Foundations:** Built with modularity in mind, separating the "Brain" (GameLogic) from the "Controller" (Main class).

**IDE Transition:** Developed using IntelliJ IDEA, leveraging its static analysis to eliminate logic "tangles" and ensure clean code.

## 🏗️ Future Plans (The Roadmap)
The goal is to transition this project into a modern web experience.

**[ ] Phase 1:** Logic Translation: Porting the existing Java logic into TypeScript to maintain strict typing in the browser.

**[ ] Phase 2:** Frontend Implementation: Building a responsive UI using HTML5 and CSS3 (Grid/Flexbox).

**[ ] Phase 3:** State Persistence: Potentially adding a backend (Spring Boot) or local storage to track win streaks.

**[ ] Phase 4:** Deployment: Hosting the live game via GitHub Pages.

## 🛠️ How to Run (Console Version)
Clone the repo:

```Bash
git clone https://github.com/pratyushmurmu/tic-tac-toe-game.git
Open in IntelliJ IDEA (or any Java IDE).
```
Run Main.java.

Follow the on-screen prompts to play!

## 🤝 How to Contribute
Feedback and contributions are welcome! This is a learning journey, and I’m open to suggestions.

**Fork the project.**

**Create a Feature Branch** ```(git checkout -b feature/AmazingFeature)  ```

**Commit your changes** ```(git commit -m 'Add some AmazingFeature')  ```

**Push to the Branch** ```(git checkout -b feature/AmazingFeature)  ```

**Open a Pull Request.**

### Specific areas I'm looking for feedback on:

Optimizing the win-check algorithm.

Best practices for the upcoming TypeScript transition.

### 👤 Author
Pratyush Murmu CSE Undergraduate | Java Developer | Exploring Web Tech [LinkedIn Profile](https://www.linkedin.com/in/pratyush-murmu-25b105334/)
