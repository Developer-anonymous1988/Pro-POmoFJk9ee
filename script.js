const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const typingEl = document.getElementById("typing");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const slider = document.querySelector(".slider");

let activeIndex = 0;
let autoplayTimer = null;
let typingTimer = null;

const AUTOPLAY_DELAY = 5000;
const TYPING_SPEED = 70;

function typeCaption(text) {
  clearTimeout(typingTimer);
  typingEl.textContent = "";
  let i = 0;

  const type = () => {
    if (i < text.length) {
      typingEl.textContent += text.charAt(i);
      i += 1;
      typingTimer = setTimeout(type, TYPING_SPEED);
    }
  };

  type();
}

function setActiveSlide(nextIndex) {
  if (!slides[nextIndex]) return;

  slides.forEach(slide => slide.classList.remove("active"));
  dots.forEach(dot => dot.classList.remove("active"));

  slides[nextIndex].classList.add("active");
  dots[nextIndex].classList.add("active");

  const caption = slides[nextIndex].dataset.caption || "";
  typeCaption(caption);
  activeIndex = nextIndex;
}

function goTo(delta) {
  const total = slides.length;
  const target = (activeIndex + delta + total) % total;
  setActiveSlide(target);
  restartAutoplay();
}

function startAutoplay() {
  autoplayTimer = setInterval(() => goTo(1), AUTOPLAY_DELAY);
}

function restartAutoplay() {
  clearInterval(autoplayTimer);
  startAutoplay();
}

function bindDots() {
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      setActiveSlide(index);
      restartAutoplay();
    });
  });
}

function init() {
  slides.forEach(imgWrap => {
    const img = imgWrap.querySelector("img");
    if (img) {
      img.loading = "lazy";
      img.decoding = "async";
      img.addEventListener("error", () =>
        console.error("Failed to load image:", img.src)
      );
    }
  });

  setActiveSlide(0);
  bindDots();
  startAutoplay();

  nextBtn.addEventListener("click", () => goTo(1));
  prevBtn.addEventListener("click", () => goTo(-1));

  document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") goTo(1);
    if (e.key === "ArrowLeft") goTo(-1);
  });

  slider.addEventListener("mouseenter", () => clearInterval(autoplayTimer));
  slider.addEventListener("mouseleave", restartAutoplay);
}

document.addEventListener("DOMContentLoaded", init);

const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggle");
const items = document.querySelectorAll(".sidebar li a");

/* Toggle Sidebar */
toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("closed");
});

/* Active Item + Ripple Effect */
items.forEach(item => {
  item.addEventListener("click", e => {
    e.preventDefault();

    // Active state
    document.querySelectorAll(".sidebar li")
      .forEach(li => li.classList.remove("active"));
    item.parentElement.classList.add("active");

    // Ripple - skip for Home and Company items
    const itemText = item.querySelector('span')?.textContent.trim();
    const isHome = itemText === 'Home';
    const isCompany = itemText === 'Company';
    const isNetworks = itemText === 'Networks';
    const isReviews = itemText === 'Reviews';
    const isAbout = itemText === 'About Us';
    const isContact = itemText === 'Contact Us';
    const isSupport = itemText === 'Support';

    // Home should jump to the first slide in the slideshow
    if (isHome) {
      setActiveSlide(0);
      restartAutoplay();
      return; // skip ripple logic
    }

    // Company should jump to the second slide in the slideshow
    if (isCompany) {
      setActiveSlide(1);
      restartAutoplay();
      return; // skip ripple logic and ripple effect
    }

    // Networks should jump to the third slide in the slideshow
    if (isNetworks) {
      setActiveSlide(2);
      restartAutoplay();
      return; // skip ripple logic and ripple effect
    }

    // Reviews should jump to the fourth slide in the slideshow
    if (isReviews) {
      setActiveSlide(3); // index 3 = 4th slide
      restartAutoplay();
      return; // skip ripple logic and ripple effect
    }

    // About Us should jump to the fifth slide in the slideshow
    if (isAbout) {
      setActiveSlide(4); // index 4 = 5th slide
      restartAutoplay();
      return; // skip ripple logic and ripple effect
    }

    // Contact Us should jump to the sixth slide in the slideshow
    if (isContact) {
      setActiveSlide(5); // index 5 = 6th slide
      restartAutoplay();
      return; // skip ripple logic and ripple effect
    }

    if (!isHome && !isCompany && !isNetworks && !isReviews && !isAbout && !isContact && !isSupport) {
      // place ripple where the user clicked
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      item.style.setProperty("--ripple-x", `${x}px`);
      item.style.setProperty("--ripple-y", `${y}px`);

      item.classList.remove("ripple");
      void item.offsetWidth; // reset animation
      item.classList.add("ripple");
    }
    
    // Support should jump to the seventh slide in the slideshow
    if (isSupport) {
      setActiveSlide(6); // index 6 = 7th slide
      restartAutoplay();
      return; // skip ripple logic and ripple effect
    }
  });
});









  



