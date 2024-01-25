"use strict";

// Navbar
const navbar = document.querySelector(".navbar");
const heroSection = document.querySelector(".hero-section");
const heroSectionOffset = heroSection.offsetTop;

const isPhone = window.matchMedia("(max-width: 767px)").matches;
let prevScrollPos = window.scrollY;

window.addEventListener("scroll", () => {
  if (window.scrollY > heroSectionOffset - navbar.clientHeight) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }

  if (isPhone) {
    let currentScrollPos = window.scrollY;

    if (prevScrollPos > currentScrollPos) {
      // Scrolling up
      navbar.style.top = "0";
    } else {
      // Scrolling down
      navbar.style.top = `-${navbar.offsetHeight}px`;
    }

    prevScrollPos = currentScrollPos;
  }
});

// Navbar toggle
let isNavbarOpen = false;

const hamburgerLogos = document.querySelectorAll(".hamburger-menu-logo");
const hamburgerMenu = document.querySelector(".hamburger-menu");

hamburgerLogos.forEach((hamburgerLogo) => {
  hamburgerLogo.addEventListener("click", () => {
    console.log("clicked");
    if (!isNavbarOpen) {
      hamburgerMenu.classList.add("open");
      isNavbarOpen = true;
    } else {
      hamburgerMenu.classList.remove("open");
      isNavbarOpen = false;
    }
  });
});

// slider
const dots = document.querySelectorAll(".dot");
const sliderBtns = document.querySelectorAll(".slider-btn");
const slides = [...document.querySelectorAll(".slide")];
let intervalId;

function changeSlide(offset) {
  const activeSlide = slides.find((slide) =>
    slide.classList.contains("active")
  );
  const activeDot = [...dots].find((dot) => dot.classList.contains("active"));
  const activeSlideIndex = [...slides].indexOf(activeSlide);
  let nextSlideIndex = activeSlideIndex + offset;

  if (nextSlideIndex < 0) {
    nextSlideIndex = slides.length - 1;
  } else if (nextSlideIndex === slides.length) {
    nextSlideIndex = 0;
  }

  const nextSlide = slides[nextSlideIndex];
  nextSlide.classList.add("active");
  activeSlide.classList.remove("active");

  const nextDot = dots[nextSlideIndex];
  nextDot.classList.add("active");
  activeDot.classList.remove("active");
}

function startInterval() {
  intervalId = setInterval(() => {
    changeSlide(1);
  }, 4000);
}

sliderBtns.forEach((sliderBtn) => {
  sliderBtn.addEventListener("click", () => {
    clearInterval(intervalId);
    const offset = sliderBtn.classList.contains("next") ? 1 : -1;
    changeSlide(offset);
    startInterval();
  });
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    clearInterval(intervalId);

    const indexOfCurrentDot = [...dots].indexOf(dot);
    const indexOfActiveDot = [...dots].indexOf(
      document.querySelector(".dot.active")
    );

    if (indexOfCurrentDot === indexOfActiveDot) return;

    const offset =
      [...dots].indexOf(dot) -
      [...dots].indexOf(document.querySelector(".dot.active"));

    changeSlide(offset);

    startInterval();
  });
});

startInterval();

// Touch events
const slideContainer = document.querySelector(".slides");
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  touchEndX = event.touches[0].clientX;
}

function handleTouchEnd() {
  const swipeThreshold = 50; // Adjust this value as needed

  if (touchStartX - touchEndX > swipeThreshold) {
    // Swiped left, go to the next slide
    clearInterval(intervalId);
    changeSlide(1);
  } else if (touchEndX - touchStartX > swipeThreshold) {
    // Swiped right, go to the previous slide
    clearInterval(intervalId);
    changeSlide(-1);
  }
}

// Attach touch event listeners
slideContainer.addEventListener("touchstart", handleTouchStart);
slideContainer.addEventListener("touchmove", handleTouchMove);
slideContainer.addEventListener("touchend", handleTouchEnd);

// accordion
const accordionQuestions = document.querySelectorAll(
  ".accordion-question-container"
);

accordionQuestions.forEach((accordionQuestion) => {
  accordionQuestion.addEventListener("click", () => {
    const accordionAnswer = accordionQuestion.nextElementSibling;
    const accordionArrow = accordionQuestion.querySelector(".accordion-arrow");

    console.log(accordionAnswer.style);

    if (accordionAnswer.style.maxHeight) {
      accordionAnswer.style.maxHeight = null;
    } else {
      accordionAnswer.style.maxHeight = accordionAnswer.scrollHeight + "px";
    }
  });
});
