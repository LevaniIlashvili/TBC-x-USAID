"use strict";

// Navbar
const navbar = document.querySelector(".navbar");
const heroSection = document.querySelector(".hero-section");
const hamburgerLogo = document.querySelector(".hamburger-menu-logo");
const isPhone = window.matchMedia("(max-width: 767px)").matches;
let prevScrollPos = window.scrollY;
const heroSectionOffset = heroSection.offsetTop;

window.addEventListener("scroll", () => {
  if (window.scrollY > heroSectionOffset - navbar.clientHeight) {
    navbar.classList.toggle("sticky");
  } else {
    navbar.classList.toggle("sticky");
  }

  if (isPhone) {
    const currentScrollPos = window.scrollY;

    if (prevScrollPos > currentScrollPos) {
      // Scrolling up
      hamburgerLogo.style.top = "7vw";
      navbar.style.top = "0";
    } else {
      // Scrolling down
      hamburgerLogo.style.top = "-10vw";
      navbar.style.top = `-${navbar.offsetHeight}px`;
    }

    prevScrollPos = currentScrollPos;
  }
});

// Navbar toggle
let isNavbarOpen = false;
const hamburgerMenu = document.querySelector(".hamburger-menu");
const body = document.querySelector("body");

const toggleNavbar = () => {
  isNavbarOpen = !isNavbarOpen;
  hamburgerMenu.classList.toggle("open", isNavbarOpen);
  body.classList.toggle("no-scroll", isNavbarOpen);
};

hamburgerLogo.addEventListener("click", toggleNavbar);

// Slider
const dots = document.querySelectorAll(".dot");
const sliderBtns = document.querySelectorAll(".slider-btn");
const slides = Array.from(document.querySelectorAll(".slide"));
let intervalId;

const changeSlide = (offset) => {
  const activeSlideIndex = slides.findIndex((slide) =>
    slide.classList.contains("active")
  );
  let nextSlideIndex = activeSlideIndex + offset;

  if (nextSlideIndex < 0) {
    nextSlideIndex = slides.length - 1;
  } else if (nextSlideIndex === slides.length) {
    nextSlideIndex = 0;
  }

  slides[nextSlideIndex].classList.add("active");
  slides[activeSlideIndex].classList.remove("active");

  dots[nextSlideIndex].classList.add("active");
  dots[activeSlideIndex].classList.remove("active");
};

const startInterval = () => {
  intervalId = setInterval(() => {
    changeSlide(1);
  }, 4000);
};

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

const handleTouchStart = (event) => {
  touchStartX = event.touches[0].clientX;
};

const handleTouchMove = (event) => {
  touchEndX = event.touches[0].clientX;
};

const handleTouchEnd = () => {
  const swipeThreshold = 50;

  if (touchStartX - touchEndX > swipeThreshold) {
    clearInterval(intervalId);
    changeSlide(1);
  } else if (touchEndX - touchStartX > swipeThreshold) {
    clearInterval(intervalId);
    changeSlide(-1);
  }
};

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

    if (accordionAnswer.style.maxHeight) {
      accordionAnswer.style.maxHeight = null;
      accordionArrow.classList.remove("active");
    } else {
      accordionAnswer.style.maxHeight = `${accordionAnswer.scrollHeight}px`;
      accordionArrow.classList.add("active");
    }
  });
});
