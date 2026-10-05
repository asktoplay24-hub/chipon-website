/**
 * portfolio.js
 * Loads data/portfolio.json and renders work cards.
 * Runs in two modes, chosen by which container is present in the page:
 *   - #featured-grid  → homepage "Featured Works" (first N items, no filter)
 *   - #portfolio-grid → portfolio.html (full grid with category filter)
 *
 * To add a new project: edit data/portfolio.json only.
 * This file never needs to change when the content changes.
 */

(function () {
  "use strict";

  const DATA_URL = "data/portfolio.json";
  const FEATURED_COUNT = 6;

  function cardTemplate(item) {
    const article = document.createElement("article");
    article.className = "work-card reveal";
    article.dataset.category = item.category;

    article.innerHTML = `
      <div class="work-card__media">
        <img
          src="${item.image}"
          alt="ภาพปกผลงาน: ${item.title}"
          loading="lazy"
          onerror="this.closest('.work-card').classList.add('work-card--broken')"
        />
      </div>
      <div class="work-card__body">
        <div class="work-card__meta">
          <span>${item.category}</span>
          <span>${item.year}</span>
        </div>
        <h3 class="work-card__title">${item.title}</h3>
        <p class="work-card__desc">${item.description}</p>
        <a class="work-card__link" href="${item.link}">ดูผลงาน</a>
      </div>
    `;
    return article;
  }

  function renderEmptyState(container, message) {
    const div = document.createElement("div");
    div.className = "portfolio-empty";
    div.textContent = message;
    container.appendChild(div);
  }

  function renderGrid(container, items) {
    container.innerHTML = "";
    if (!items.length) {
      renderEmptyState(container, "ยังไม่มีผลงานในหมวดหมู่นี้");
      return;
    }
    items.forEach((item) => {
      const card = cardTemplate(item);
      container.appendChild(card);
      if (window.Chipon && window.Chipon.observeReveal) {
        window.Chipon.observeReveal(card);
      }
    });
  }

  function initFilters(container, allItems) {
    const filterBar = document.querySelector("[data-portfolio-filters]");
    if (!filterBar) return;

    filterBar.addEventListener("click", (event) => {
      const btn = event.target.closest(".filter-btn");
      if (!btn) return;

      filterBar
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");

      const category = btn.dataset.filter;
      const filtered =
        category === "All"
          ? allItems
          : allItems.filter((item) => item.category === category);

      renderGrid(container, filtered);
    });
  }

  function loadPortfolio() {
    const featuredContainer = document.getElementById("featured-grid");
    const portfolioContainer = document.getElementById("portfolio-grid");
    if (!featuredContainer && !portfolioContainer) return;

    fetch(DATA_URL)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((items) => {
        if (featuredContainer) {
          renderGrid(featuredContainer, items.slice(0, FEATURED_COUNT));
        }
        if (portfolioContainer) {
          renderGrid(portfolioContainer, items);
          initFilters(portfolioContainer, items);
        }
      })
      .catch((error) => {
        console.error("ไม่สามารถโหลด data/portfolio.json:", error);
        const container = portfolioContainer || featuredContainer;
        if (container) {
          renderEmptyState(
            container,
            "โหลดผลงานไม่สำเร็จ — หากเปิดไฟล์นี้โดยตรง (file://) ให้รันผ่าน local server แทน (ดูวิธีใน README.md)"
          );
        }
      });
  }

  document.addEventListener("DOMContentLoaded", loadPortfolio);
})();
