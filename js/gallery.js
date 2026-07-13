/* =======================================================
   PREMIUM COVERFLOW GALLERY
   v1.0
======================================================= */

document.addEventListener("DOMContentLoaded",()=>{

const photos=[

"assets/img/photo1.jpg",

"assets/img/photo2.jpg",

"assets/img/photo3.jpg",

"assets/img/photo4.jpg",

"assets/img/photo5.jpg",

"assets/img/photo6.jpg",

"assets/img/photo7.jpg"

];

const track=document.querySelector(".coverflow__track");

const dots=document.querySelector(".coverflow__dots");

const prev=document.querySelector(".coverflow__prev");

const next=document.querySelector(".coverflow__next");

let current=0;

/* ===================================== */

photos.forEach((photo,index)=>{

const slide=document.createElement("div");

slide.className="coverflow__slide";

slide.innerHTML=

`<img src="${photo}" alt="">`;

track.appendChild(slide);

const dot=document.createElement("button");

dot.className="coverflow__dot";

if(index===0){

dot.classList.add("active");

}

dot.onclick=()=>{

current=index;

update();

};

dots.appendChild(dot);

});

const slides=()=>document.querySelectorAll(".coverflow__slide");

const dotItems=()=>document.querySelectorAll(".coverflow__dot");
/* =====================================
   UPDATE COVERFLOW
===================================== */

function update(){

    const slideList = slides();
    const dotList = dotItems();

    slideList.forEach((slide,index)=>{

        slide.className="coverflow__slide";

        dotList[index].classList.remove("active");

        let offset=index-current;

        if(offset>photos.length/2){

            offset-=photos.length;

        }

        if(offset<-photos.length/2){

            offset+=photos.length;

        }

        if(offset===0){

            slide.classList.add("center");

        }

        if(offset===-1){

            slide.classList.add("left");

        }

        if(offset===1){

            slide.classList.add("right");

        }

        slide.style.setProperty("--offset",offset);

    });

    dotList[current].classList.add("active");

}

update();

/* =====================================
   BUTTONS
===================================== */

next.addEventListener("click",()=>{

    current++;

    if(current>=photos.length){

        current=0;

    }

    update();

});

prev.addEventListener("click",()=>{

    current--;

    if(current<0){

        current=photos.length-1;

    }

    update();

});

/* =====================================
   AUTO PLAY
===================================== */

let autoplay=setInterval(()=>{

    current++;

    if(current>=photos.length){

        current=0;

    }

    update();

},6000);
/* =====================================
   SWIPE
===================================== */

let startX = 0;
let endX = 0;

const viewport = document.querySelector(".coverflow__viewport");

viewport.addEventListener("touchstart",(e)=>{

    clearInterval(autoplay);

    startX = e.touches[0].clientX;

});

viewport.addEventListener("touchmove",(e)=>{

    endX = e.touches[0].clientX;

});

viewport.addEventListener("touchend",()=>{

    const distance = startX-endX;

    if(Math.abs(distance)>60){

        if(distance>0){

            current++;

            if(current>=photos.length){

                current=0;

            }

        }else{

            current--;

            if(current<0){

                current=photos.length-1;

            }

        }

        update();

    }

    autoplay=setInterval(()=>{

        current++;

        if(current>=photos.length){

            current=0;

        }

        update();

    },6000);

});

/* =====================================
   KEYBOARD
===================================== */

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        next.click();

    }

    if(e.key==="ArrowLeft"){

        prev.click();

    }

});

/* =====================================
   LIGHTBOX
===================================== */

const lightbox=document.getElementById("lightbox");

const lightboxImage=document.getElementById("lightboxImage");

document.addEventListener("click",(e)=>{

    const slide=e.target.closest(".coverflow__slide");

    if(!slide)return;

    const img=slide.querySelector("img");

    lightboxImage.src=img.src;

    lightbox.style.display="flex";

    document.body.style.overflow="hidden";

});

/* =====================================
   PAUSE ON HOVER
===================================== */

viewport.addEventListener("mouseenter",()=>{

    clearInterval(autoplay);

});

viewport.addEventListener("mouseleave",()=>{

    autoplay=setInterval(()=>{

        current++;

        if(current>=photos.length){

            current=0;

        }

        update();

    },6000);

});

/* =====================================
   CLOSE DOCUMENT READY
===================================== */

});