// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '-50px' });

revealElements.forEach(el => revealObserver.observe(el));

// ===== NAV SCROLL EFFECT =====
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// ===== MOBILE NAV =====
const navToggle = document.querySelector('.nav-toggle');
const mobileNav = document.querySelector('.mobile-nav');
const mobileNavClose = document.querySelector('.mobile-nav-close');

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  mobileNavClose.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== SKILL BAR ANIMATION =====
const skillBars = document.querySelectorAll('.skill-bar-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.dataset.width;
      if (width) {
        entry.target.style.width = width + '%';
      }
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ===== PROGRESS BAR ANIMATION =====
const progressBars = document.querySelectorAll('.dash-progress-fill');
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const width = entry.target.dataset.width;
      if (width) {
        setTimeout(() => {
          entry.target.style.width = width + '%';
        }, 300);
      }
    }
  });
}, { threshold: 0.5 });

progressBars.forEach(bar => progressObserver.observe(bar));

// ===== CHART BAR ANIMATION =====
const chartBars = document.querySelectorAll('.css-bar');
const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const height = entry.target.dataset.height;
      if (height) {
        setTimeout(() => {
          entry.target.style.height = height + '%';
        }, 200);
      }
    }
  });
}, { threshold: 0.3 });

chartBars.forEach(bar => chartObserver.observe(bar));

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<div class="spinner"></div> Sending...';

    if (formError) formError.style.display = 'none';

    const formData = new FormData(contactForm);
    const data = {
      access_key: 'e556db48-9042-4daa-9ee9-b294963e883f',
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      from_name: 'Portfolio Contact Form',
      botcheck: ''
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.success) {
        contactForm.style.display = 'none';
        formSuccess.style.display = 'block';
        contactForm.reset();
      } else {
        throw new Error('Submission failed');
      }
    } catch (err) {
      if (formError) {
        formError.style.display = 'flex';
        formError.querySelector('span').textContent = 'Failed to send message. Please try again.';
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}

// Reset form
window.resetForm = function() {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (contactForm && formSuccess) {
    contactForm.style.display = 'block';
    formSuccess.style.display = 'none';
    contactForm.reset();
  }
};

// ===== PARALLAX ORBS =====
const orbs = document.querySelectorAll('.hero-orb');
let mouseX = 0, mouseY = 0;
let orbX = 0, orbY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
  mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
});

function animateOrbs() {
  orbX += (mouseX - orbX) * 0.05;
  orbY += (mouseY - orbY) * 0.05;

  orbs.forEach((orb, i) => {
    const factor = (i + 1) * 0.5;
    orb.style.transform = `translate(${orbX * factor}px, ${orbY * factor}px)`;
  });

  requestAnimationFrame(animateOrbs);
}

if (orbs.length > 0) {
  animateOrbs();
}

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// ===== TYPING EFFECT (optional, for hero) =====
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

// Initialize typing on page load
document.addEventListener('DOMContentLoaded', () => {
  const typingElement = document.querySelector('.typing-effect');
  if (typingElement) {
    const text = typingElement.dataset.text;
    if (text) {
      setTimeout(() => typeWriter(typingElement, text, 60), 800);
    }
  }
});
