"use strict";

/**
 * WanderWise Advanced Loading Manager with Multiple Animation Options
 */

class WanderWiseLoader {
  constructor() {
    this.pageLoader = document.getElementById("pageLoader");
    this.loaderPercentage = document.querySelector(".loader-percentage");
    this.loaderText = document.querySelector(".loader-text");
    this.loaderProgress = document.querySelector(".loader-progress");
    this.loaderParticles = document.getElementById("loaderParticles");
    this.minLoadingTime = 3000; // Minimum loading time
    this.startTime = Date.now();
    this.currentLoaderType = 1; // 1: Spinner, 2: Dots, 3: Progress Bar

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

  // Initialize the loading system
  init() {
    this.createParticles();
    this.startQuoteRotation();
    this.startMessageRotation();
    this.simulateProgress();
    this.waitForPageLoad();

    // Optional: Switch loader types every few seconds (demo)
    // this.setupLoaderSwitching();
  }

  // Create floating particles effect
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

  // Rotate adventure quotes
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

    // Store interval for cleanup
    this.quoteInterval = quoteInterval;
  }

  // Rotate loading messages
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

  // Simulate realistic loading progress
  simulateProgress() {
    let progress = 0;
    const progressInterval = setInterval(() => {
      // Realistic progress simulation with varying speeds
      const increment = Math.random() * 8 + 2;
      progress += increment;

      // Slow down near the end for realism
      if (progress > 85) {
        progress += Math.random() * 2;
      }

      if (progress > 98) {
        progress = 98; // Never quite reach 100% until actually ready
      }

      this.updateProgress(progress);

      if (progress >= 98) {
        clearInterval(progressInterval);
        this.progressInterval = null;
      }
    }, 150);

    this.progressInterval = progressInterval;
  }

  // Update progress display
  updateProgress(percent) {
    if (this.loaderProgress) {
      this.loaderProgress.style.width = percent + "%";
    }
    if (this.loaderPercentage) {
      this.loaderPercentage.textContent = Math.round(percent) + "%";
    }
  }

  // Wait for page load and minimum time
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

  // Switch between loader types (optional feature)
  setupLoaderSwitching() {
    const switchInterval = setInterval(() => {
      this.switchLoaderType();
    }, 4000);

    this.switchInterval = switchInterval;
  }

  // Switch to different loader animation
  switchLoaderType() {
    if (!this.pageLoader) return;

    // Remove current loader class
    this.pageLoader.classList.remove(
      "loader-option-1",
      "loader-option-2",
      "loader-option-3"
    );

    // Cycle to next loader type
    this.currentLoaderType = (this.currentLoaderType % 3) + 1;
    this.pageLoader.classList.add(`loader-option-${this.currentLoaderType}`);
  }

  // Complete the loading process
  completeLoading() {
    // Clear all intervals
    if (this.quoteInterval) clearInterval(this.quoteInterval);
    if (this.messageInterval) clearInterval(this.messageInterval);
    if (this.progressInterval) clearInterval(this.progressInterval);
    if (this.switchInterval) clearInterval(this.switchInterval);

    // Complete progress
    this.updateProgress(100);

    // Final quote
    if (this.loaderText) {
      this.loaderText.textContent = "Welcome to WanderWise!";
    }

    // Hide loading screen with enhanced transition
    setTimeout(() => {
      this.hideLoadingScreen();
    }, 800);
  }

  // Hide loading screen with smooth transition
  hideLoadingScreen() {
    if (!this.pageLoader) return;

    this.pageLoader.classList.add("fade-out");

    setTimeout(() => {
      this.pageLoader.remove();

      // Enable body interactions and trigger animations
      document.body.classList.add("loaded");
      document.body.classList.remove("fade");
      document.body.classList.add("page-loaded");
      document.body.style.overflow = "auto";

      // Trigger entrance animations
      this.triggerEntranceAnimations();
    }, 500);
  }

