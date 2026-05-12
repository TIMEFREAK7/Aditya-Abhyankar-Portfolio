/* ============================================
   ADITYA ABHYANKAR PORTFOLIO - INTERACTIONS
   OxygenOS 16 Fluid Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initCounters();
  initDashboards();
  initContactForm();
  initPageTransitions();
  initSkillBars();
  initParallax();
});

/* ---- Navigation ---- */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      mobileBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ---- Scroll Animations ---- */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');

        // Trigger dashboard animations if present
        if (entry.target.querySelector('.metric-ring-fill')) {
          animateDashboard(entry.target);
        }

        // Trigger skill bars if present
        if (entry.target.querySelector('.skill-bar-fill')) {
          animateSkillBars(entry.target);
        }

        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
  });
}

/* ---- Counter Animation ---- */
function initCounters() {
  const counters = document.querySelectorAll('.counter');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const prefix = counter.getAttribute('data-prefix') || '';
        const duration = parseInt(counter.getAttribute('data-duration')) || 2000;

        animateCounter(counter, target, prefix, suffix, duration);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target, prefix, suffix, duration) {
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease out expo
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeProgress * target);

    element.textContent = prefix + current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = prefix + target.toLocaleString() + suffix;
    }
  }

  requestAnimationFrame(update);
}

/* ---- Dashboard Animations ---- */
function initDashboards() {
  // Dashboards are animated when scrolled into view
}

function animateDashboard(container) {
  // Animate ring charts
  container.querySelectorAll('.metric-ring-fill').forEach((ring, index) => {
    const target = parseInt(ring.getAttribute('data-target')) || 0;
    const circumference = 2 * Math.PI * 25; // r=25
    const offset = circumference - (target / 100) * circumference;

    setTimeout(() => {
      ring.style.strokeDashoffset = offset;
    }, index * 150);
  });

  // Animate stat bars
  container.querySelectorAll('.stat-bar-fill').forEach((bar, index) => {
    const target = bar.getAttribute('data-width') || '0%';
    setTimeout(() => {
      bar.style.width = target;
    }, index * 100);
  });
}

/* ---- Skill Bars ---- */
function initSkillBars() {
  // Skill bars are animated when scrolled into view
}

function animateSkillBars(container) {
  container.querySelectorAll('.skill-bar-fill').forEach((bar, index) => {
    const target = bar.getAttribute('data-width') || '0%';
    setTimeout(() => {
      bar.style.width = target;
    }, index * 100);
  });
}

/* ---- Contact Form ---- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const statusDiv = document.getElementById('formStatus');
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="60">
          <animate attributeName="stroke-dashoffset" dur="1s" repeatCount="indefinite" from="60" to="0"/>
        </circle>
      </svg>
      Sending...
    `;

    const formData = new FormData(form);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        statusDiv.className = 'form-status success';
        statusDiv.textContent = '✓ Message sent successfully! I will get back to you soon.';
        form.reset();

        // Confetti effect
        createConfetti();
      } else {
        throw new Error(data.message || 'Something went wrong');
      }
    } catch (error) {
      statusDiv.className = 'form-status error';
      statusDiv.textContent = '✗ ' + error.message;
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;

      // Hide status after 5 seconds
      setTimeout(() => {
        statusDiv.style.display = 'none';
      }, 5000);
    }
  });
}

/* ---- Confetti Effect ---- */
function createConfetti() {
  const colors = ['#4f46e5', '#7c3aed', '#10b981', '#f59e0b', '#0ea5e9'];
  const container = document.body;

  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      left: ${Math.random() * 100}vw;
      top: -10px;
      z-index: 9999;
      pointer-events: none;
    `;

    container.appendChild(confetti);

    const duration = 2000 + Math.random() * 2000;
    const horizontalMovement = (Math.random() - 0.5) * 200;

    confetti.animate([
      { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
      { transform: `translateY(100vh) translateX(${horizontalMovement}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], {
      duration: duration,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => confetti.remove();
  }
}

/* ---- Page Transitions ---- */
function initPageTransitions() {
  document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';

        setTimeout(() => {
          window.location.href = href;
        }, 300);
      });
    }
  });

  // Fade in on load
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  });
}

/* ---- Parallax Effect ---- */
function initParallax() {
  const heroVisual = document.querySelector('.hero-visual');
  if (!heroVisual) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.15;
        heroVisual.style.transform = `translateY(${rate}px)`;
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ---- Smooth Scroll for Anchor Links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

/* ---- Magnetic Button Effect ---- */
document.querySelectorAll('.btn, .nav-cta').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ---- Typing Effect for Hero (optional enhancement) ---- */
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}
