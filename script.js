"use strict";

// Navbar
const navbar = document.querySelector("nav");
const heroSection = document.querySelector(".hero-section");
const heroSectionOffset = heroSection.offsetTop;

window.addEventListener("scroll", () => {
  if (window.scrollY > heroSectionOffset - navbar.clientHeight) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});
