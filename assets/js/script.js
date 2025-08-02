"use strict";
class WanderWiseLoader {
  constructor() {
    this.pageLoader = document.getElementById("pageLoader");
    this.loaderPercentage = document.querySelector(".loader-percentage");
    this.loaderText = document.querySelector(".loader-text");
    this.loaderProgress = document.querySelector(".loader-progress");
    this.loaderParticles = document.getElementById("loaderParticles");
    this.minLoadingTime = 500;
    this.startTime = Date.now();
    this.currentLoaderType = 1;
    this.adventureQuotes = [
      "Discover Your Next Adventure",
      "Adventure Awaits Your Arrival",
      "Journey Beyond Ordinary",
      "Explore Without Limits",
      "Create Unforgettable Memories",
      "Wanderlust Calls Your Name",
      "Embrace the Unknown",
      "Adventure is Out There",
    ];
    this.loadingMessages = [
      "Preparing your journey to extraordinary places...",
      "Gathering the best travel experiences...",
      "Curating personalized adventures...",
      "Loading magical destinations...",
      "Connecting you to wanderlust...",
    ];
  }
  init() {
    this.createParticles();
    this.startQuoteRotation();
    this.startMessageRotation();
    this.simulateProgress();
    this.waitForPageLoad();
  }
  createParticles() {
    if (!this.loaderParticles) return;
    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 4 + "s";
      particle.style.animationDuration = 3 + Math.random() * 2 + "s";
      this.loaderParticles.appendChild(particle);
    }
  }
  startQuoteRotation() {
    let currentQuote = 0;
    const quoteInterval = setInterval(() => {
      if (currentQuote < this.adventureQuotes.length - 1) {
        currentQuote++;
      } else {
        currentQuote = 0;
      }
      if (this.loaderText) {
        this.loaderText.style.opacity = "0";
        setTimeout(() => {
          this.loaderText.textContent = this.adventureQuotes[currentQuote];
          this.loaderText.style.opacity = "1";
        }, 200);
      }
    }, 1200);
    this.quoteInterval = quoteInterval;
  }
  startMessageRotation() {
    const messageElement = document.querySelector(".loader-message");
    if (!messageElement) return;
    let currentMessage = 0;
    const messageInterval = setInterval(() => {
      if (currentMessage < this.loadingMessages.length - 1) {
        currentMessage++;
      } else {
        currentMessage = 0;
      }
      messageElement.style.opacity = "0";
      setTimeout(() => {
        messageElement.textContent = this.loadingMessages[currentMessage];
        messageElement.style.opacity = "0.8";
      }, 300);
    }, 2000);
    this.messageInterval = messageInterval;
  }
  simulateProgress() {
    let progress = 0;
    const progressInterval = setInterval(() => {
      const increment = Math.random() * 8 + 2;
      progress += increment;
      if (progress > 85) {
        progress += Math.random() * 2;
      }
      if (progress > 98) {
        progress = 98;
      }
      this.updateProgress(progress);
      if (progress >= 98) {
        clearInterval(progressInterval);
        this.progressInterval = null;
      }
    }, 150);
    this.progressInterval = progressInterval;
  }
  updateProgress(percent) {
    if (this.loaderProgress) {
      this.loaderProgress.style.width = percent + "%";
    }
    if (this.loaderPercentage) {
      this.loaderPercentage.textContent = Math.round(percent) + "%";
    }
  }
  waitForPageLoad() {
    const checkReady = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - this.startTime;
      const isPageLoaded = document.readyState === "complete";
      const minTimeReached = elapsedTime >= this.minLoadingTime;
      if (isPageLoaded && minTimeReached) {
        this.completeLoading();
      } else {
        setTimeout(checkReady, 100);
      }
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", checkReady);
    } else {
      checkReady();
    }
  }
  setupLoaderSwitching() {
    const switchInterval = setInterval(() => {
      this.switchLoaderType();
    }, 4000);
    this.switchInterval = switchInterval;
  }
  switchLoaderType() {
    if (!this.pageLoader) return;
    this.pageLoader.classList.remove(
      "loader-option-1",
      "loader-option-2",
      "loader-option-3"
    );
    this.currentLoaderType = (this.currentLoaderType % 3) + 1;
    this.pageLoader.classList.add(`loader-option-${this.currentLoaderType}`);
  }
  completeLoading() {
    if (this.quoteInterval) clearInterval(this.quoteInterval);
    if (this.messageInterval) clearInterval(this.messageInterval);
    if (this.progressInterval) clearInterval(this.progressInterval);
    if (this.switchInterval) clearInterval(this.switchInterval);
    this.updateProgress(100);
    if (this.loaderText) {
      this.loaderText.textContent = "Welcome to WanderWise!";
    }
    setTimeout(() => {
      this.hideLoadingScreen();
    }, 800);
  }
  hideLoadingScreen() {
    if (!this.pageLoader) return;
    this.pageLoader.classList.add("fade-out");
    setTimeout(() => {
      this.pageLoader.remove();
      document.body.classList.add("loaded");
      document.body.classList.remove("fade");
      document.body.classList.add("page-loaded");
      document.body.style.overflow = "auto";
      this.triggerEntranceAnimations();
    }, 500);
  }
  triggerEntranceAnimations() {
    const sections = document.querySelectorAll(".section-animate");
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add("in-view");
      }, index * 200);
    });
    if (window.letterAnimation) {
      setTimeout(() => {
        window.letterAnimation.initializeAnimations();
      }, 500);
    }
  }
  forceComplete() {
    this.completeLoading();
  }
  setLoaderType(type) {
    if (type >= 1 && type <= 3) {
      this.pageLoader.classList.remove(
        "loader-option-1",
        "loader-option-2",
        "loader-option-3"
      );
      this.pageLoader.classList.add(`loader-option-${type}`);
      this.currentLoaderType = type;
    }
  }
}
window.addEventListener("load", function () {
  const wanderLoader = new WanderWiseLoader();
  wanderLoader.init();
  window.wanderLoader = wanderLoader;
  window.completeLoading = () => wanderLoader.forceComplete();
});
const WanderWiseLoadingUtils = {
  show() {
    const pageLoader = document.getElementById("pageLoader");
    if (pageLoader) {
      pageLoader.style.display = "flex";
      pageLoader.classList.remove("fade-out");
      document.body.style.overflow = "hidden";
      document.body.classList.add("fade");
    }
  },
  hide() {
    if (window.wanderLoader) {
      window.wanderLoader.hideLoadingScreen();
    }
  },
  setText(text) {
    const loaderText = document.querySelector(".loader-text");
    if (loaderText) {
      loaderText.textContent = text;
    }
  },
  setMessage(message) {
    const loaderMessage = document.querySelector(".loader-message");
    if (loaderMessage) {
      loaderMessage.textContent = message;
    }
  },
  setLoaderType(type) {
    if (window.wanderLoader) {
      window.wanderLoader.setLoaderType(type);
    }
  },
};
window.WanderWiseLoadingUtils = WanderWiseLoadingUtils;
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    document.body.classList.remove("fade");
    document.body.classList.add("page-loaded");
  }, 100);
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const logo = document.querySelector(".logo");
  const ctaButtons = document.querySelectorAll(".btn");
  function handleSmoothTransition(element, targetUrl) {
    element.addEventListener("click", function (e) {
      if (targetUrl && targetUrl.startsWith("#")) {
        e.preventDefault();
        const main = document.querySelector("main") || document.body;
        main.style.opacity = "0.7";
        main.style.transform = "translateY(10px)";
        setTimeout(() => {
          const targetSection = document.querySelector(targetUrl);
          if (targetSection) {
            targetSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
          main.style.opacity = "1";
          main.style.transform = "translateY(0)";
        }, 200);
      }
    });
  }
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    handleSmoothTransition(link, href);
  });
  ctaButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.02)";
      this.style.transition = "all 0.3s ease";
    });
    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
  const sections = document.querySelectorAll("section");
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-transition", "visible");
        const children = entry.target.querySelectorAll(
          ".animate-text, .popular-card, .package-card, .gallery-item"
        );
        children.forEach((child, index) => {
          setTimeout(() => {
            child.style.animationPlayState = "running";
            child.style.opacity = "1";
            child.style.transform = "translateY(0)";
          }, index * 100);
        });
      }
    });
  }, observerOptions);
  sections.forEach((section) => {
    section.classList.add("section-transition");
    sectionObserver.observe(section);
  });
});
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
    }
  });
}, observerOptions);
document.addEventListener("DOMContentLoaded", function () {
  const animatedSections = document.querySelectorAll(".section-animate");
  animatedSections.forEach((section) => {
    sectionObserver.observe(section);
  });
});
const textObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const animatedTexts = entry.target.querySelectorAll(
          ".animate-text, .animate-slide-left, .animate-slide-right, .animate-from-top"
        );
        animatedTexts.forEach((text, index) => {
          setTimeout(() => {
            text.style.animationPlayState = "running";
          }, index * 100);
        });
      }
    });
  },
  { threshold: 0.1 }
);
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    textObserver.observe(section);
  });
});
const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const navElemArr = [navOpenBtn, navCloseBtn, overlay];
const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
};
navToggleEvent(navElemArr);
navToggleEvent(navLinks);
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      navbar.classList.remove("active");
      overlay.classList.remove("active");
    }
  });
});
const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");
window.addEventListener("scroll", function () {
  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
      this.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
    });
    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "none";
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".popular-card, .package-card");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
      this.style.boxShadow = "0 20px 40px rgba(0,0,0,0.1)";
    });
    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 5px 15px rgba(0,0,0,0.08)";
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);
  themeToggle.addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    this.style.transform = "rotate(360deg)";
    setTimeout(() => {
      this.style.transform = "rotate(0deg)";
    }, 300);
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const chatBot = document.getElementById("chatBot");
  const phoneCall = document.getElementById("phoneCall");
  const newsletter = document.getElementById("newsletter");
  chatBot.addEventListener("click", function () {
    alert("Chat support will be available soon! 💬");
    this.style.animation = "bounce 0.5s";
    setTimeout(() => {
      this.style.animation = "";
    }, 500);
  });
  phoneCall.addEventListener("click", function () {
    window.location.href = "tel:+01123456790";
  });
  newsletter.addEventListener("click", function () {
    document.querySelector(".footer-form").scrollIntoView({
      behavior: "smooth",
    });
    const form = document.querySelector(".form-wrapper");
    form.style.boxShadow = "0 0 20px rgba(33, 150, 243, 0.5)";
    setTimeout(() => {
      form.style.boxShadow = "";
    }, 2000);
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
      }
    });
  }, observerOptions);
  const elementsToAnimate = document.querySelectorAll(
    ".popular-card, .package-card, .gallery-item, .footer-brand, .footer-contact, .footer-form"
  );
  elementsToAnimate.forEach((el) => {
    observer.observe(el);
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      form.style.opacity = "0.5";
      form.style.transform = "scale(0.98)";
      form.style.transition = "all 0.3s ease";
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Processing...";
      submitBtn.style.opacity = "0.7";
      submitBtn.disabled = true;
      setTimeout(() => {
        form.style.opacity = "1";
        form.style.transform = "scale(1)";
        submitBtn.textContent = "Success! ✓";
        submitBtn.style.background = "#4CAF50";
        submitBtn.style.opacity = "1";
        setTimeout(() => {
          form.style.opacity = "0.8";
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.opacity = "1";
            submitBtn.style.background = "";
            submitBtn.disabled = false;
            form.style.opacity = "1";
            form.style.transform = "scale(1)";
            this.reset();
          }, 300);
        }, 2000);
      }, 1500);
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.animation = "imageLoad 0.6s ease forwards";
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const sections = document.querySelectorAll("section[id]");
  function highlightNavLink() {
    let currentSection = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 150) {
        currentSection = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  }
  window.addEventListener("scroll", highlightNavLink);
});
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img[src]");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add("loaded");
        imageObserver.unobserve(img);
      }
    });
  });
  images.forEach((img) => {
    imageObserver.observe(img);
  });
});
class LetterAnimation {
  constructor() {
    this.initializeAnimations();
    this.setupIntersectionObserver();
  }
  initializeAnimations() {
    this.animateText(".hero-title", "letter-animate");
    this.setupScrollAnimations();
  }
  animateText(selector, animationClass = "letter-animate", delay = 0) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, elementIndex) => {
      if (element.classList.contains("letter-animated")) return;
      const text = element.textContent.trim();
      element.textContent = "";
      element.classList.add(animationClass);
      text.split("").forEach((char, charIndex) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.className = "letter";
        span.style.setProperty("--i", charIndex + elementIndex * 10);
        if (char === " ") {
          span.style.minWidth = "0.3em";
        }
        element.appendChild(span);
      });
      element.classList.add("letter-animated");
      setTimeout(() => {
        element.classList.add("animation-complete");
      }, text.length * 80 + 500 + delay);
    });
  }
  animateTextWithEffect(selector, effect = "fadeUp") {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      if (element.classList.contains("letter-animated")) return;
      const text = element.textContent.trim();
      element.textContent = "";
      element.classList.add("letter-animate");
      if (effect !== "fadeUp") {
        element.classList.add(`letter-${effect}`);
      }
      text.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.className = "letter";
        span.style.setProperty("--i", index);
        if (/[A-Z]/.test(char)) {
          span.classList.add("letter-capital");
        }
        if (/[!?.]/.test(char)) {
          span.classList.add("letter-punctuation");
        }
        element.appendChild(span);
      });
      element.classList.add("letter-animated");
    });
  }
  setupScrollAnimations() {
    const animationTargets = [
      { selector: ".section-title", effect: "glow", delay: 200 },
      { selector: ".card-title", effect: "slide", delay: 300 },
      { selector: ".section-subtitle", effect: "premium", delay: 100 },
    ];
    animationTargets.forEach((target) => {
      const elements = document.querySelectorAll(target.selector);
      elements.forEach((element) => {
        element.setAttribute("data-letter-effect", target.effect);
        element.setAttribute("data-letter-delay", target.delay);
      });
    });
  }
  setupIntersectionObserver() {
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !entry.target.classList.contains("letter-animated")
          ) {
            const effect =
              entry.target.getAttribute("data-letter-effect") || "fadeUp";
            const delay =
              parseInt(entry.target.getAttribute("data-letter-delay")) || 0;
            setTimeout(() => {
              this.animateTextWithEffect(
                `#${entry.target.id || entry.target.className}`,
                effect
              );
            }, delay);
            animationObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px",
      }
    );
    const observeSelectors = [
      ".section-title:not(.hero-title)",
      ".card-title",
      ".section-subtitle",
    ];
    observeSelectors.forEach((selector) => {
      document.querySelectorAll(selector).forEach((element) => {
        animationObserver.observe(element);
      });
    });
  }
  triggerAnimation(selector, effect = "fadeUp", delay = 0) {
    setTimeout(() => {
      this.animateTextWithEffect(selector, effect);
    }, delay);
  }
  setupHoverAnimations() {
    const hoverElements = document.querySelectorAll(".navbar-link, .btn");
    hoverElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        if (!element.classList.contains("letter-animated")) {
          this.animateText(element, "letter-animate");
        }
      });
    });
  }
  resetAnimation(selector) {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      if (element.classList.contains("letter-animated")) {
        const originalText = Array.from(element.children)
          .map((span) => span.textContent)
          .join("");
        element.textContent = originalText;
        element.classList.remove(
          "letter-animated",
          "letter-animate",
          "animation-complete"
        );
        setTimeout(() => {
          this.animateText(selector);
        }, 100);
      }
    });
  }
}
document.addEventListener("DOMContentLoaded", () => {
  window.letterAnimation = new LetterAnimation();
  window.animateText = (selector, effect = "fadeUp", delay = 0) => {
    window.letterAnimation.triggerAnimation(selector, effect, delay);
  };
  setTimeout(() => {
    window.letterAnimation.setupHoverAnimations();
  }, 2000);
});
window.addEventListener("load", () => {
  setTimeout(() => {
    window.letterAnimation.animateTextWithEffect(
      ".package-card .card-title",
      "slide"
    );
    window.letterAnimation.animateTextWithEffect(
      ".popular-card .card-title",
      "glow"
    );
  }, 1000);
});
function addLetterAnimation(element, effect = "fadeUp") {
  if (window.letterAnimation) {
    window.letterAnimation.triggerAnimation(element, effect);
  }
}
function restartAllAnimations() {
  if (window.letterAnimation) {
    const selectors = [".hero-title", ".section-title", ".card-title"];
    selectors.forEach((selector) => {
      window.letterAnimation.resetAnimation(selector);
    });
  }
}

// Emergency fallback to ensure page is visible
setTimeout(() => {
  document.body.classList.remove("fade");
  document.body.classList.add("page-loaded");
  const pageLoader = document.getElementById("pageLoader");
  if (pageLoader) {
    pageLoader.style.display = "none";
  }
}, 1000);
