// Get the mobile menu button and the navigation links.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

// Open or close the menu when the button is clicked.
menuToggle.addEventListener("click", function () {
  const menuIsOpen = menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!menuIsOpen));
  navLinks.classList.toggle("is-open");
});

// Close the menu after choosing a navigation link.
const navigationItems = document.querySelectorAll(".nav-links a");

navigationItems.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Close the menu if the visitor clicks outside it.
document.addEventListener("click", function (event) {
  const clickedMenu = navLinks.contains(event.target);
  const clickedButton = menuToggle.contains(event.target);

  if (!clickedMenu && !clickedButton) {
    navLinks.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

// Show elements when they enter the screen.
document.body.classList.add("js-enabled");

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });
} else {
  // Make all elements visible in older browsers.
  revealElements.forEach(function (element) {
    element.classList.add("is-visible");
  });
}

// Show the back-to-top button after scrolling down.
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

// Scroll smoothly to the top when the button is clicked.
backToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Display the current year in the footer.
document.querySelector("#year").textContent = new Date().getFullYear();