  // Trigger entrance animations for page elements
  triggerEntranceAnimations() {
    // Animate sections that are in view
    const sections = document.querySelectorAll(".section-animate");
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.classList.add("in-view");
      }, index * 200);
    });

    // Initialize letter animations
    if (window.letterAnimation) {
      setTimeout(() => {
        window.letterAnimation.initializeAnimations();
      }, 500);
    }
  }

  // Public method to manually complete loading
  forceComplete() {
    this.completeLoading();
  }

  // Public method to switch loader type manually
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

// Initialize the enhanced loading system
window.addEventListener("load", function () {
  const wanderLoader = new WanderWiseLoader();
  wanderLoader.init();

  // Make loader available globally for manual control
  window.wanderLoader = wanderLoader;

  // Legacy support
  window.completeLoading = () => wanderLoader.forceComplete();
});

// Loading utilities for programmatic control
const WanderWiseLoadingUtils = {
  // Show loading screen
  show() {
    const pageLoader = document.getElementById("pageLoader");
    if (pageLoader) {
      pageLoader.style.display = "flex";
      pageLoader.classList.remove("fade-out");
      document.body.style.overflow = "hidden";
      document.body.classList.add("fade");
    }
  },

  // Hide loading screen
  hide() {
    if (window.wanderLoader) {
      window.wanderLoader.hideLoadingScreen();
    }
  },

  // Set custom loading text
  setText(text) {
    const loaderText = document.querySelector(".loader-text");
    if (loaderText) {
      loaderText.textContent = text;
    }
  },

  // Set custom loading message
  setMessage(message) {
    const loaderMessage = document.querySelector(".loader-message");
    if (loaderMessage) {
      loaderMessage.textContent = message;
    }
  },

  // Switch loader animation type
  setLoaderType(type) {
    if (window.wanderLoader) {
      window.wanderLoader.setLoaderType(type);
    }
  },
};

// Make utilities available globally
window.WanderWiseLoadingUtils = WanderWiseLoadingUtils;

/**
 * Page Fade Transition System
 */

document.addEventListener("DOMContentLoaded", function () {
  // Remove the 'fade' class once the page content has loaded
  setTimeout(() => {
    document.body.classList.remove("fade");
    document.body.classList.add("page-loaded");
  }, 100);

  // Add fade-out transition for navigation links
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const logo = document.querySelector(".logo");
  const ctaButtons = document.querySelectorAll(".btn");

  // Function to handle smooth transitions
  function handleSmoothTransition(element, targetUrl) {
    element.addEventListener("click", function (e) {
      // Only apply to hash links (internal navigation)
      if (targetUrl && targetUrl.startsWith("#")) {
        e.preventDefault();

        // Add fade effect to main content
        const main = document.querySelector("main") || document.body;
        main.style.opacity = "0.7";
        main.style.transform = "translateY(10px)";

        // Navigate to section after brief delay
        setTimeout(() => {
          const targetSection = document.querySelector(targetUrl);
          if (targetSection) {
            targetSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }

          // Restore opacity
          main.style.opacity = "1";
          main.style.transform = "translateY(0)";
        }, 200);
      }
    });
  }

  // Apply smooth transitions to navigation links
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    handleSmoothTransition(link, href);
  });

  // Add subtle fade effect for button interactions
  ctaButtons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.02)";
      this.style.transition = "all 0.3s ease";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Enhanced section transitions
  const sections = document.querySelectorAll("section");
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-transition", "visible");

        // Add staggered animation for child elements
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

/**
 * Intersection Observer for Section Animations
 */

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

// Observe all sections with section-animate class
document.addEventListener("DOMContentLoaded", function () {
  const animatedSections = document.querySelectorAll(".section-animate");
  animatedSections.forEach((section) => {
    sectionObserver.observe(section);
  });
});

/**
 * Text Animation Trigger
 */

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

/**
 * navbar toggle
 */

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

/**
 * Smooth scroll for navigation links with animation
 */

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      // Add smooth scroll behavior
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Close mobile menu if open
      navbar.classList.remove("active");
      overlay.classList.remove("active");
    }
  });
});

/**
 * header sticky & go to top
 */

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

/**
 * Parallax Effect for Hero Section
 */

window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");

  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

/**
 * Button Hover Effects
 */

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

/**
 * Card Hover Animations
 */

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

/**
 * Dark Mode Toggle
 */

