


/* -------------------- PRELOAD IMAGES -------------------- */

const images = [
    "https://res.cloudinary.com/devpcp7mz/image/upload/v1793000854/bg_ffqhtm.jpg",
    "https://res.cloudinary.com/devpcp7mz/image/upload/v1793000859/chatbg_fh21a3.png",
    "https://res.cloudinary.com/devpcp7mz/image/upload/v1793000859/dp_j09hhz.png",
    "https://res.cloudinary.com/devpcp7mz/image/upload/v1793000865/intro_nx2ta3.png"
];
const preloadedImages = images.map(src => {
    const img = new Image();
    img.src = src;
    return img;
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

let person1 = [
    "Hiiii!",
    "Kya kar rahe ho?",
    "Kuch nahi, bas free hoon.",
    "Achha 😂",
    "Kal school aa rahe ho na?",
    "Haan, obviously!",
    "English project complete hua?",
    "Almost complete hai, bas thoda sa kaam baaki hai.",
    "Bro, mera toh abhi aadha bhi nahi hua 😭",
    "Toh jaldi kar le 😂",
    "Waise kal presentation bhi hai na?",
    "Haan, aur mujhe stage par bolna hai.",
    "Tension ho rahi hai kya?",
    "Thodi si, honestly.",
    "Chill kar, achhe se ho jayega.",
    "Thanks bro ❤️",
    "Achha, school kitne baje pahuchna hai?",
    "Main toh 7:30 tak aa jaunga.",
    "Theek hai, milte hain kal!",
    "Done 🤝",
    "Aur haan, project ki file mat bhoolna 😂",
    "Arey haan, yaad dilane ke liye thanks!",
    "Ab jaa kar complete kar apna project.",
    "Okay sir 🫡",
    "Bye bro, kal milte hain!",
    "Byeeee 👋"
];

let person2 = [
    "Heyyy!",
    "Bas tumse baat kar raha hoon 😎",
    "Achha ji 😂",
    "Haan, kyun?",
    "Haan haan, aaunga.",
    "Tumhara hua kya?",
    "Haan, mera toh ho gaya!",
    "Wah bhai, topper 😂",
    "Koi nahi, ho jayega tera bhi.",
    "Bas yahi motivation chahiye thi 😭",
    "Haan, kal toh full busy day hai.",
    "Same yaar, thoda nervous hoon.",
    "Nahi, bas preparation kar raha hoon.",
    "Phir toh tension lene ki zarurat hi nahi.",
    "Welcome bro 😎",
    "Waise tum bhi achha karoge.",
    "Perfect, main bhi tab tak aa jaunga.",
    "Okay, saath mein class chalte hain.",
    "Bilkul 🤝",
    "Haha, pakka nahi bhoolunga!",
    "Tu bhi apna charger le aana 😂",
    "Haan bhai, sab ready hai!",
    "Order received, boss 🫡",
    "Chal, good night!",
    "Good night bro ❤️",
    "See you tomorrow!"
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
