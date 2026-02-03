// portfolio main JS (clean + accessible + maintainable)

(() => {
  "use strict";

  // Helpers
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  // 1) Mobile Navigation (a11y 강화: focus trap + aria + scroll lock 안정화)
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

      // a11y attributes (없으면 추가)
      if (!this.hamburger.hasAttribute("aria-expanded")) {
        this.hamburger.setAttribute("aria-expanded", "false");
      }
      // aria-controls: navMenu에 id가 없으면 만들어줌
      if (!this.navMenu.id) this.navMenu.id = "primary-navigation";
      this.hamburger.setAttribute("aria-controls", this.navMenu.id);

      this.hamburger.addEventListener("click", () => this.toggleMenu());

      // 링크 클릭 시 닫기
      this.navLinks.forEach((link) => {
        link.addEventListener("click", () => this.closeMenu());
      });

      // 바깥 클릭 닫기
      document.addEventListener("click", (e) => this.handleOutsideClick(e));

      // 키보드 제어 (Esc + Tab focus trap)
      document.addEventListener("keydown", (e) => this.handleKeydown(e));
    }

    lockScroll(lock) {
      // body overflow만 바꾸면 iOS에서 튐이 있어서 class 기반이 더 안정적임
      document.documentElement.classList.toggle("no-scroll", lock);
      document.body.classList.toggle("no-scroll", lock);
    }

    cacheFocusable() {
      // 메뉴 열렸을 때 내부 포커스 가능한 요소만 잡기
      this.focusable = $$(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

      // focus trap 준비
      this.cacheFocusable();
      // 첫 포커스 이동 (메뉴 내부 링크가 있으면 그쪽)
      (this.firstFocusable || this.navMenu).focus?.();
    }

    closeMenu() {
      if (!this.isOpen) return;
      this.isOpen = false;

      this.hamburger.classList.remove("active");
      this.navMenu.classList.remove("active");

      this.hamburger.setAttribute("aria-expanded", "false");

      this.lockScroll(false);

      // 열기 전 포커스로 복귀
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
        this.cacheFocusable();

        if (e.shiftKey) {
          // shift+tab
          if (document.activeElement === this.firstFocusable) {
            e.preventDefault();
            this.lastFocusable.focus();
          }
        } else {
          // tab
          if (document.activeElement === this.lastFocusable) {
            e.preventDefault();
            this.firstFocusable.focus();
          }
        }
      }
    }
  }

  // 2) Smooth Scroll (기능 유지 + reduced motion 지원)
  class SmoothScroll {
    constructor() {
      this.header = $(".header");
      this.init();
    }

    init() {
      // 이벤트 위임으로 깔끔하게 (링크가 늘어나도 OK)
      document.addEventListener("click", (e) => {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;

        const targetId = anchor.getAttribute("href");
        if (!targetId || targetId === "#") return;

        const target = $(targetId);
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

  // 3) Header Scroll Effect (인라인 스타일 제거 -> class 토글)
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

      // 초기 상태 세팅
      this.updateHeader();
    }

    updateHeader() {
      const scrolled = window.scrollY > 100;
      this.header.classList.toggle("header--scrolled", scrolled);
      this.ticking = false;
    }
  }

  // 4) Scroll Animations (입구용 포폴이라 과한 연출 ↓ + reduced motion 지원)
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
      // 너무 많은 요소 다 넣으면 정신없어서, 딱 카드만
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

  // 5) Loading Animation (현재 방식은 load 후 opacity 0 → 화면 깜빡임 가능)
  // -> JS로 body opacity를 건드리지 말고, CSS로만 처리하는 게 안전함
  // 여기서는 "로드되면 클래스만 추가"로 변경
  class LoadingAnimation {
    constructor() {
      this.init();
    }
    init() {
      window.addEventListener("load", () => {
        document.documentElement.classList.add("is-loaded");
      });
    }
  }

  // 6) CTA Button handler (reduced motion 대응)
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
