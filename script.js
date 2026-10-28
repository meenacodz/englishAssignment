


/* -------------------- PRELOAD IMAGES -------------------- */

const images = [
    "bg.jpg",
    "chatbg.png",
    "dp.png",
    "intro.png"
];

images.forEach(src => {
    const img = new Image();
    img.src = src;
});


/* -------------------- PPT FUNCTIONALITY -------------------- */

const slides = [...document.querySelectorAll(".ppt-container")];
const menuBtn = document.querySelector(".menu-btn");
const backBtn = document.querySelector(".backbtn");

let isOpening = false;
let chatOpened = false;

function openSlide(slide) {

    // Prevent repeated clicks during animation
    if (isOpening || slide.classList.contains("active1")) return;

    isOpening = true;

    const rect = slide.getBoundingClientRect();

    const x = window.innerWidth / 2 - (rect.left + rect.width / 2);
    const y = window.innerHeight / 2 - (rect.top + rect.height / 2);

    slide.style.setProperty("--x", `${x}px`);
    slide.style.setProperty("--y", `${y}px`);
    slide.style.setProperty("--sx", window.innerWidth / rect.width);
    slide.style.setProperty("--sy", window.innerHeight / rect.height);

    slide.classList.add("active1");

    slides.forEach(ele => {
        if (ele !== slide) {
            ele.classList.add("animate");
        }
    });

    // Expand the selected PPT
    setTimeout(() => {
        slide.classList.add("active2");

        // Only PPT 8 opens the WhatsApp UI
        if (slide.id === "pptc8") {

            setTimeout(() => {

                chatOpened = true;

                document.querySelector(".parent").style.display = "none";

                const container = document.querySelector(".container");
                const screen = document.querySelector(".screen");

                container.style.display = "flex";
                screen.classList.add("show-screen");

                setTimeout(() => {
                    document.querySelector(".topbar")
                        .classList.add("show-chat");
                }, 300);

                setTimeout(() => {
                    document.querySelector(".mainbody")
                        .classList.add("show-chat");
                }, 600);

                setTimeout(() => {
                    document.querySelector(".footer")
                        .classList.add("show-chat");
                }, 900);

            }, 550);

        } else {
            // Other PPTs remain fullscreen until the menu is clicked
            setTimeout(() => {
                isOpening = false;
            }, 500);
        }

    }, 400);
}


// Open a PPT only when clicked
slides.forEach(slide => {
    slide.addEventListener("click", () => {
        openSlide(slide);
    });
});


/* -------------------- MENU BUTTON -------------------- */

menuBtn.addEventListener("click", () => {

    if (chatOpened) return;

    slides.forEach(element => {

        element.classList.remove("active2");
        element.classList.remove("animate");

        if (!element.classList.contains("active1")) {
            element.classList.add("backIn");
        }

        setTimeout(() => {
            element.classList.remove("active1");
            element.classList.remove("backIn");
        }, 400);
    });

    setTimeout(() => {
        isOpening = false;
    }, 500);
});



backBtn.addEventListener("click", () => {
    const container = document.querySelector(".container");
    const screen = document.querySelector(".screen");
    const parent = document.querySelector(".parent");

    screen.classList.remove("show-screen");
    screen.classList.add("hide-screen");

    setTimeout(() => {
        // Hide WhatsApp UI
        container.style.display = "none";

        screen.classList.remove("hide-screen");
        screen.classList.remove("show-screen");

        // Reset chat animations
        document.querySelector(".topbar").classList.remove("show-chat");
        document.querySelector(".mainbody").classList.remove("show-chat");
        document.querySelector(".footer").classList.remove("show-chat");

        // Show gallery again
        parent.style.display = "flex";

        // Reset state before restoring slides
        chatOpened = false;
        isOpening = false;

        // Restore slides with existing animation
        menuBtn.click();

    }, 500);
});



/* -------------------- CHAT MESSAGES -------------------- */

const person1 = [
    "BROOOOO 😭 have you seen the school cat's new photo??",
    "It's sitting outside the principal's office 😭 caption says ‘POV: HR called him for an interview.’",
    "Ngl bro has more career opportunities than us 💀",
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





const dpBtn = document.querySelector(".topbar .dp");
const status_ = document.querySelector(".status")
const topbar = document.querySelector(".screen .topbar");
const footer = document.querySelector(".screen .footer");
let btnPress = 0;



dpBtn.addEventListener("click",()=>{
        status_.classList.remove("non-active");
        status_.classList.add("active");
        dpBtn.style.borderColor = "black";
});

status_.addEventListener("click",()=>{
    status_.classList.remove("active");
    status_.classList.add("non-active");
    setTimeout(()=>{
        status_.classList.remove("non-active");
    },600)
})
