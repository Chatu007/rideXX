/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);

    }, 2200);

});



/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("show");

});


document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("show");

    });

});



/* =========================
   CUSTOM CURSOR
========================= */

const cursor = document.querySelector(".cursor");
const follower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", e => {

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    follower.style.left =
        e.clientX - 17 + "px";

    follower.style.top =
        e.clientY - 17 + "px";

});



/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                }

            });

        },

        {
            threshold: .15
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================
   BIKE FILTER
========================= */

const filterButtons =
    document.querySelectorAll(".filter");

const bikeCards =
    document.querySelectorAll(".bike-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const filter =
            button.dataset.filter;

        bikeCards.forEach(card => {

            const category =
                card.dataset.category;

            if (
                filter === "all" ||
                category === filter
            ) {

                card.style.display = "block";

                setTimeout(() => {

                    card.style.opacity = "1";
                    card.style.transform =
                        "translateY(0)";

                }, 50);

            }

            else {

                card.style.opacity = "0";

                card.style.transform =
                    "translateY(30px)";

                setTimeout(() => {

                    card.style.display = "none";

                }, 300);

            }

        });

    });

});



/* =========================
   BIKE MODAL
========================= */

const modal =
    document.getElementById("bikeModal");

const modalTitle =
    document.getElementById("modalTitle");

const modalClose =
    document.getElementById("modalClose");

const detailButtons =
    document.querySelectorAll(".details-btn");


detailButtons.forEach(button => {

    button.addEventListener("click", () => {

        modalTitle.textContent =
            button.dataset.bike;

        modal.classList.add("show");

    });

});


modalClose.addEventListener("click", () => {

    modal.classList.remove("show");

});


modal.addEventListener("click", e => {

    if (e.target === modal) {

        modal.classList.remove("show");

    }

});


document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        modal.classList.remove("show");

    }

});



/* =========================
   TEST RIDE FORM
========================= */

const rideForm =
    document.getElementById("rideForm");

const toast =
    document.getElementById("toast");


rideForm.addEventListener("submit", e => {

    e.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();


    if (
        name === "" ||
        email === "" ||
        phone === ""
    ) {

        showToast("Please fill all fields.");

        return;

    }


    showToast(
        "Test ride request submitted successfully!"
    );

    rideForm.reset();

});



function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}



/* =========================
   COUNTER ANIMATION
========================= */

const counters =
    document.querySelectorAll(".counter");


const counterObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting &&
                    !entry.target.classList.contains("counted")
                ) {

                    entry.target.classList.add("counted");

                    animateCounter(entry.target);

                }

            });

        }

    );


counters.forEach(counter => {

    counterObserver.observe(counter);

});


function animateCounter(element) {

    const target =
        Number(element.dataset.target);

    let current = 0;

    const duration = 1800;

    const start = performance.now();


    function update(time) {

        const progress =
            Math.min(
                (time - start) / duration,
                1
            );

        current =
            Math.floor(
                progress * target
            );

        element.textContent =
            current.toLocaleString();


        if (progress < 1) {

            requestAnimationFrame(update);

        }

    }


    requestAnimationFrame(update);

}



/* =========================
   BACK TO TOP
========================= */

const topBtn =
    document.getElementById("topBtn");


window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        topBtn.classList.add("show");

    }

    else {

        topBtn.classList.remove("show");

    }

});


topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});



/* =========================
   PARALLAX HERO
========================= */

const rider =
    document.querySelector(".rider-bike");

const moon =
    document.querySelector(".moon");

const mountains =
    document.querySelectorAll(".mountains");


document.addEventListener("mousemove", e => {

    const x =
        (e.clientX / window.innerWidth - .5);

    const y =
        (e.clientY / window.innerHeight - .5);


    if (window.innerWidth > 700) {

        rider.style.marginLeft =
            `${x * 20}px`;

        rider.style.marginTop =
            `${y * 10}px`;

        moon.style.transform =
            `translate(${x * 20}px,${y * 20}px)`;


        mountains.forEach((mountain, index) => {

            const speed =
                (index + 1) * 10;

            mountain.style.transform =
                `translateX(${x * speed}px)`;

        });

    }

});



/* =========================
   CARD 3D TILT
========================= */

const cards =
    document.querySelectorAll(".bike-card");


cards.forEach(card => {

    card.addEventListener("mousemove", e => {

        if (window.innerWidth < 800) return;


        const rect =
            card.getBoundingClientRect();


        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;


        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;


        const rotateX =
            (y - centerY) / 20;

        const rotateY =
            (centerX - x) / 20;


        card.style.transform =
            `perspective(800px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-10px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "";

    });

});



/* =========================
   BUTTON RIPPLE
========================= */

document.querySelectorAll(".btn").forEach(button => {

    button.addEventListener("click", function(e) {

        const ripple =
            document.createElement("span");

        const rect =
            this.getBoundingClientRect();


        const size =
            Math.max(
                rect.width,
                rect.height
            );


        ripple.style.width =
            size + "px";

        ripple.style.height =
            size + "px";

        ripple.style.position =
            "absolute";

        ripple.style.left =
            e.clientX - rect.left - size / 2 + "px";

        ripple.style.top =
            e.clientY - rect.top - size / 2 + "px";

        ripple.style.background =
            "rgba(255,255,255,.3)";

        ripple.style.borderRadius =
            "50%";

        ripple.style.transform =
            "scale(0)";

        ripple.style.pointerEvents =
            "none";

        ripple.style.animation =
            "ripple .6s linear";


        this.appendChild(ripple);


        setTimeout(() => {

            ripple.remove();

        }, 600);

    });

});


const rippleStyle =
document.createElement("style");

rippleStyle.innerHTML = `

@keyframes ripple {

    to {

        transform: scale(4);

        opacity: 0;

    }

}

`;

document.head.appendChild(rippleStyle);



/* =========================
   DYNAMIC SPEED PARTICLES
========================= */

const speedContainer =
    document.querySelector(".speed-lines");


setInterval(() => {

    const line =
        document.createElement("span");

    line.style.top =
        Math.random() * 70 + "%";

    line.style.width =
        Math.random() * 100 + 50 + "px";

    line.style.animationDuration =
        Math.random() * .8 + .5 + "s";


    speedContainer.appendChild(line);


    setTimeout(() => {

        line.remove();

    }, 1500);

}, 500);



/* =========================
   KEYBOARD SHORTCUT
========================= */

document.addEventListener("keydown", e => {

    if (e.key.toLowerCase() === "r") {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }

});