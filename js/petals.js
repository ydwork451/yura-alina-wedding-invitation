document.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector(".falling");

    if (!container) return;

    const flowers = [
        "assets/img/flower1.png",
        "assets/img/flower2.png",
        "assets/img/flower3.png"
    ];

    const FLOWERS_COUNT = 18;

    for (let i = 0; i < FLOWERS_COUNT; i++) {

        createFlower(i);

    }

    function createFlower(i) {

        const flower = document.createElement("img");

        flower.className = "flower";

        flower.src = flowers[Math.floor(Math.random() * flowers.length)];

        const size = random(35, 75);

        flower.style.width = size + "px";

        const position = (i / FLOWERS_COUNT) * 100;
flower.style.left = `calc(${position}vw + ${random(-20, 20)}px)`;

        flower.style.top = random(-100, -20) + "px";

        flower.style.opacity = random(0.45, 0.9);

        const fallDuration = random(22, 36);
const floatDuration = random(4, 8);

flower.style.animationDuration =
    `${fallDuration}s, ${floatDuration}s`;

        flower.style.animationDelay = random(-30, 0) + "s";

        flower.style.setProperty("--drift", random(-120, 120) + "px");

        flower.style.setProperty("--rotate", random(-720, 720) + "deg");

        container.appendChild(flower);

    }

    function random(min, max) {

        return Math.random() * (max - min) + min;

    }

});