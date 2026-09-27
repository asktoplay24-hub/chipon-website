/**
 * main.js
 * Shared behavior loaded on every page: sticky navbar scroll state,
 * mobile hamburger menu, scroll-reveal animation, current-year footer stamp.
 * Keep this file free of page-specific logic — that lives in
 * portfolio.js and contact.js.
 */

(function () {
  "use strict";

  /* ---------- Sticky navbar scroll effect ---------- */
  function initNavbarScroll() {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    const onScroll = () => {
      navbar.classList.toggle("is-scrolled", window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobile hamburger menu ---------- */
  function initMobileMenu() {
    const toggle = document.querySelector(".navbar__toggle");
    const links = document.querySelector(".navbar__links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      links.classList.toggle("is-open", !isOpen);
      document.body.style.overflow = !isOpen ? "hidden" : "";
    });

    // Close the menu when a link is chosen (mobile navigation)
    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        toggle.setAttribute("aria-expanded", "false");
        links.classList.remove("is-open");
        document.body.style.overflow = "";
      });
    });
  }

  /* ---------- Scroll-reveal for .reveal elements ---------- */
  function initScrollReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ---------- Footer year stamp ---------- */
  function initFooterYear() {
    const el = document.querySelector("[data-current-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", () => {
    initNavbarScroll();
    initMobileMenu();
    initScrollReveal();
    initFooterYear();
  });

  // Expose a small helper other page scripts can reuse for
  // scroll-reveal on elements they inject after DOMContentLoaded.
  window.Chipon = window.Chipon || {};
  window.Chipon.observeReveal = function (el) {
    if (!el) return;
    el.classList.add("reveal");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
  };
})();
