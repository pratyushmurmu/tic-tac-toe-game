
# 🕹️ Cyber-Neon Tic-Tac-Toe: From Console to God-Mode

Welcome to the evolution of the Tic-Tac-Toe Engine! What started as a Java console exercise has transformed into a high-performance, full-stack web application featuring an unbeatable Minimax AI and a sleek Cyberpunk aesthetic.

## 🚀 The Evolution
The project successfully transitioned through its roadmap, moving from a terminal-based logic engine to a responsive, "unbeatable" web experience.

## ✨ Key Features (Current Build)
* **🧠 Unbeatable AI (Minimax Algorithm):** Integrated a recursive Minimax algorithm that simulates every possible game outcome to ensure the AI never loses.
* **🎨 Cyber-Neon UI:** A fully responsive frontend built with CSS Grid and Flexbox, featuring neon glows, animated gradients, and a retro-futuristic "scanline" overlay.
* **🖱️ Custom Fluid Cursor:** A JavaScript-driven dual-element cursor (dot and trailing outline) that enhances the "liquid" feel of the interface.
* **☁️ Cloud Sync & State:** Built-in support for asynchronous result logging to a backend API to track global win/loss statistics.
* **⚡ Animated Feedback:** High-speed win-line drawing logic and pop-in animations for "X" and "O" markers using CSS Keyframes.
* **📱 Mobile Optimized:** Responsive layout using CSS `clamp()` and touch-friendly interaction logic.

## 🛠️ Tech Stack
* **Frontend:** Vanilla JavaScript (ES6+), CSS3 (Advanced Animations & Flexbox), HTML5.
* **AI Logic:** Minimax Algorithm (Recursive Backtracking).
* **Backend Support:** Cloud API integration for match persistence.
* **Design:** Cyberpunk/Synthwave aesthetic.

---

## 🧠 Deep Dive: The Minimax Engine
The "God-Mode" AI works by assigning scores to every possible branch of the game tree:
* **AI Win:** $+10$ (minus depth to prefer faster wins)
* **Human Win:** $-10$ (plus depth to delay defeat)
* **Draw:** $0$

The engine recursively plays thousands of games in milliseconds to ensure it always picks the optimal move.

---

## 🏗️ Project Journey & Learnings
This project served as a practical exploration of:
1.  **Event Loop Management:** Handling human-input vs. AI-processing delays with `setTimeout`.
2.  **DOM Manipulation:** Dynamically updating game states without page refreshes.
3.  **CSS Architecture:** Managing complex neon effects and layering with high `z-index` custom cursors.
4.  **UX Polish:** Balancing "instant" AI logic with human-centric "thinking" delays.

## 🕹️ How to Play
1.  Visit the [Live Demo](https://tic-tac-toe-game-x54a.onrender.com) (Play here).
2.  As **Player X**, make your move on the 3x3 grid.
3.  Attempt to outsmart the **Minimax AI** (Spoiler: It's impossible!).

## 🤝 How to Contribute
While the core engine is complete, I am always open to:
* Adding "Hard/Easy" difficulty toggles.
* Implementing local multiplayer modes.
* Theming suggestions.

---

### 👤 Author
**Pratyush Murmu** CSE Undergraduate | Full-Stack Developer | Java & JavaScript Explorer  
[LinkedIn Profile](https://www.linkedin.com/in/pratyush-murmu-25b105334/)


