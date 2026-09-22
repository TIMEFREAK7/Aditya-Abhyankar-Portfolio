/* ============================================
   ADITYA ABHYANKAR PORTFOLIO v2 - INTERACTIONS
   Dark Mode | Modals | Charts | Fluid Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initNavigation();
  initScrollAnimations();
  initCounters();
  initContactForm();
  initModals();
  initCharts();
  initGanttChart();
  initProjectFilters();
  initReadMore();
});

/* ---- Dark Mode ---- */
function initDarkMode() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    toggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      toggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      toggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
  });
}

/* ---- Navigation ---- */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      mobileBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileBtn.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

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
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        if (entry.target.querySelector('.metric-ring-fill')) animateDashboard(entry.target);
        if (entry.target.querySelector('.skill-bar-fill')) animateSkillBars(entry.target);
        if (entry.target.querySelector('canvas')) initChartsInContainer(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => observer.observe(el));
}

/* ---- Counters ---- */
function initCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const prefix = counter.getAttribute('data-prefix') || '';
        const duration = parseInt(counter.getAttribute('data-duration')) || 1200;
        animateCounter(counter, target, prefix, suffix, duration);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(counter => observer.observe(counter));
}

function animateCounter(element, target, prefix, suffix, duration) {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeProgress * target);
    element.textContent = prefix + current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
    else element.textContent = prefix + target.toLocaleString() + suffix;
  }
  requestAnimationFrame(update);
}

/* ---- Dashboard Animations ---- */
function animateDashboard(container) {
  container.querySelectorAll('.metric-ring-fill').forEach((ring, index) => {
    const target = parseInt(ring.getAttribute('data-target')) || 0;
    const circumference = 2 * Math.PI * 30;
    const offset = circumference - (target / 100) * circumference;
    setTimeout(() => { ring.style.strokeDashoffset = offset; }, index * 80);
  });
}

/* ---- Skill Bars ---- */
function animateSkillBars(container) {
  container.querySelectorAll('.skill-bar-fill').forEach((bar, index) => {
    const target = bar.getAttribute('data-width') || '0%';
    setTimeout(() => { bar.style.width = target; }, index * 60);
  });
}

/* ---- Modals ---- */
function initModals() {
  document.querySelectorAll('[data-modal]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modalId = trigger.getAttribute('data-modal');
      openModal(modalId);
    });
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(trigger.getAttribute('data-modal'));
      }
    });
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-overlay');
      if (modal) closeModal(modal.id);
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => closeModal(m.id));
      return;
    }
    if (e.key === 'Tab') trapFocus(e);
  });
}

/* ---- Project Filters ---- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');
  if (filterBtns.length === 0 || cards.length === 0) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      cards.forEach((card) => {
        const matches = filter === 'all' || card.getAttribute('data-category') === filter;
        card.classList.toggle('filtered-out', !matches);
      });
    });
  });
}

/* ---- Read More (testimonial quotes) ---- */
function initReadMore() {
  document.querySelectorAll('.read-more-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const quote = btn.previousElementSibling;
      const expanded = quote.classList.toggle('expanded');
      btn.textContent = expanded ? 'Read less' : 'Read more';
    });
  });
}

let lastFocusedElement = null;

function getFocusableElements(modal) {
  return Array.from(
    modal.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')
  ).filter(el => !el.disabled && el.offsetParent !== null);
}

function trapFocus(e) {
  const modal = document.querySelector('.modal-overlay.active');
  if (!modal) return;
  const focusable = getFocusableElements(modal);
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    lastFocusedElement = document.activeElement;
    document.body.style.overflow = 'hidden';
    modal.classList.add('active');
    const content = modal.querySelector('.modal-content');
    if (content) {
      content.scrollTop = 0;
      content.style.overflowY = 'auto';
    }
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    if (lastFocusedElement) {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }
}

/* ---- Charts (Chart.js) ---- */
function initCharts() {
  if (typeof Chart === 'undefined') return;
  document.querySelectorAll('.chart-container').forEach(container => {
    initChartsInContainer(container);
  });
}

