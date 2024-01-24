"use strict";

// Navbar
const navbar = document.querySelector(".navbar");
const heroSection = document.querySelector(".hero-section");
const heroSectionOffset = heroSection.offsetTop;

let prevScrollPos = window.pageYOffset;

window.addEventListener("scroll", () => {
  console.log(window.scrollY, heroSectionOffset - navbar.clientHeight);
  if (window.scrollY > heroSectionOffset - navbar.clientHeight) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }

  let currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    // Scrolling up
    navbar.style.top = "0";
  } else {
    // Scrolling down
    navbar.style.top = `-${navbar.offsetHeight}px`;
  }

  prevScrollPos = currentScrollPos;
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
