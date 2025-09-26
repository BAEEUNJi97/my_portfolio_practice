// Navigation functionality
export class MobileNavigation {
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

export class SmoothScroll {
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

export class HeaderScroll {
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
