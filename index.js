function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
  });

  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
  document.querySelectorAll(".navbar a").forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      locoScroll.scrollTo(targetElement);
    });
  });
}

function loadingPage() {
  var w = document.documentElement.clientWidth || window.innerWidth;
  let tl = gsap.timeline();

  tl.from("#loader__text h1", {
    y: 150,
    stagger: 0.2,
  });

  tl.from("#counter__text, .line h2", {
    opacity: 0,
    onStart: function () {
      let counter = document.querySelector("#counter__text");

      let count = 0;
      setInterval(() => {
        if (count < 100) {
          count++;
          counter.innerHTML = count;
        } else {
          count = 100;
        }
      }, 33);
    },
  });

  tl.to(".line", {
    overflow: "visible",
  });

  tl.to("#loader h1", {
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    delay: 2.5,
  });

  if (w <= 480) {
    tl.to("#now", {
      scale: 6,
      x: "-18vh",
      y: "-2vh",
      duration: 1,
      color: "#d946ef",
      ease: "expo.out",
    });
  } else {
    tl.to("#now", {
      scale: 3,
      x: "-40vh",
      y: "-10vh",
      duration: 1,
      color: "#d946ef",
      ease: "expo.out",
    });
  }

  tl.to("#loader", {
    y: "-100vh",
    duration: 2,
    ease: "expo.out",
  });

  tl.to("#loader", {
    display: "none",
  });

  tl.from(
    "#hero1 h1, #hero2 h1, #hero3, #hero4 h1",
    {
      y: 120,
      opacity: 0,
      stagger: 0.1,
      duration: 0.3,
      ease: "expo.out",
    },
    "-=2"
  );
}

function cursorAnime() {
  document.addEventListener("mousemove", (e) => {
    gsap.to("#cursor", {
      x: e.x,
      y: e.y,
      xPercent: -50,
      yPercent: -50,
      ease: "expo",
    });
  });

  Shery.makeMagnet("nav p");
}

function projectAnime() {
  Shery.imageEffect(".image__div", {
    style: 0,
    config: {
      a: { value: 0, range: [0, 30] },
      b: { value: -0.99, range: [-1, 1] },
      zindex: { value: "9", range: [-9999999, 9999999] },
      aspect: { value: 0.9022689356880034 },
      ignoreShapeAspect: { value: false },
      shapePosition: { value: { x: 0.010752688172043001, y: 0 } },
      shapeScale: { value: { x: 1, y: 1 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 4] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.9 },
      gooey: { value: true },
      infiniteGooey: { value: false },
      growSize: { value: 15, range: [1, 15] },
      durationOut: { value: 5, range: [0.1, 5] },
      durationIn: { value: 0.1, range: [0.1, 5] },
      displaceAmount: { value: 4 },
      masker: { value: true },
      maskVal: { value: 1.4, range: [1, 5] },
      scrollType: { value: 3 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: false },
      onMouse: { value: 0 },
      noise_speed: { value: 0.69, range: [0, 10] },
      metaball: { value: 0.37, range: [0, 2] },
      discard_threshold: { value: 1, range: [0, 1] },
      antialias_threshold: { value: 0, range: [0, 0.1] },
      noise_height: { value: 0.32, range: [0, 2] },
      noise_scale: { value: 5.34, range: [0, 100] },
    },

    gooey: true,
  });
}

let hero = document.querySelector(".hero h1");
hero.style.textTransform = "capitalize";
//Calling locomotive

let aboutElement = document.querySelector("#about__main");
let aboutText = aboutElement.textContent;
let splitText = aboutText.split("");
aboutElement.innerHTML = splitText.map((val) => `<span>${val}</span>`).join("");

//Calling loading page
loadingPage();

var w = document.documentElement.clientWidth || window.innerWidth;
if (w <= 480) {
} else {
  locomotive();
  cursorAnime();
  projectAnime();

  const aboutHeading = document.querySelector("#lets__create");
  const AboutText = new SplitType("#lets__create");

  const aboutTween = gsap.from("#lets__create .char", {
    opacity: 0.1,
    skewY: -10,
    x: -30,
    color: "#fff",
    skewX: -20,
    duration: 0.6,
    stagger: 0.05,
    ease: "expo.out",
    margin: 0,
  });

  aboutTween.pause();

  aboutHeading.addEventListener("mouseenter", () => {
    aboutTween.play();
  });
  aboutHeading.addEventListener("mouseleave", () => {
    aboutTween.reverse();
  });

  gsap.from("#about__heading h1 span", {
    opacity: 0.1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: "#about__main",
      scroller: "#main",
      scrub: 2,
    },
  });

  gsap.from("#page4 .about__border", {
    x: 1000,
    duration: 2,
    scrollTrigger: {
      trigger: "#about__main",
      scroller: "#main",
      scrub: 5,
    },
  });

  gsap.from("#page4 img", {
    x: -350,
    scrollTrigger: {
      start: "top 40%",
      end: "top -100%",
      trigger: "#page4 p span",
      scroller: "#main",
      scrub: 3,
    },
  });

  gsap.from("#page4 #blue__box", {
    x: 1000,
    opacity: 0,
    scale: 0,
    scrollTrigger: {
      start: "top 200%",
      end: "top -100%",
      trigger: "#page4 #blue__box",
      scroller: "#main",
      scrub: 3,
    },
  });
  gsap.to("#page4 p span", {
    color: "#10b981",
    stagger: 2,
    scrollTrigger: {
      trigger: "#about__main",
      scroller: "#main",
      start: "top 40%",
      end: "top -100%",
      scrub: 2,
      pin: "#page4",
    },
  });
  gsap.to("#footer .about__border", {
    backgroundColor: "#d946ef",
    width: 100,
    opacity: 1,
    delay: 2,
    scrollTrigger: {
      trigger: "#footer .about__border",
      scroller: "#main",
      start: "top 60%",
      end: "top 10%",
      scrub: 2,
    },
  });
}
