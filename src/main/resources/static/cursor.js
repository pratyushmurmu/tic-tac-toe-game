// cursor.js
document.addEventListener("DOMContentLoaded", () => {
    const dot = document.getElementById("cursor-dot");
    const outline = document.getElementById("cursor-outline");

    if (!dot || !outline) {
        console.warn("Cursor elements missing from HTML!");
        return;
    }

    window.addEventListener("mousemove", (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Immediate movement for the center dot
        dot.style.left = `${posX}px`;
        dot.style.top = `${posY}px`;

        // Smooth trail for the outline
        outline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 400, fill: "forwards" });
    });
});