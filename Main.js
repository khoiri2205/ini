/* =========================================
   WEBSITE KELAS TI - MAIN JAVASCRIPT
   ========================================= */

'use strict';

// =========================================
// LOADING SCREEN
// =========================================
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => { loader.style.display = 'none'; }, 500);
    }
    initAnimations();
  }, 2200);
});

// =========================================
// NAVIGATION
// =========================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

// Scroll effect on navbar
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  document.getElementById('scroll-top').classList.toggle('visible', window.scrollY > 400);
});

// Mobile toggle
navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// =========================================
// SECTION NAVIGATION
// =========================================
function showSection(id) {
  // Hide all
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  // Show target
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Activate nav link
  const activeLink = document.querySelector(`.nav-links a[data-section="${id}"]`);
  if (activeLink) activeLink.classList.add('active');

  // Close mobile menu
  navLinks.classList.remove('open');
  const spans = navToggle?.querySelectorAll('span');
  if (spans) {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }

  // Trigger animations for the new section
  setTimeout(initAnimations, 100);
}

// Add click events to nav links
document.querySelectorAll('.nav-links a[data-section]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(link.dataset.section);
  });
});

// CTA buttons and other section triggers
document.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-goto]');
  if (btn) showSection(btn.dataset.goto);
});

// =========================================
// HERO PARTICLES
// =========================================
function createParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;
  container.innerHTML = '';
  const count = 25;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: ${Math.random() * 0.6};
    `;
    container.appendChild(p);
  }
}

// =========================================
// SCHEDULE TABS
// =========================================
function initScheduleTabs() {
  const tabs = document.querySelectorAll('.tab-btn[data-day]');
  const scheduleData = {
    senin: [
      { time: '07:30 - 09:10', subject: 'Matematika Diskrit', sks: '3 SKS', dosen: 'Dr. Ahmad Fauzi, M.Kom', room: 'Lab TI-01', color: '#00d4ff' },
      { time: '09:20 - 11:00', subject: 'Pemrograman Web', sks: '3 SKS', dosen: 'Rizky Pratama, S.Kom, M.T', room: 'Lab Komputer A', color: '#00ff88' },
      { time: '13:00 - 14:40', subject: 'Basis Data', sks: '3 SKS', dosen: 'Dr. Siti Rahayu, M.Cs', room: 'Ruang TI-202', color: '#0066ff' },
    ],
    selasa: [
      { time: '07:30 - 09:10', subject: 'Algoritma & Pemrograman', sks: '3 SKS', dosen: 'Andi Wijaya, M.Kom', room: 'Lab Komputer B', color: '#00d4ff' },
      { time: '10:00 - 11:40', subject: 'Jaringan Komputer', sks: '3 SKS', dosen: 'Ir. Budi Santoso, M.T', room: 'Lab Jaringan', color: '#ffa438' },
      { time: '13:00 - 15:30', subject: 'Praktikum Basis Data', sks: '2 SKS', dosen: 'Asisten Lab', room: 'Lab Komputer A', color: '#8250ff' },
    ],
    rabu: [
      { time: '08:00 - 09:40', subject: 'Rekayasa Perangkat Lunak', sks: '3 SKS', dosen: 'Dr. Hendra Kusuma, M.Cs', room: 'Ruang TI-101', color: '#00d4ff' },
      { time: '10:00 - 11:40', subject: 'Sistem Operasi', sks: '3 SKS', dosen: 'Wahyu Nugroho, M.Kom', room: 'Ruang TI-202', color: '#00ff88' },
    ],
    kamis: [
      { time: '07:30 - 10:00', subject: 'Praktikum Jaringan', sks: '2 SKS', dosen: 'Asisten Lab', room: 'Lab Jaringan', color: '#0066ff' },
      { time: '10:10 - 11:50', subject: 'Kecerdasan Buatan', sks: '3 SKS', dosen: 'Dr. Nina Dewi, Ph.D', room: 'Ruang TI-301', color: '#ff5959' },
      { time: '13:00 - 14:40', subject: 'Etika Profesi TI', sks: '2 SKS', dosen: 'Susanto, M.Pd', room: 'Aula Kampus', color: '#ffa438' },
    ],
    jumat: [
      { time: '07:30 - 09:10', subject: 'Keamanan Siber', sks: '3 SKS', dosen: 'Reza Firmansyah, M.Kom', room: 'Lab TI-01', color: '#00d4ff' },
      { time: '09:20 - 11:00', subject: 'Proyek Akhir Semester', sks: '2 SKS', dosen: 'Tim Dosen Pembimbing', room: 'Ruang Seminar', color: '#00ff88' },
    ],
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderSchedule(scheduleData[tab.dataset.day] || []);
    });
  });

  // Render default (senin)
  if (tabs.length > 0) {
    tabs[0].classList.add('active');
    renderSchedule(scheduleData.senin);
  }
}

function renderSchedule(data) {
  const tbody = document.getElementById('schedule-body');
  if (!tbody) return;

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:32px;color:var(--text-muted)"><i class="fas fa-calendar-times" style="font-size:2rem;display:block;margin-bottom:8px;opacity:0.4"></i>Tidak ada jadwal hari ini</td></tr>`;
    return;
  }

  tbody.innerHTML = data.map((item, i) => `
    <tr style="animation: fadeInUp 0.3s ease ${i * 0.07}s both">
      <td class="td-time"><i class="fas fa-clock" style="margin-right:6px;opacity:0.5;font-size:0.7rem"></i>${item.time}</td>
      <td class="td-subject">
        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${item.color};box-shadow:0 0 6px ${item.color};margin-right:8px"></span>
        ${item.subject}
      </td>
      <td><span class="badge badge-primary">${item.sks}</span></td>
      <td style="color:var(--text-muted);font-size:0.85rem">${item.dosen}</td>
      <td class="td-room"><i class="fas fa-map-marker-alt" style="margin-right:6px;opacity:0.5;font-size:0.7rem"></i>${item.room}</td>
    </tr>
  `).join('');
}

