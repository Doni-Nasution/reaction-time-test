const gameArea = document.getElementById("game-area");
const result = document.getElementById("result");
const resetBtn = document.getElementById("reset-btn");

const lastTimeText = document.getElementById("last-time");
const bestTimeText = document.getElementById("best-time");

let startTime;
let timeout;

let waiting = false;
let ready = false;

let bestTime = null;

// GAME CLICK
gameArea.addEventListener("click", () => {

    // START GAME
    if (!waiting && !ready) {

        gameArea.textContent =
            "Tunggu warna hijau...";

        gameArea.style.background =
            "orange";

        waiting = true;

        // RANDOM DELAY
        const randomDelay =
            Math.floor(Math.random() * 3000) + 2000;

        timeout = setTimeout(() => {

            gameArea.style.background =
                "limegreen";

            gameArea.textContent =
                "KLIK SEKARANG!";

            startTime = Date.now();

            ready = true;
            waiting = false;

        }, randomDelay);
    }

    // TOO EARLY
    else if (waiting && !ready) {

        clearTimeout(timeout);

        gameArea.style.background =
            "crimson";

        gameArea.textContent =
            "Terlalu cepat!";

        result.textContent =
            "Kamu klik sebelum warna hijau";

        waiting = false;
    }

    // RESULT
    else if (ready) {

        const reactionTime =
            Date.now() - startTime;

        // LAST TIME
        lastTimeText.textContent =
            `${reactionTime} ms`;

        // BEST TIME
        if (
            bestTime === null ||
            reactionTime < bestTime
        ) {

            bestTime = reactionTime;

            bestTimeText.textContent =
                `${bestTime} ms`;
        }

        result.textContent =
            `Reaction Time: ${reactionTime} ms`;

        gameArea.style.background =
            "crimson";

        gameArea.textContent =
            "Klik untuk main lagi";

        ready = false;
    }

});

// RESET BUTTON
resetBtn.addEventListener("click", () => {

    clearTimeout(timeout);

    waiting = false;
    ready = false;

    bestTime = null;

    gameArea.style.background =
        "crimson";

    gameArea.textContent =
        "Klik untuk mulai";

    result.textContent =
        "Hasil akan muncul di sini";

    lastTimeText.textContent =
        "0 ms";

    bestTimeText.textContent =
        "0 ms";

});