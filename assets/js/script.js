// Portfolio JS (reveal + nav highlight + visitor counter)

(() => {
  "use strict";

  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const $ = (sel, root = document) => root.querySelector(sel);

  const prefersReducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  function initScrollReveal() {
    if (prefersReducedMotion) return;
    if (!("IntersectionObserver" in window)) return;

    const targets = $$(".reveal");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const delay = Number(entry.target.dataset.delay || 0);
          window.setTimeout(() => entry.target.classList.add("visible"), delay);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 }
    );

    targets.forEach((el, i) => {
      el.dataset.delay = String((i % 4) * 80);
      observer.observe(el);
    });
  }

  function initActiveNavHighlight() {
    const sections = $$('section[id]');
    const navLinks = $$(".nav-links a");
    if (!sections.length || !navLinks.length) return;

    const update = () => {
      let current = "";
      const y = window.scrollY;
      sections.forEach((s) => {
        if (y >= s.offsetTop - 100) current = s.id;
      });
      navLinks.forEach((a) => {
        const isActive = a.getAttribute("href") === `#${current}`;
        a.style.color = isActive ? "var(--text)" : "";
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  async function initVisitorCounter() {
    const counterEl = $("#visitor-count");
    if (!counterEl) return;

    // CountAPI: free + no signup, but requires network.
    // Namespace/key should be globally unique-ish.
    const namespace = "bae-eunji-portfolio";
    const key = "visits";

    const today = new Date().toISOString().slice(0, 10);
    const storageKey = `visitorCounted:${namespace}:${key}`;
    const countedToday = localStorage.getItem(storageKey) === today;

    const endpoint = countedToday
      ? `https://api.countapi.xyz/get/${encodeURIComponent(namespace)}/${encodeURIComponent(key)}`
      : `https://api.countapi.xyz/hit/${encodeURIComponent(namespace)}/${encodeURIComponent(key)}`;

    try {
      const res = await fetch(endpoint, { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      if (!countedToday) localStorage.setItem(storageKey, today);

      const value = typeof data?.value === "number" ? data.value : null;
      counterEl.textContent = value === null ? "—" : value.toLocaleString("ko-KR");
    } catch {
      counterEl.textContent = "—";
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
    initActiveNavHighlight();
    initVisitorCounter();
  });
})();
