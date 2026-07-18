/* ======================================================
   Yura & Alina Wedding
   app.js
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       ELEMENTS
    ========================================== */

    const intro = document.getElementById("intro");
    const enterButton = document.getElementById("enterSite");

    const music = document.getElementById("bgMusic");

    const site = document.getElementById("site");

    const countdown = {

        days: document.getElementById("days"),

        hours: document.getElementById("hours"),

        minutes: document.getElementById("minutes"),

        seconds: document.getElementById("seconds")

    };

    /* ==========================================
       INTRO
    ========================================== */

    if(site){

        site.style.display = "none";

    }

    if(enterButton){

        enterButton.addEventListener("click", () => {

            if (music) {

    music.volume = 0;

    console.log("Music element:", music);
console.log("Music src:", music.currentSrc);

    music.play().catch(() => {});

    let volume = 0;

    const fade = setInterval(() => {

        volume += 0.03;

        if (volume >= 0.35) {

            volume = 0.35;

            clearInterval(fade);

        }

        music.volume = volume;

    }, 100);

}

            intro.style.opacity = "0";

            intro.style.transition = "opacity 1.2s ease";

            setTimeout(()=>{

                intro.style.display = "none";

                site.style.display = "block";

                window.scrollTo(0,0);

            },1200);

        });

    }

    /* ==========================================
       COUNTDOWN
    ========================================== */

    function updateCountdown(){

        const weddingDate = new Date("2026-08-13T14:00:00");

        const now = new Date();

        const diff = weddingDate - now;

        if(diff <= 0){

            countdown.days.textContent = "000";
            countdown.hours.textContent = "00";
            countdown.minutes.textContent = "00";
            countdown.seconds.textContent = "00";

            return;

        }

        const days = Math.floor(diff / (1000*60*60*24));

        const hours = Math.floor(
            (diff % (1000*60*60*24))
            /
            (1000*60*60)
        );

        const minutes = Math.floor(
            (diff % (1000*60*60))
            /
            (1000*60)
        );

        const seconds = Math.floor(
            (diff % (1000*60))
            /
            1000
        );

        countdown.days.textContent = days;

        countdown.hours.textContent =
            String(hours).padStart(2,"0");

        countdown.minutes.textContent =
            String(minutes).padStart(2,"0");

        countdown.seconds.textContent =
            String(seconds).padStart(2,"0");

    }

    updateCountdown();

    setInterval(updateCountdown,1000);

});
/* ==========================================
   SCROLL ANIMATIONS
========================================== */

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("visible");

        }

    });

},{
    threshold:0.15
});

document.querySelectorAll("section").forEach(section=>{

    section.classList.add("hidden");

    observer.observe(section);

});


document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        closeLightbox();

    }

});
/* ==========================================
   PARALLAX
========================================== */

const hero = document.querySelector(".hero");

window.addEventListener("scroll",()=>{

    const y = window.scrollY;

    if(hero){

        hero.style.backgroundPosition =
        `center ${y*0.35}px`;

    }

});

/* ==========================================
   BUTTON RIPPLE
========================================== */

document.querySelectorAll("button").forEach(button=>{

    button.addEventListener("click",function(e){

        const circle=document.createElement("span");

        const size=Math.max(
            this.clientWidth,
            this.clientHeight
        );

        const rect=this.getBoundingClientRect();

        circle.style.width=size+"px";
        circle.style.height=size+"px";

        circle.style.left=
            e.clientX-rect.left-size/2+"px";

        circle.style.top=
            e.clientY-rect.top-size/2+"px";

        circle.className="ripple";

        this.appendChild(circle);

        setTimeout(()=>{

            circle.remove();

        },700);

    });

});

/* ==========================================
   HEADER SHADOW
========================================== */

window.addEventListener("scroll",()=>{

    const intro=document.getElementById("intro");

    if(!intro)return;

    if(window.scrollY>60){

        intro.classList.add("intro-shadow");

    }else{

        intro.classList.remove("intro-shadow");

    }

});

