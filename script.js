


/* -------------------- PRELOAD IMAGES -------------------- */

const images = [
    "https://res.cloudinary.com/devpcp7mz/image/upload/v1793471578/page2_uu1hx4.png",
    "https://res.cloudinary.com/devpcp7mz/image/upload/v1793471576/page3_uyvmgo.png",
    "https://res.cloudinary.com/devpcp7mz/image/upload/v1793471577/page4_rkkh0j.png",
    "intro.png"
];

images.forEach(src => {
    const img = new Image();
    img.src = src;
});


/* -------------------- PPT FUNCTIONALITY -------------------- */

const players = [...document.querySelectorAll(".player")];

const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");

let currentIndex = 0;
let isAnimating = false;

function updatePages() {

    players.forEach((player, index) => {

        player.className = "player";

        if (index === currentIndex) {
            player.classList.add("active");
        }

        else if (index === currentIndex - 1) {
            player.classList.add("prev");
        }

        else if (index === currentIndex + 1) {
            player.classList.add("next");
        }

        else {
            player.classList.add("hidden");
        }

    });

}

updatePages();


function changePage(direction) {

    if (isAnimating) return;

    const newIndex = currentIndex + direction;

    if (newIndex < 0 || newIndex >= players.length) return;

    isAnimating = true;

    // First reveal the neighbouring pages
    players[currentIndex].classList.add("zoom-out");

    setTimeout(() => {

        currentIndex = newIndex;
        updatePages();

        isAnimating = false;

    }, 700);

}

nextBtn.addEventListener("click", () => changePage(1));

prevBtn.addEventListener("click", () => changePage(-1));
