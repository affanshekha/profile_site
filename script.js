const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const themeToggle = document.querySelector(".theme-toggle");
const copyEmailButton = document.querySelector(".copy-email");
const year = document.querySelector("#year");
const backToTopButton = document.querySelector(".back-to-top");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");

    const currentTheme = document.body.classList.contains("light-theme")
      ? "light"
      : "dark";

    localStorage.setItem("theme", currentTheme);
  });
}

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

if (copyEmailButton) {
  copyEmailButton.addEventListener("click", async () => {
    const email = copyEmailButton.dataset.email;

    try {
      await navigator.clipboard.writeText(email);
      copyEmailButton.textContent = "Email Copied";

      setTimeout(() => {
        copyEmailButton.textContent = "Copy Email";
      }, 1800);
    } catch (error) {
      window.location.href = `mailto:${email}`;
    }
  });
}

if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12
  }
);

revealElements.forEach(element => {
  revealOnScroll.observe(element);
});