document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("themeToggle");
  const currentTheme = localStorage.getItem("theme") || "light";

  document.documentElement.setAttribute("data-theme", currentTheme);

  themeToggle.addEventListener("click", function () {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Add a subtle animation
    this.style.transform = "rotate(360deg)";
    setTimeout(() => {
      this.style.transform = "rotate(0deg)";
    }, 300);
  });
});

/**
 * Floating Action Buttons
 */

document.addEventListener("DOMContentLoaded", function () {
  const chatBot = document.getElementById("chatBot");
  const phoneCall = document.getElementById("phoneCall");
  const newsletter = document.getElementById("newsletter");

  chatBot.addEventListener("click", function () {
    // Simulate chat opening
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

    // Highlight the newsletter form
    const form = document.querySelector(".form-wrapper");
    form.style.boxShadow = "0 0 20px rgba(33, 150, 243, 0.5)";
    setTimeout(() => {
      form.style.boxShadow = "";
    }, 2000);
  });
});

/**
 * Enhanced Scroll Animations
 */

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

  // Observe all cards and important elements
  const elementsToAnimate = document.querySelectorAll(
    ".popular-card, .package-card, .gallery-item, .footer-brand, .footer-contact, .footer-form"
  );

  elementsToAnimate.forEach((el) => {
    observer.observe(el);
  });
});

/**
 * Enhanced Form Enhancement with Fade Transitions
 */

document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Add fade transition to form
      form.style.opacity = "0.5";
      form.style.transform = "scale(0.98)";
      form.style.transition = "all 0.3s ease";

      // Add loading state to submit button
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Processing...";
      submitBtn.style.opacity = "0.7";
      submitBtn.disabled = true;

      // Simulate form submission with fade effects
      setTimeout(() => {
        // Success state with fade-in
        form.style.opacity = "1";
        form.style.transform = "scale(1)";

        submitBtn.textContent = "Success! ✓";
        submitBtn.style.background = "#4CAF50";
        submitBtn.style.opacity = "1";

        setTimeout(() => {
          // Reset with fade transition
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

/**
 * Smooth Reveal Animation for Images
 */

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.animation = "imageLoad 0.6s ease forwards";
    });
  });
});

/**
 * Enhanced Navigation with Active States
 */

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

/**
 * Performance Optimization - Lazy Loading
 */

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

/**
 * Letter-by-Letter Text Animation
 */

class LetterAnimation {
  constructor() {
    this.initializeAnimations();
    this.setupIntersectionObserver();
  }

  // Main initialization function
  initializeAnimations() {
    // Animate hero title immediately
    this.animateText(".hero-title", "letter-animate");

    // Set up other animations to trigger on scroll
    this.setupScrollAnimations();
  }

  // Core function to split text into animated letters
  animateText(selector, animationClass = "letter-animate", delay = 0) {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element, elementIndex) => {
      // Skip if already animated
      if (element.classList.contains("letter-animated")) return;

      const text = element.textContent.trim();
      element.textContent = "";
      element.classList.add(animationClass);

      // Create letter spans with staggered animation
      text.split("").forEach((char, charIndex) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char; // Preserve spaces
        span.className = "letter";
        span.style.setProperty("--i", charIndex + elementIndex * 10);

        // Add space handling
        if (char === " ") {
          span.style.minWidth = "0.3em";
        }

        element.appendChild(span);
      });

      // Mark as animated
      element.classList.add("letter-animated");

      // Add completion callback
      setTimeout(() => {
        element.classList.add("animation-complete");
      }, text.length * 80 + 500 + delay);
    });
  }

  // Enhanced animation with different effects
  animateTextWithEffect(selector, effect = "fadeUp") {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element) => {
      if (element.classList.contains("letter-animated")) return;

      const text = element.textContent.trim();
      element.textContent = "";

      // Add effect-specific classes
      element.classList.add("letter-animate");
      if (effect !== "fadeUp") {
        element.classList.add(`letter-${effect}`);
      }

      text.split("").forEach((char, index) => {
        const span = document.createElement("span");
        span.textContent = char === " " ? "\u00A0" : char;
        span.className = "letter";
        span.style.setProperty("--i", index);

        // Add special effects based on character type
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

  // Setup scroll-triggered animations
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

  // Intersection Observer for scroll-triggered animations
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

    // Observe elements that should animate on scroll
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

  // Public method to manually trigger animation
  triggerAnimation(selector, effect = "fadeUp", delay = 0) {
    setTimeout(() => {
      this.animateTextWithEffect(selector, effect);
    }, delay);
  }

  // Method to animate text on hover
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

  // Reset animation (useful for re-triggering)
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

        // Re-trigger animation
        setTimeout(() => {
          this.animateText(selector);
        }, 100);
      }
    });
  }
}

