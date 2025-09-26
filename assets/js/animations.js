// Animation utilities and classes
export class ScrollAnimations {
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

export class LoadingAnimation {
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
