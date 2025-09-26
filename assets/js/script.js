// All classes in one file for simple debugging

// Mobile Navigation Toggle
class MobileNavigation {
  constructor() {
    this.hamburger = document.querySelector(".hamburger");
    this.navMenu = document.querySelector(".nav-menu");
    this.navLinks = document.querySelectorAll(".nav-menu a");
    this.isOpen = false;

    this.init();
  }

  init() {
    if (!this.hamburger || !this.navMenu) return;

    this.hamburger.addEventListener("click", () => this.toggleMenu());
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => this.closeMenu());
    });
    document.addEventListener("click", (e) => this.handleOutsideClick(e));
    document.addEventListener("keydown", (e) => this.handleKeydown(e));
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.hamburger.classList.toggle("active");
    this.navMenu.classList.toggle("active");
    this.hamburger.setAttribute("aria-expanded", this.isOpen);

    // Prevent body scroll when menu is open
    document.body.style.overflow = this.isOpen ? "hidden" : "";
  }

  closeMenu() {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.hamburger.classList.remove("active");
    this.navMenu.classList.remove("active");
    this.hamburger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  handleOutsideClick(e) {
    if (
      this.isOpen &&
      !this.hamburger.contains(e.target) &&
      !this.navMenu.contains(e.target)
    ) {
      this.closeMenu();
    }
  }

  handleKeydown(e) {
    if (e.key === "Escape" && this.isOpen) {
      this.closeMenu();
    }
  }
}

// Smooth scrolling utility
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => this.handleClick(e, anchor));
    });
  }

  handleClick(e, anchor) {
    e.preventDefault();
    const targetId = anchor.getAttribute("href");
    const target = document.querySelector(targetId);

    if (target) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }
}

// Header scroll effect
class HeaderScroll {
  constructor() {
    this.header = document.querySelector(".header");
    this.lastScrollY = window.scrollY;
    this.ticking = false;

    this.init();
  }

  init() {
    if (!this.header) return;

    window.addEventListener("scroll", () => this.handleScroll(), {
      passive: true,
    });
  }

  handleScroll() {
    if (!this.ticking) {
      requestAnimationFrame(() => this.updateHeader());
      this.ticking = true;
    }
  }

  updateHeader() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      this.header.style.background = "rgba(255, 255, 255, 0.95)";
      this.header.style.backdropFilter = "blur(20px)";
      this.header.style.boxShadow = "0 4px 20px rgba(56, 189, 248, 0.1)";
    } else {
      this.header.style.background = "rgba(255, 255, 255, 0.8)";
      this.header.style.backdropFilter = "blur(20px)";
      this.header.style.boxShadow = "none";
    }

    this.lastScrollY = currentScrollY;
    this.ticking = false;
  }
}

// Intersection Observer for scroll animations
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };
    this.observer = null;
    this.init();
  }

  init() {
    if ("IntersectionObserver" in window) {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        this.observerOptions
      );
      this.setupAnimations();
    }
  }

  setupAnimations() {
    const animatedElements = document.querySelectorAll(
      ".skill-card, .project-card, .stat-item, .contact-item"
    );

    animatedElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      this.observer.observe(el);
    });
  }

  handleIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        this.observer.unobserve(entry.target);
      }
    });
  }
}

// Loading animation
class LoadingAnimation {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener("load", () => this.handleLoad());
  }

  handleLoad() {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease-in-out";

    requestAnimationFrame(() => {
      document.body.style.opacity = "1";
    });
  }
}

// CTA Button handler
class CTAButton {
  constructor() {
    this.button = document.querySelector(".cta-button");
    this.init();
  }

  init() {
    if (this.button) {
      this.button.addEventListener("click", () => this.handleClick());
    }
  }

  handleClick() {
    const projectsSection = document.querySelector("#projects");
    if (projectsSection) {
      const headerHeight = document.querySelector(".header").offsetHeight;
      const targetPosition = projectsSection.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  }
}

// Touch support for mobile (optional enhancement)
class TouchSupport {
  constructor() {
    this.touchStartY = 0;
    this.touchEndY = 0;
    this.swipeThreshold = 50;
    this.init();
  }

  init() {
    document.addEventListener("touchstart", (e) => this.handleTouchStart(e), {
      passive: true,
    });
    document.addEventListener("touchend", (e) => this.handleTouchEnd(e), {
      passive: true,
    });
  }

  handleTouchStart(e) {
    this.touchStartY = e.changedTouches[0].screenY;
  }

  handleTouchEnd(e) {
    this.touchEndY = e.changedTouches[0].screenY;
    this.handleSwipe();
  }

  handleSwipe() {
    const diff = this.touchStartY - this.touchEndY;

    if (Math.abs(diff) > this.swipeThreshold) {
      if (diff > 0) {
        // Swipe up - could be used for navigation
        console.log("Swipe up detected");
      } else {
        // Swipe down - could be used for navigation
        console.log("Swipe down detected");
      }
    }
  }
}

// Initialize all components
document.addEventListener("DOMContentLoaded", () => {
  // Navigation
  new MobileNavigation();
  new SmoothScroll();
  new HeaderScroll();

  // Animations
  new ScrollAnimations();
  new LoadingAnimation();

  // Other components
  new CTAButton();
  new TouchSupport();
});