// Initialize letter animations when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.letterAnimation = new LetterAnimation();

  // Add global animation triggers
  window.animateText = (selector, effect = "fadeUp", delay = 0) => {
    window.letterAnimation.triggerAnimation(selector, effect, delay);
  };

  // Setup hover animations after a short delay
  setTimeout(() => {
    window.letterAnimation.setupHoverAnimations();
  }, 2000);
});

// Additional animation triggers for dynamic content
window.addEventListener("load", () => {
  // Animate any remaining elements that might have loaded late
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

/**
 * Enhanced Letter Animation Utils
 */

// Utility function to add letter animation to new elements
function addLetterAnimation(element, effect = "fadeUp") {
  if (window.letterAnimation) {
    window.letterAnimation.triggerAnimation(element, effect);
  }
}

// Utility to restart all animations (for demo purposes)
function restartAllAnimations() {
  if (window.letterAnimation) {
    const selectors = [".hero-title", ".section-title", ".card-title"];
    selectors.forEach((selector) => {
      window.letterAnimation.resetAnimation(selector);
    });
  }
}

/*-----------------------------------*\
 * #IMAGE HOVER EFFECTS MANAGER
\*-----------------------------------*/

class ImageHoverEffects {
  constructor() {
    this.init();
  }

  init() {
    this.setupParallaxEffects();
    this.setupImageSwapEffects();
    this.setupAdvancedHoverTriggers();
    this.setupDynamicOverlays();
  }

  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-hover');
    
    parallaxElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / centerY * 5;
        const rotateY = (centerX - x) / centerX * 5;
        
        const bgLayer = element.querySelector('.parallax-bg, .wander-hover-image');
        const contentLayer = element.querySelector('.parallax-content, .card-content');
        
        if (bgLayer) {
          bgLayer.style.transform = `translate3d(${(x - centerX) / 10}px, ${(y - centerY) / 10}px, 0) scale(1.05)`;
        }
        
        if (contentLayer) {
          contentLayer.style.transform = `translate3d(${(x - centerX) / 20}px, ${(y - centerY) / 20}px, 0)`;
        }
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      
      element.addEventListener('mouseleave', () => {
        const bgLayer = element.querySelector('.parallax-bg, .wander-hover-image');
        const contentLayer = element.querySelector('.parallax-content, .card-content');
        
        if (bgLayer) {
          bgLayer.style.transform = '';
        }
        
        if (contentLayer) {
          contentLayer.style.transform = '';
        }
        
        element.style.transform = '';
      });
    });
  }

  setupImageSwapEffects() {
    const swapContainers = document.querySelectorAll('.image-swap-container');
    
    swapContainers.forEach(container => {
      const frontImg = container.querySelector('.image-front');
      const backImg = container.querySelector('.image-back');
      
      if (frontImg && !backImg) {
        // Create dynamic back image
        const newBackImg = frontImg.cloneNode(true);
        newBackImg.classList.remove('image-front');
        newBackImg.classList.add('image-back', 'swap-image');
        
        // Apply filter to back image for different effect
        newBackImg.style.filter = 'sepia(100%) hue-rotate(200deg) saturate(150%)';
        
        container.appendChild(newBackImg);
      }
    });
  }

  setupAdvancedHoverTriggers() {
    // Add hover sound effects (optional)
    const hoverElements = document.querySelectorAll('.wander-image-container, .popular-card, .package-card');
    
    hoverElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        // Add subtle animation class
        element.style.transform = 'translateY(-2px)';
        element.style.boxShadow = '0 10px 30px rgba(32, 178, 255, 0.2)';
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = '';
        element.style.boxShadow = '';
      });
    });
  }

  setupDynamicOverlays() {
    const overlayElements = document.querySelectorAll('.image-overlay-effect');
    
    overlayElements.forEach(element => {
      const overlay = element.querySelector('.adventure-overlay');
      if (!overlay) {
        // Create dynamic overlay
        const newOverlay = document.createElement('div');
        newOverlay.className = 'adventure-overlay';
        newOverlay.innerHTML = `
          <div class="overlay-title">Explore</div>
          <div class="overlay-text">Discover Amazing Places</div>
          <button class="overlay-button">Learn More</button>
        `;
        element.appendChild(newOverlay);
      }
    });
  }
}

