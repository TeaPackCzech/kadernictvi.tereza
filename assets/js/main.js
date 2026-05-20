const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("[data-section]")];
const reveals = [...document.querySelectorAll(".reveal")];
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.body.classList.add("reveal-ready");
document.querySelector("[data-year]").textContent = new Date().getFullYear();

const closeMenu = () => {
  navToggle.setAttribute("aria-expanded", "false");
  navMenu.classList.remove("is-open");
  document.body.classList.remove("nav-open");
};

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navMenu.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("nav-open", !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener("scroll", () => {
  header.classList.toggle("is-scrolled", window.scrollY > 28);
}, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

reveals.forEach((element) => {
  if (reduceMotion) {
    element.classList.add("is-visible");
  } else {
    revealObserver.observe(element);
  }
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
    });
  });
}, {
  rootMargin: "-42% 0px -50% 0px",
  threshold: 0
});

sections.forEach((section) => sectionObserver.observe(section));

const parallaxTarget = document.querySelector("[data-parallax]");
if (parallaxTarget && !reduceMotion) {
  window.addEventListener("scroll", () => {
    const offset = Math.min(window.scrollY * -0.035, 34);
    parallaxTarget.style.transform = `translate3d(0, ${offset}px, 0)`;
  }, { passive: true });
}

document.querySelectorAll(".tilt-card").forEach((card) => {
  if (reduceMotion) return;

  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-6px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

const filterButtons = [...document.querySelectorAll("[data-filter]")];
const galleryCards = [...document.querySelectorAll("[data-category]")];

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    galleryCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-img]");
const lightboxTitle = document.querySelector("[data-lightbox-title]");
const lightboxDesc = document.querySelector("[data-lightbox-desc]");
const lightboxClose = document.querySelector("[data-lightbox-close]");

const openLightbox = (card) => {
  const image = card.querySelector("img");
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxTitle.textContent = card.dataset.title;
  lightboxDesc.textContent = card.dataset.desc;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  lightboxClose.focus();
};

const closeLightbox = () => {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
};

galleryCards.forEach((card) => {
  card.addEventListener("click", () => openLightbox(card));
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
});

const baWidget = document.querySelector("[data-before-after]");
if (baWidget) {
  const range = baWidget.querySelector("[data-ba-range]");
  const after = baWidget.querySelector("[data-ba-after]");
  const handle = baWidget.querySelector("[data-ba-handle]");
  const afterImage = after.querySelector("img");

  const setBeforeAfter = (value) => {
    const safeValue = Math.max(6, Math.min(94, Number(value)));
    after.style.width = `${safeValue}%`;
    handle.style.left = `${safeValue}%`;
    afterImage.style.width = `${10000 / safeValue}%`;
  };

  range.addEventListener("input", (event) => setBeforeAfter(event.target.value));
  setBeforeAfter(range.value);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const target = entry.target;
    const end = Number(target.dataset.count);
    let current = 0;
    const steps = 28;
    const interval = window.setInterval(() => {
      current += 1;
      target.textContent = Math.round((end / steps) * current);
      if (current >= steps) {
        target.textContent = end;
        window.clearInterval(interval);
      }
    }, reduceMotion ? 1 : 28);

    countObserver.unobserve(target);
  });
});

document.querySelectorAll("[data-count]").forEach((counter) => countObserver.observe(counter));
