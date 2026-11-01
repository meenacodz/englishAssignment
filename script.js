const players = [...document.querySelectorAll(".player")];

const nextBtn = document.querySelector("#nextBtn");
const prevBtn = document.querySelector("#prevBtn");

let currentIndex = 0;
let isAnimating = false;
const revisitBtn = document.querySelector("#revisitBtn");


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

    if (currentIndex === players.length - 2) {
        revisitBtn.classList.add("show");
    } else {
        revisitBtn.classList.remove("show");
    }

}

updatePages();

const slideSfx = new Audio("https://res.cloudinary.com/devpcp7mz/video/upload/v1793569668/whoosh_ozy8lb.mp3");

slideSfx.preload = "auto";
slideSfx.volume = 1;

function playSlideSfx() {
    slideSfx.pause();
    slideSfx.currentTime = 0;
    slideSfx.play().catch(() => {});
}

function changePage(direction) {
    setTimeout(()=>{
        playSlideSfx();
    },200)

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

    }, 300);

}

nextBtn.addEventListener("click", () => changePage(1));

prevBtn.addEventListener("click", () => changePage(-1));




// ---------------------------Send Message--------------------------

const person1 = [
    "BROOOOO 😭 have you seen the school cat's new photo??",
    "It's sitting outside the principal's office 😭 caption says ‘POV: HR called him for an interview.’",
    "NGL bro has more career opportunities than us 💀",
    "Imagine his LinkedIn profile 💀 ‘Experienced in sleeping 16 hours a day.’",
    "BRO REALLY SAID corporate ladder 🗣️💀",
    "Highkey he'd fire us both. We're never beating the unemployed allegations 💀",
    "It's giving employee of the month 😭",
    "WAIT. I have actual news. 😭",
    "School group says he's officially our attendance monitor 😭",
    "Anyway, kal school aa raha hai na? 😭",
    "💀💀💀 THE CAT IS TAKING YOUR ATTENDANCE."
];
const person2 = [
    "Nah 💀 what did bro do now?",
    "NAHHH 😭 bro is NOT getting paid in Whiskas 💀",
    "FR 😭 hum abhi bhi homework ke unpaid interns hain.",
    "Skills: meow-nagement, nap-titude, purr-suasive communication 😭😭",
    "Lowkey he'd be our manager. ‘Why were you absent yesterday?’ 😭",
    "Wait 💀 someone commented ‘promote him to attendance monitor.’",
    "Bro's gonna take attendance with a MEOWcrosoft Excel sheet 💀",
    "What now bro 💀 don't tell me he's become principal.",
    "NO WAY 💀 bro got promoted before GTA 6.",
    "Bro I'm literally absent tomorrow. 💀"
];

let p1 = 0;
let p2 = 0;
let msgno = 0;
const abbs = document.querySelectorAll(".abb");

const mainBody = document.querySelector(".mainbody");
const sendBtn1 = document.getElementById("send-btn1");
const sendBtn2 = document.getElementById("send-btn2");

function sendMessage(message, sender) {

    const wrapper = document.createElement("div");

    wrapper.classList.add("wrp");
    wrapper.classList.add(
        sender === "recieving" ? "rec" : "sen"
    );

    const msg = document.createElement("div");

    msg.classList.add("msgs", sender);
    msg.textContent = message;

    wrapper.appendChild(msg);
    mainBody.appendChild(wrapper);

    mainBody.scrollTop = mainBody.scrollHeight;
    msgno++;
}

let abbIndexs = [3,4,5,6,8,9];
let abbIndex = 1;

let showAbb = ()=>{
    abbIndexs.forEach(ind => {
        if(ind == abbIndex) {
            abbs[abbIndex].classList.add("animateAbb");
        }
        abbIndex++;
    });
}

sendBtn1.addEventListener("click", () => {
    if (p1 < person1.length) {
        sendMessage(person1[p1++], "sending");
    }
});


sendBtn2.addEventListener("click", () => {
    if (p2 < person2.length) {
        sendMessage(person2[p2++], "recieving");
    }

});





// const dpBtn = document.querySelector(".topbar .dp");
// const status_ = document.querySelector(".status")
const topbar = document.querySelector(".screen .topbar");
const footer = document.querySelector(".screen .footer");
let btnPress = 0;

// --------------------------- STATUS VIDEOS ---------------------------


/* =========================================
   STATUS + CINEMATIC ENDING SYSTEM
========================================= */

const dpBtn = document.querySelector(".topbar .dp");
const status_ = document.querySelector(".status");
const video = document.querySelector("#statusVideo");

const endingPrompt = document.querySelector("#endingPrompt");
const endBtn = document.querySelector("#endBtn");
const creditsScreen = document.querySelector("#creditsScreen");

const firstVideo = "https://res.cloudinary.com/devpcp7mz/video/upload/v1793569741/1101_nyotwb.mp4";
const secondVideo = "https://res.cloudinary.com/devpcp7mz/video/upload/v1793569710/0820_hoimi6.mp4";

/*
VIDEO STAGES:
0 = First video not played
1 = First video playing
2 = First video completed, waiting for DP click
3 = Second video playing
4 = Credits / ending completed
*/

let videoStage = 0;
let closeTimer;


// INITIAL VIDEO SETUP
video.pause();
video.src = firstVideo;
video.preload = "auto";
video.load();


// CLOSE STATUS
function closeStatus() {

    video.pause();
    video.currentTime = 0;

    status_.classList.remove("active");
    status_.classList.add("non-active");

    clearTimeout(closeTimer);

    closeTimer = setTimeout(() => {
        status_.classList.remove("non-active");
    }, 500);

}


