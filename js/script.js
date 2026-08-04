/* ======================================================
   Muskan Bai – AI Engineer Portfolio
   Main JavaScript
   ====================================================== */

/* ===== NAVBAR SCROLL EFFECT ===== */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

function closeMenu() {
  if (!hamburger || !navLinks) return;
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && navbar && !navbar.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ===== ACTIVE NAV LINK ===== */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ===== TYPING EFFECT (Hero) ===== */
const typedEl = document.getElementById('typed-text');
if (typedEl) {
  const roles = [
    'AI Engineer',
    'Machine Learning Developer',
    'Computer Vision Engineer',
    'NLP & LLM Specialist',
    'RAG Systems Builder',
    'Python Developer'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;

  const type = () => {
    const role = roles[roleIdx];

    if (deleting) {
      typedEl.textContent = role.slice(0, charIdx - 1);
      charIdx--;
    } else {
      typedEl.textContent = role.slice(0, charIdx + 1);
      charIdx++;
    }

    if (!deleting && charIdx === role.length) {
      deleting = true;
      setTimeout(type, 2200);
      return;
    }

    if (deleting && charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }

    setTimeout(type, deleting ? 55 : 95);
  };

  setTimeout(type, 700);
}

/* ===== SCROLL REVEAL ===== */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
if (revealEls.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach(el => observer.observe(el));
}

/* ===== AVATAR IMAGE FALLBACK ===== */
document.querySelectorAll('.avatar-img').forEach(img => {
  img.addEventListener('error', () => { img.style.display = 'none'; });
});

document.querySelectorAll('.about-photo-inner img, .cert-thumb img, .proj-thumb img').forEach(img => {
  img.addEventListener('error', () => { img.style.display = 'none'; });
});

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-btn');
    const original = btn.textContent;
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}