/*-----------------------------------*\
 * #ENHANCED GALLERY SYSTEM
\*-----------------------------------*/

class EnhancedGallery {
  constructor() {
    this.currentImageIndex = 0;
    this.images = [];
    this.init();
  }

  init() {
    this.setupGalleryHovers();
    this.createImagePreloader();
    this.setupLightboxEffect();
  }

  setupGalleryHovers() {
    const galleryImages = document.querySelectorAll('.gallery .gallery-item img, .popular-card img, .package-card img');
    
    galleryImages.forEach((img, index) => {
      this.images.push(img.src);
      
      // Wrap image in container if not already wrapped
      if (!img.closest('.wander-image-container')) {
        const container = document.createElement('div');
        container.className = 'wander-image-container scale-rotate';
        img.parentNode.insertBefore(container, img);
        container.appendChild(img);
        img.className += ' wander-hover-image';
      }
      
      // Add click functionality for lightbox
      img.addEventListener('click', (e) => {
        e.preventDefault();
        this.openLightbox(index);
      });
    });
  }

  createImagePreloader() {
    // Preload images for smooth transitions
    this.images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  openLightbox(index) {
    this.currentImageIndex = index;
    
    // Create lightbox if it doesn't exist
    let lightbox = document.getElementById('wander-lightbox');
    if (!lightbox) {
      lightbox = document.createElement('div');
      lightbox.id = 'wander-lightbox';
      lightbox.className = 'wander-lightbox';
      lightbox.innerHTML = `
        <div class="lightbox-content">
          <span class="lightbox-close">&times;</span>
          <img class="lightbox-image" src="" alt="">
          <div class="lightbox-nav">
            <button class="lightbox-prev">&#10094;</button>
            <button class="lightbox-next">&#10095;</button>
          </div>
        </div>
      `;
      document.body.appendChild(lightbox);
      
      // Add event listeners
      lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.closeLightbox());
      lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.prevImage());
      lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.nextImage());
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) this.closeLightbox();
      });
    }
    
    // Show current image
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    lightboxImg.src = this.images[index];
    lightbox.style.display = 'flex';
    
    // Add CSS for lightbox
    this.addLightboxStyles();
  }

  closeLightbox() {
    const lightbox = document.getElementById('wander-lightbox');
    if (lightbox) {
      lightbox.style.display = 'none';
    }
  }

  nextImage() {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    const lightboxImg = document.querySelector('.lightbox-image');
    lightboxImg.src = this.images[this.currentImageIndex];
  }

  prevImage() {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    const lightboxImg = document.querySelector('.lightbox-image');
    lightboxImg.src = this.images[this.currentImageIndex];
  }

  addLightboxStyles() {
    if (!document.getElementById('lightbox-styles')) {
      const styles = document.createElement('style');
      styles.id = 'lightbox-styles';
      styles.textContent = `
        .wander-lightbox {
          display: none;
          position: fixed;
          z-index: 9999;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.9);
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.3s ease;
        }
        
        .lightbox-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
        }
        
        .lightbox-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 10px;
        }
        
        .lightbox-close {
          position: absolute;
          top: -40px;
          right: 0;
          color: white;
          font-size: 30px;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }
        
        .lightbox-close:hover {
          opacity: 0.7;
        }
        
        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          display: flex;
          justify-content: space-between;
          pointer-events: none;
        }
        
        .lightbox-prev, .lightbox-next {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: none;
          padding: 10px 15px;
          cursor: pointer;
          font-size: 18px;
          border-radius: 5px;
          pointer-events: auto;
          transition: background 0.3s ease;
        }
        
        .lightbox-prev:hover, .lightbox-next:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `;
      document.head.appendChild(styles);
    }
  }
}