function initChartsInContainer(container) {
  const canvas = container.querySelector('canvas');
  if (!canvas || canvas.dataset.chartInitialized) return;
  canvas.dataset.chartInitialized = 'true';

  const type = canvas.dataset.type || 'bar';
  const labels = JSON.parse(canvas.dataset.labels || '[]');
  const data = JSON.parse(canvas.dataset.data || '[]');
  const label = canvas.dataset.label || 'Metric';

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#94a3b8' : '#475569';
  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

  const ctx = canvas.getContext('2d');

  new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        backgroundColor: type === 'doughnut' 
          ? ['#004B93', '#00205B', '#E31837', '#6BBFDB', '#99f6e4']
          : 'rgba(0, 75, 147, 0.7)',
        borderColor: '#004B93',
        borderWidth: 2,
        borderRadius: 6,
        tension: 0.4,
        fill: type === 'line' ? { target: 'origin', above: 'rgba(0,75,147,0.1)' } : false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: type === 'doughnut', labels: { color: textColor } }
      },
      scales: type !== 'doughnut' ? {
        y: {
          beginAtZero: true,
          grid: { color: gridColor },
          ticks: { color: textColor, font: { size: 11 } }
        },
        x: {
          grid: { display: false },
          ticks: { color: textColor, font: { size: 11 } }
        }
      } : {}
    }
  });
}

/* ---- Career Gantt Chart (Experience page) ---- */
function initGanttChart() {
  const canvas = document.getElementById('career-gantt');
  if (!canvas || typeof Chart === 'undefined' || canvas.dataset.chartInitialized) return;
  // Guards against initChartsInContainer() also firing on this canvas: the
  // scroll-reveal observer calls it for *any* revealed element with a
  // <canvas>, not just .chart-container ones, and .gantt-container is also
  // a .reveal element.
  canvas.dataset.chartInitialized = 'true';

  const monthIndex = (year, month) => (year - 2022) * 12 + (month - 1);
  const today = new Date();
  const presentIndex = monthIndex(today.getFullYear(), today.getMonth() + 1);

  const roles = [
    { label: 'Project Planner (FABS / PepsiCo)', start: monthIndex(2025, 10), end: presentIndex, ongoing: true },
    { label: 'Technical Project Manager (Revolution-ZERO)', start: monthIndex(2024, 11), end: monthIndex(2025, 7) },
    { label: 'IT Service Desk Analyst (NHS)', start: monthIndex(2023, 5), end: monthIndex(2023, 7) },
    { label: 'Project Manager – ERP (Gray Fox Consulting)', start: monthIndex(2022, 8), end: monthIndex(2023, 2) },
    { label: 'Student Inclusion Consultant (Northumbria)', start: monthIndex(2022, 2), end: monthIndex(2023, 7) },
  ];

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formatMonthIndex = (idx) => {
    const year = 2022 + Math.floor(idx / 12);
    const month = ((idx % 12) + 12) % 12;
    return `${monthNames[month]} ${year}`;
  };

  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#94a3b8' : '#475569';
  const gridColor = isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
  const barColor = isDark ? '#3b82f6' : '#004B93';
  const ongoingColor = isDark ? '#60a5fa' : '#0d9488';

  new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: {
      labels: roles.map((r) => r.label),
      datasets: [{
        data: roles.map((r) => [r.start, r.end]),
        backgroundColor: roles.map((r) => (r.ongoing ? ongoingColor : barColor)),
        borderRadius: 6,
        barThickness: 22,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const role = roles[ctx.dataIndex];
              const endLabel = role.ongoing ? 'Present' : formatMonthIndex(role.end);
              return `${formatMonthIndex(role.start)} – ${endLabel}`;
            },
          },
        },
      },
      scales: {
        x: {
          min: 0,
          max: presentIndex + 2,
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            font: { size: 11 },
            stepSize: 12,
            callback: (value) => (value % 12 === 0 ? String(2022 + value / 12) : ''),
          },
        },
        y: {
          grid: { display: false },
          ticks: { color: textColor, font: { size: 11 } },
        },
      },
    },
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
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

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
      setTimeout(() => { statusDiv.style.display = 'none'; }, 5000);
    }
  });
}

/* ---- Confetti ---- */
function createConfetti() {
  const colors = ['#004B93', '#00205B', '#E31837', '#6BBFDB', '#0ea5e9'];
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed; width: 10px; height: 10px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
      left: ${Math.random() * 100}vw; top: -10px; z-index: 9999; pointer-events: none;
    `;
    document.body.appendChild(confetti);
    const duration = 2000 + Math.random() * 2000;
    const horizontal = (Math.random() - 0.5) * 200;
    confetti.animate([
      { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
      { transform: `translateY(100vh) translateX(${horizontal}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
    ], { duration: duration, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }).onfinish = () => confetti.remove();
  }
}