/* ==========================================
   IMAGE PRELOAD
========================================== */

const images=[];

document.querySelectorAll("img").forEach(img=>{

    if(img.src){

        const preload=new Image();

        preload.src=img.src;

        images.push(preload);

    }

});

console.log("Wedding website loaded ❤️");
/* ==========================================
   SMOOTH REVEAL
========================================== */

const revealItems = document.querySelectorAll(

".timeline__item, .gallery__item, .wish__card, .location__card, .countdown__item"

);

const revealObserver = new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("reveal");

}

});

},

{

threshold:.2

}

);

revealItems.forEach(item=>{

revealObserver.observe(item);

});

/* ==========================================
   GALLERY HOVER (mobile safe)
========================================== */

document.querySelectorAll(".gallery__item").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.zIndex="3";

});

card.addEventListener("mouseleave",()=>{

card.style.zIndex="1";

});

});

/* ==========================================
   BUTTON PRESS EFFECT
========================================== */

document.querySelectorAll("button").forEach(button=>{

button.addEventListener("mousedown",()=>{

button.style.transform="scale(.97)";

});

button.addEventListener("mouseup",()=>{

button.style.transform="";

});

button.addEventListener("mouseleave",()=>{

button.style.transform="";

});

});

/* ==========================================
   CURRENT YEAR
========================================== */

console.log("❤️ Yura & Alina Wedding Website");
/* ==========================================
   FLOAT BUTTONS
========================================== */

const scrollTopButton=document.getElementById("scrollTop");

const musicButton=document.getElementById("musicToggle");

const music = document.getElementById("bgMusic");

window.addEventListener("scroll",()=>{

const scrollTop=window.scrollY;

const height=

document.documentElement.scrollHeight-

window.innerHeight;

const progress=(scrollTop/height)*100;

document.getElementById("scrollProgress").style.width=

progress+"%";

if(scrollTop>600){

scrollTopButton.style.display="block";

}else{

scrollTopButton.style.display="none";

}

});

scrollTopButton.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

/* ==========================================
   MUSIC TOGGLE FIX
========================================== */

(() => {

    const music = document.getElementById("bgMusic");
    const musicButton = document.getElementById("musicToggle");

    if (!music || !musicButton) return;

    let fading = false;

    function fadeTo(target, callback) {

        if (fading) return;

        fading = true;

        const step = target > music.volume ? 0.03 : -0.03;

        const timer = setInterval(() => {

            let volume = music.volume + step;

            if (
                (step > 0 && volume >= target) ||
                (step < 0 && volume <= target)
            ) {

                music.volume = target;

                clearInterval(timer);

                fading = false;

                callback && callback();

                return;
            }

            music.volume = volume;

        }, 40);

    }

    musicButton.addEventListener("click", () => {

        if (music.paused) {

            music.volume = 0;

            music.play();

            fadeTo(0.35);

            musicButton.innerHTML = "🔊";

        } else {

            fadeTo(0, () => {

                music.pause();

            });

            musicButton.innerHTML = "♪";

        }

    });

})();
/* ==========================================
   MUSIC BUTTON OVERRIDE
   (добавить в самый конец app.js)
========================================== */

window.addEventListener("load", () => {

    const music = document.getElementById("bgMusic");
    const button = document.getElementById("musicToggle");

    if (!music || !button) return;

    // Удаляем старую кнопку и создаем новую,
    // чтобы убрать все старые обработчики событий
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);

    newButton.textContent = music.paused ? "♪" : "🔊";

    newButton.addEventListener("click", async () => {

        if (music.paused) {

            try {

                music.volume = 0.35;

                await music.play();

                newButton.innerHTML = `
<div class="music-eq">
<span></span>
<span></span>
<span></span>
</div>
`;

            } catch (err) {

                console.error(err);

            }

        } else {

            music.pause();

            newButton.textContent = "♪";

        }

    });

});