/*-----------------------------------*\
 * #DYNAMIC CARD ENHANCEMENTS
\*-----------------------------------*/

class DynamicCardEnhancements {
  constructor() {
    this.init();
  }

  init() {
    this.enhancePopularCards();
    this.enhancePackageCards();
    this.addInteractiveElements();
  }

  enhancePopularCards() {
    const popularCards = document.querySelectorAll('.popular-card');
    
    popularCards.forEach(card => {
      const img = card.querySelector('img');
      if (img && !img.closest('.wander-image-container')) {
        const container = document.createElement('div');
        container.className = 'wander-image-container scale-rotate';
        img.parentNode.insertBefore(container, img);
        container.appendChild(img);
        img.className += ' wander-hover-image';
      }
      
      // Add floating elements on hover
      card.addEventListener('mouseenter', () => {
        this.createFloatingElements(card);
      });
      
      card.addEventListener('mouseleave', () => {
        this.removeFloatingElements(card);
      });
    });
  }

  enhancePackageCards() {
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
      const banner = card.querySelector('.card-banner');
      if (banner && !banner.classList.contains('image-overlay-effect')) {
        banner.classList.add('image-overlay-effect');
        
        // Add overlay if not exists
        if (!banner.querySelector('.adventure-overlay')) {
          const overlay = document.createElement('div');
          overlay.className = 'adventure-overlay';
          
          const title = card.querySelector('.card-title')?.textContent || 'Explore';
          const price = card.querySelector('.card-price')?.textContent || 'Great Deal';
          
          overlay.innerHTML = `
            <div class="overlay-title">${title}</div>
            <div class="overlay-text">${price}</div>
            <button class="overlay-button">Book Now</button>
          `;
          banner.appendChild(overlay);
        }
      }
    });
  }

  createFloatingElements(card) {
    // Create floating particles around the card
    for (let i = 0; i < 3; i++) {
      const particle = document.createElement('div');
      particle.className = 'floating-particle';
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, var(--wanderwise-primary), var(--wanderwise-secondary));
        border-radius: 50%;
        pointer-events: none;
        z-index: 10;
        animation: float${i + 1} 2s ease-in-out infinite;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
      `;
      card.style.position = 'relative';
      card.appendChild(particle);
    }
    
    // Add floating animation styles
    this.addFloatingStyles();
  }

  removeFloatingElements(card) {
    const particles = card.querySelectorAll('.floating-particle');
    particles.forEach(particle => {
      particle.remove();
    });
  }

  addFloatingStyles() {
    if (!document.getElementById('floating-styles')) {
      const styles = document.createElement('style');
      styles.id = 'floating-styles';
      styles.textContent = `
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
        
        @keyframes float2 {
          0%, 100% { transform: translateX(0px) rotate(0deg); opacity: 0; }
          50% { transform: translateX(15px) rotate(270deg); opacity: 1; }
        }
        
        @keyframes float3 {
          0%, 100% { transform: translate(0px, 0px) rotate(0deg); opacity: 0; }
          50% { transform: translate(-10px, -15px) rotate(360deg); opacity: 1; }
        }
      `;
      document.head.appendChild(styles);
    }
  }

  addInteractiveElements() {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, .overlay-button, .card-btn');
    
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
      });
    });
    
    // Add ripple animation
    this.addRippleStyles();
  }

  addRippleStyles() {
    if (!document.getElementById('ripple-styles')) {
      const styles = document.createElement('style');
      styles.id = 'ripple-styles';
      styles.textContent = `
        @keyframes ripple {
          to {
            transform: scale(2);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(styles);
    }
  }
}

// Initialize image hover effects when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Wait for other systems to initialize first
  setTimeout(() => {
    new ImageHoverEffects();
    new EnhancedGallery();
    new DynamicCardEnhancements();
  }, 500);
});
