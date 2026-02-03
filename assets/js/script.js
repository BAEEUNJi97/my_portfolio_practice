// portfolio main JS (clean + accessible + maintainable)

(() => {
  "use strict";

  // Helpers
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const prefersReducedMotion =
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  // iOS 스크롤 잠금 보조(선택)
  const preventTouchMove = (e) => e.preventDefault();

  // 1) Mobile Navigation (a11y + focus trap + scroll lock)
  class MobileNavigation {
    constructor() {
      this.hamburger = $(".hamburger");
      this.navMenu = $(".nav-menu");
      this.navLinks = $$(".nav-menu a");
      this.isOpen = false;

      // focus trap
      this.focusable = [];
      this.firstFocusable = null;
      this.lastFocusable = null;
      this.previousActiveElement = null;

      this.init();
    }

    init() {
      if (!this.hamburger || !this.navMenu) return;

      // a11y attributes
      if (!this.hamburger.hasAttribute("aria-expanded")) {
        this.hamburger.setAttribute("aria-expanded", "false");
      }
      if (!this.navMenu.id) this.navMenu.id = "primary-navigation";
      this.hamburger.setAttribute("aria-controls", this.navMenu.id);

      // navMenu 자체에 포커스 가능하게(링크가 없을 때 대비)
      if (!this.navMenu.hasAttribute("tabindex")) {
        this.navMenu.setAttribute("tabindex", "-1");
      }

      this.hamburger.addEventListener("click", () => this.toggleMenu());

      this.navLinks.forEach((link) => {
        link.addEventListener("click", () => this.closeMenu());
      });

      document.addEventListener("click", (e) => this.handleOutsideClick(e));
      document.addEventListener("keydown", (e) => this.handleKeydown(e));
    }

    lockScroll(lock) {
      document.documentElement.classList.toggle("no-scroll", lock);
      document.body.classList.toggle("no-scroll", lock);

      // iOS에서 메뉴 열린 상태에서 배경 스크롤/튐 방지
      if (lock) {
        document.addEventListener("touchmove", preventTouchMove, { passive: false });
      } else {
        document.removeEventListener("touchmove", preventTouchMove);
      }
    }

    cacheFocusable() {
      this.focusable = $$(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        this.navMenu
      ).filter((el) => el.offsetParent !== null);

      this.firstFocusable = this.focusable[0] || null;
      this.lastFocusable = this.focusable[this.focusable.length - 1] || null;
    }

    openMenu() {
      if (this.isOpen) return;
      this.isOpen = true;

      this.previousActiveElement = document.activeElement;

      this.hamburger.classList.add("active");
      this.navMenu.classList.add("active");

      this.hamburger.setAttribute("aria-expanded", "true");
      this.lockScroll(true);

      this.cacheFocusable();

      // 첫 포커스 이동
      const focusTarget = this.firstFocusable || this.navMenu;
      focusTarget?.focus?.();
    }

    closeMenu() {
      if (!this.isOpen) return;
      this.isOpen = false;

      this.hamburger.classList.remove("active");
      this.navMenu.classList.remove("active");

      this.hamburger.setAttribute("aria-expanded", "false");
      this.lockScroll(false);

      this.previousActiveElement?.focus?.();
    }

    toggleMenu() {
      this.isOpen ? this.closeMenu() : this.openMenu();
    }

    handleOutsideClick(e) {
      if (!this.isOpen) return;

      const clickedOutside =
        !this.hamburger.contains(e.target) && !this.navMenu.contains(e.target);

      if (clickedOutside) this.closeMenu();
    }

    handleKeydown(e) {
      if (!this.isOpen) return;

      if (e.key === "Escape") {
        this.closeMenu();
        return;
      }

      // focus trap: Tab / Shift+Tab
      if (e.key === "Tab" && this.focusable.length) {
        this.cacheFocusable(); // 메뉴 안 요소가 변경될 수 있으니 갱신

        if (e.shiftKey) {
          if (document.activeElement === this.firstFocusable) {
            e.preventDefault();
            this.lastFocusable?.focus?.();
          }
        } else {
          if (document.activeElement === this.lastFocusable) {
            e.preventDefault();
            this.firstFocusable?.focus?.();
          }
        }
      }
    }
  }

  // 2) Smooth Scroll (reduced motion 지원 + 안전 처리)
  class SmoothScroll {
    constructor() {
      this.header = $(".header");
      this.init();
    }

    init() {
      document.addEventListener("click", (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;

        const href = anchor.getAttribute("href");
        if (!href || href === "#") return;

        // 같은 페이지 hash 이동만 처리
        const target = $(href);
        if (!target) return;

        e.preventDefault();
        this.scrollToTarget(target);
      });
    }

    scrollToTarget(target) {
      const headerHeight = this.header?.offsetHeight ?? 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

      window.scrollTo({
        top,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  }

  // 3) Header Scroll Effect (class toggle)
  class HeaderScroll {
    constructor() {
      this.header = $(".header");
      this.ticking = false;
      this.init();
    }

    init() {
      if (!this.header) return;

      window.addEventListener(
        "scroll",
        () => {
          if (!this.ticking) {
            requestAnimationFrame(() => this.updateHeader());
            this.ticking = true;
          }
        },
        { passive: true }
      );

      this.updateHeader();
    }

    updateHeader() {
      const scrolled = window.scrollY > 100;
      this.header.classList.toggle("header--scrolled", scrolled);
      this.ticking = false;
    }
  }

  // 4) Scroll Animations (카드만, reduced motion이면 꺼짐)
  class ScrollAnimations {
    constructor() {
      if (prefersReducedMotion) return;
      if (!("IntersectionObserver" in window)) return;

      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );

      this.init();
    }

    init() {
      const animated = $$(".project-card, .skill-card");

      animated.forEach((el) => {
        el.classList.add("reveal");
        this.observer.observe(el);
      });
    }

    handleIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--in");
          this.observer.unobserve(entry.target);
        }
      });
    }
  }

  // 5) Loading Animation (깜빡임 방지: 클래스만 추가)
  class LoadingAnimation {
    constructor() {
      window.addEventListener("load", () => {
        document.documentElement.classList.add("is-loaded");
      });
    }
  }

  // 6) CTA Button handler
  class CTAButton {
    constructor() {
      this.button = $(".cta-button");
      this.header = $(".header");
      this.init();
    }

    init() {
      if (!this.button) return;
      this.button.addEventListener("click", () => this.handleClick());
    }

    handleClick() {
      const projectsSection = $("#projects");
      if (!projectsSection) return;

      const headerHeight = this.header?.offsetHeight ?? 0;
      const top =
        projectsSection.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

      window.scrollTo({
        top,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  }

  // Init
  document.addEventListener("DOMContentLoaded", () => {
    new MobileNavigation();
    new SmoothScroll();
    new HeaderScroll();
    new ScrollAnimations();
    new LoadingAnimation();
    new CTAButton();
  });
})();