// =========================================
// MATERI / TUGAS TABS
// =========================================
function initMateriTabs() {
  const tabs = document.querySelectorAll('.tab-btn[data-materi]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.materi;
      document.querySelectorAll('.materi-list').forEach(list => {
        list.style.display = list.dataset.list === target ? 'grid' : 'none';
      });
    });
  });
  if (tabs.length > 0) tabs[0].click();
}

// =========================================
// GALLERY FILTER
// =========================================
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.gallery-item').forEach(item => {
        const show = filter === 'all' || item.dataset.cat === filter;
        item.style.opacity = show ? '1' : '0.3';
        item.style.transform = show ? 'scale(1)' : 'scale(0.95)';
        item.style.pointerEvents = show ? 'all' : 'none';
      });
    });
  });
}

// =========================================
// CONTACT FORM VALIDATION
// =========================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    nama: { el: document.getElementById('f-nama'), err: document.getElementById('err-nama'), rule: v => v.trim().length >= 3, msg: 'Nama minimal 3 karakter' },
    email: { el: document.getElementById('f-email'), err: document.getElementById('err-email'), rule: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Format email tidak valid' },
    subjek: { el: document.getElementById('f-subjek'), err: document.getElementById('err-subjek'), rule: v => v !== '', msg: 'Pilih kategori pesan' },
    pesan: { el: document.getElementById('f-pesan'), err: document.getElementById('err-pesan'), rule: v => v.trim().length >= 10, msg: 'Pesan minimal 10 karakter' },
  };

  // Real-time validation
  Object.values(fields).forEach(({ el, err, rule, msg }) => {
    el?.addEventListener('input', () => {
      const valid = rule(el.value);
      el.classList.toggle('error', !valid && el.value !== '');
      if (err) {
        err.textContent = msg;
        err.style.display = (!valid && el.value !== '') ? 'block' : 'none';
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    Object.entries(fields).forEach(([, { el, err, rule, msg }]) => {
      if (!rule(el.value)) {
        valid = false;
        el.classList.add('error');
        if (err) { err.textContent = msg; err.style.display = 'block'; }
      }
    });

    if (valid) {
      form.style.display = 'none';
      const success = document.getElementById('form-success');
      if (success) success.style.display = 'block';
    } else {
      // Shake animation on invalid
      form.animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-8px)' },
        { transform: 'translateX(8px)' },
        { transform: 'translateX(0)' },
      ], { duration: 300, easing: 'ease-in-out' });
    }
  });
}

// =========================================
// SCROLL ANIMATIONS
// =========================================
function initAnimations() {
  const elements = document.querySelectorAll('.fade-in-up:not(.visible)');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  elements.forEach(el => observer.observe(el));
}

// =========================================
// SCROLL TO TOP
// =========================================
document.getElementById('scroll-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =========================================
// COUNTER ANIMATION
// =========================================
function animateCounters() {
  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(timer);
    }, 40);
  });
}

// =========================================
// TYPING EFFECT
// =========================================
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const texts = ['Inovatif', 'Kreatif', 'Kolaboratif', 'Progresif'];
  let ti = 0, ci = 0, deleting = false;

  function type() {
    const current = texts[ti];
    if (!deleting) {
      el.textContent = current.slice(0, ++ci);
      if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
    } else {
      el.textContent = current.slice(0, --ci);
      if (ci === 0) { deleting = false; ti = (ti + 1) % texts.length; }
    }
    setTimeout(type, deleting ? 60 : 100);
  }
  type();
}

// =========================================
// INIT ALL
// =========================================
document.addEventListener('DOMContentLoaded', () => {
  // Show home section by default
  showSection('home');
  createParticles();
  initScheduleTabs();
  initMateriTabs();
  initGalleryFilter();
  initContactForm();
  initTypewriter();
  setTimeout(animateCounters, 2500);
});