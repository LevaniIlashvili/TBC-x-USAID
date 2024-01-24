"use strict";

// Navbar
const navbar = document.querySelector(".navbar");
const heroSection = document.querySelector(".hero-section");
const heroSectionOffset = heroSection.offsetTop;

window.addEventListener("scroll", () => {
  if (window.scrollY > heroSectionOffset - navbar.clientHeight) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
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