// PLAY VIDEO
function playVideo(src) {

    clearTimeout(closeTimer);

    endingPrompt.classList.remove("show");

    status_.classList.remove("non-active");
    status_.classList.add("active");

    video.pause();
    video.src = src;
    video.load();

    video.muted = false;
    video.volume = 1;

    video.play().catch(error => {
        console.log("Video playback blocked:", error);
    });

}


// DP CLICK
// DP CLICK
dpBtn.addEventListener("click", () => {

    console.log("DP CLICKED | Current Stage:", videoStage);

    // FIRST VIDEO
    if (videoStage === 0) {

        videoStage = 1;

        dpBtn.style.borderColor = "black";

        playVideo(firstVideo);

    }

    // SECOND VIDEO
    else if (videoStage === 2) {

        videoStage = 3;

        console.log("PLAYING SECOND VIDEO:", secondVideo);

        playVideo(secondVideo);

    }

});


// VIDEO COMPLETION
video.addEventListener("ended", () => {

    // FIRST VIDEO COMPLETED
    if (videoStage === 1) {

        videoStage = 2;

        closeStatus();

        setTimeout(() => {
            endingPrompt.classList.add("show");
        }, 500);

    }

    // SECOND VIDEO COMPLETED
    else if (videoStage === 3) {

        videoStage = 4;

        closeStatus();

        setTimeout(() => {
            creditsScreen.classList.add("show");
        }, 500);

    }

});


// LET US END BUTTON
endBtn.addEventListener("click", () => {

    if (videoStage !== 2) return;

    videoStage = 4;

    endingPrompt.classList.remove("show");

    creditsScreen.classList.add("show");

});


// MANUAL STATUS CLOSE
status_.addEventListener("click", () => {

    // If first video was closed before completion
    if (videoStage === 1) {
        videoStage = 0;
    }

    // If second video was closed before completion
    else if (videoStage === 3) {
        videoStage = 2;
    }

    closeStatus();

});





function activateChat() {

    const presentation = document.querySelector(".container");
    const chatScene = document.querySelector(".container-lst");
    const screen = document.querySelector(".screen");

    presentation.style.display = "none";
    chatScene.style.display = "flex";

    requestAnimationFrame(() => {

        screen.classList.add("show-screen");

        setTimeout(() => {

            document.querySelectorAll(
                ".topbar, .mainbody, .footer"
            ).forEach(element => {
                element.classList.add("show-chat");
            });

        }, 250);

    });
}



revisitBtn.addEventListener("click", () => {

    // Old chat scene activation
    activateChat();

});




// ==========================================
//       BACKGROUND ASSET PRELOADER
// ==========================================


const preloadAssets = {

    // ALL 9 PRESENTATION SLIDES
    images: [
        "https://res.cloudinary.com/devpcp7mz/image/upload/v1793560967/page1_efqbxo.png",
        "https://res.cloudinary.com/devpcp7mz/image/upload/v1793560959/page2_ywuvjd.png",
        "https://res.cloudinary.com/devpcp7mz/image/upload/v1793560956/page3_jbsw7s.png",
        "https://res.cloudinary.com/devpcp7mz/image/upload/v1793560970/page4_tzoty9.png",
        "https://res.cloudinary.com/devpcp7mz/image/upload/v1793560970/page5_uu4gpy.png",
        "https://res.cloudinary.com/devpcp7mz/image/upload/v1793560968/page6_xihnij.png",
        "https://res.cloudinary.com/devpcp7mz/image/upload/v1793560963/page7_ekuezq.png",
        "https://res.cloudinary.com/devpcp7mz/image/upload/v1793560970/page8_kti0ye.png",
        "https://res.cloudinary.com/devpcp7mz/image/upload/v1793560960/thankYou_dvdvco.png"
    ],

    // STATUS VIDEOS
    videos: [
        firstVideo,
        secondVideo
    ],

    // TRANSITION SOUND
    audio: [
        "https://res.cloudinary.com/devpcp7mz/video/upload/v1793569668/whoosh_ozy8lb.mp3"
    ]

};



// 1. IMAGE PRELOADING
function preloadImage(url) {

    const img = new Image();

    img.src = url;

    img.decode().catch(() => {});

}


// 2. VIDEO PRELOADING
function preloadVideo(url) {

    const videoElement = document.createElement("video");

    videoElement.preload = "auto";
    videoElement.muted = true;
    videoElement.src = url;

    videoElement.load();

}


// 3. AUDIO PRELOADING
function preloadAudio(url) {

    const audio = new Audio();

    audio.preload = "auto";
    audio.src = url;

    audio.load();

}


// 4. BACKGROUND PRELOADING
function startBackgroundPreloading() {

    console.log("🚀 Background preloading started!");

    // Images
    preloadAssets.images.forEach(url => {
        preloadImage(url);
    });

    // Videos
    preloadAssets.videos.forEach(url => {
        preloadVideo(url);
    });

    // Audio
    preloadAssets.audio.forEach(url => {
        preloadAudio(url);
    });

    // Fonts
    if (document.fonts) {
        document.fonts.ready.then(() => {
            console.log("✅ Fonts ready");
        });
    }

    console.log("✅ Preloading requests sent!");
}


// Start without blocking website
if ("requestIdleCallback" in window) {

    requestIdleCallback(startBackgroundPreloading);

} else {

    setTimeout(startBackgroundPreloading, 1000);

}
