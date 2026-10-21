/**
 * Kundan Kumar - Personal Portfolio Engine
 * Production-ready static JavaScript for high performance, animations, & simulations
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Typing Effect in Hero
  initDynamicTyping();

  // 2. Ambient Interactive Particle Canvas
  initParticleCanvas();

  // 3. Navbar Scrolling, Scroll Progress & Active Nav Link Highlight
  initScrollFeatures();

  // 4. Mobile Menu Drawer
  initMobileDrawer();

  // 5. Theme Toggle (Dark / Light) with LocalStorage
  initThemeToggle();

  // 6. Project Filter Tabs
  initProjectFilters();

  // 7. Skills Filter Tabs
  initSkillFilters();

  // 8. Number Counter Animation for Hero Metrics
  initMetricsCounters();

  // 9. Interactive Project Demos & Modals
  initInteractiveSimulators();

  // 10. Copy to Clipboard Utility
  initCopyButtons();

  // 11. Contact Form Validation & Handler
  initContactForm();

  // 12. Quick Resume Modal Viewer
  initResumeViewer();

  // 13. Dynamic Year in Footer
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 14. Cyberpunk Neon Custom Cursor Effect
  initCustomCursor();
});

/* ==========================================================================
   1. DYNAMIC TYPING EFFECT
   ========================================================================== */
function initDynamicTyping() {
  const typedTarget = document.getElementById('typedText');
  if (!typedTarget) return;

  const roles = [
    'AI-Powered Solutions 🚀',
    'Gemini API Integrations ✨',
    'Full-Stack Web Applications 💻',
    'Flutter Mobile Apps 📱',
    'Interactive Healthcare Tech 🩺'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeSpeed = 85;
  const backSpeed = 40;
  const pauseEnd = 1800;

  function typeStep() {
    const currentWord = roles[roleIdx];

    if (isDeleting) {
      charIdx--;
      typedTarget.textContent = currentWord.substring(0, charIdx);
    } else {
      charIdx++;
      typedTarget.textContent = currentWord.substring(0, charIdx);
    }

    let delay = isDeleting ? backSpeed : typeSpeed;

    if (!isDeleting && charIdx === currentWord.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      delay = 400;
    }

    setTimeout(typeStep, delay);
  }

  typeStep();
}

/* ==========================================================================
   2. AMBIENT INTERACTIVE CANVAS PARTICLES
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor(width / 25), 45);
  const particles = [];

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2 + 1;
      this.vx = (Math.random() - 0.5) * 0.55;
      this.vy = (Math.random() - 0.5) * 0.55;
      this.alpha = Math.random() * 0.55 + 0.25;
      const neonColors = ['#00f0ff', '#ff007f', '#8b5cf6'];
      this.color = neonColors[Math.floor(Math.random() * neonColors.length)];
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Connect nearby particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 115) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.18 * (1 - dist / 115)})`;
          ctx.lineWidth = 0.9;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   3. SCROLL PROGRESS & ACTIVE LINK HIGHLIGHT
   ========================================================================== */
function initScrollFeatures() {
  const navbar = document.getElementById('navbarWrapper');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTopBtn = document.getElementById('backToTopBtn');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressPercent = (scrollTop / docHeight) * 100;

    // Progress bar
    if (scrollProgress) {
      scrollProgress.style.width = `${progressPercent}%`;
    }

    // Sticky glass navbar
    if (scrollTop > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Back to top button
    if (scrollTop > 450) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }

    // Active Section Detection
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   4. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const mobileToggle = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileNavOverlay');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  overlay?.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   5. THEME TOGGLE (DARK / LIGHT)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const root = document.documentElement;

  // Check saved preference
  const savedTheme = localStorage.getItem('kundan_portfolio_theme') || 'dark';
  root.setAttribute('data-theme', savedTheme);

  toggleBtn?.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('kundan_portfolio_theme', newTheme);
    showToast(`Switched to ${newTheme} theme`);
  });
}

/* ==========================================================================
   6. PROJECT FILTERS
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterVal === 'all' || categories.includes(filterVal)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeInCard 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. SKILLS FILTERS
   ========================================================================== */
function initSkillFilters() {
  const skillBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  skillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. HERO METRICS COUNTERS
   ========================================================================== */
function initMetricsCounters() {
  const counters = document.querySelectorAll('.counter');
  let hasAnimated = false;

  function runCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1200;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.ceil(current);
        }
      }, stepTime);
    });
  }

  // Trigger once on view
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !hasAnimated) {
      runCounters();
      hasAnimated = true;
    }
  }, { threshold: 0.5 });

  const metricsSection = document.querySelector('.hero-metrics');
  if (metricsSection) observer.observe(metricsSection);
}

/* ==========================================================================
   9. INTERACTIVE PROJECT DEMOS & MODALS
   ========================================================================== */
function initInteractiveSimulators() {
  const modal = document.getElementById('interactiveDemoModal');
  const closeBtn = document.getElementById('closeDemoModal');
  const modalTitle = document.getElementById('demoModalTitle');
  const modalBody = document.getElementById('demoModalBody');

  if (!modal || !modalBody) return;

  function closeModal() {
    modal.classList.remove('open');
    modalBody.innerHTML = '';
  }

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Handle "Try Live Simulator" buttons
  document.querySelectorAll('.open-demo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const demoType = btn.getAttribute('data-demo');
      openSimulator(demoType);
    });
  });

  // Handle "Project Details / Architecture" buttons
  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      openProjectArchitecture(modalId);
    });
  });

  function openSimulator(type) {
    modal.classList.add('open');

    if (type === 'medifine') {
      modalTitle.innerHTML = `<i class="fa-solid fa-pills" style="color:#06b6d4;"></i> MediFine AI – Generic Medicine Discovery Simulator`;
      modalBody.innerHTML = `
        <div class="sim-container">
          <p style="color:var(--text-muted); font-size:0.92rem;">
            Experience the core workflow of <strong>MediFine</strong>: Search any branded medication to see how Google Gemini API extracts the salt composition, reveals affordable generic substitutes (saving 60–80%), and finds nearby pharmacies!
          </p>

          <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.5rem;">
            <span style="font-size:0.8rem; color:var(--text-dim); align-self:center;">Try Prescriptions:</span>
            <button class="pill-btn-sample" onclick="runMediFineSample('Augmentin 625')">Augmentin 625 Duo</button>
            <button class="pill-btn-sample" onclick="runMediFineSample('Lipitor 20mg')">Lipitor 20mg</button>
            <button class="pill-btn-sample" onclick="runMediFineSample('Pan 40')">Pan 40</button>
            <button class="pill-btn-sample" onclick="runMediFineSample('Crocin 650')">Crocin 650</button>
          </div>

          <div class="sim-input-row">
            <input type="text" id="mediFineInput" class="sim-input" placeholder="Enter brand name (e.g., Augmentin 625, Allegra 120)..." value="Augmentin 625">
            <button class="btn btn-primary btn-sm" id="btnScanMedicine" style="border-radius:var(--radius-full);">
              <i class="fa-solid fa-wand-magic-sparkles"></i> AI Scan
            </button>
          </div>

          <div id="mediFineResultBox" style="background:#090d16; border:1px solid var(--border-light); border-radius:var(--radius-md); padding:1.25rem; min-height:160px;">
            <div style="text-align:center; color:var(--text-dim); padding:1.5rem;">
              Click <strong>"AI Scan"</strong> or choose a sample to query the simulated Gemini AI model.
            </div>
          </div>
        </div>
      `;

      document.getElementById('btnScanMedicine').addEventListener('click', () => {
        const val = document.getElementById('mediFineInput').value.trim();
        runMediFineQuery(val || 'Augmentin 625');
      });

      // Define global sample clicker for the injected HTML
      window.runMediFineSample = function(medName) {
        document.getElementById('mediFineInput').value = medName;
        runMediFineQuery(medName);
      };
    } else if (type === 'chatbot') {
      modalTitle.innerHTML = `<i class="fa-solid fa-robot" style="color:#a855f7;"></i> Interactive Gemini Chat Assistant Simulator`;
      modalBody.innerHTML = `
        <div class="sim-container">
          <p style="color:var(--text-muted); font-size:0.92rem;">
            Simulating Kundan's <strong>Streamlit + Python + Gemini API</strong> conversational engine. Ask questions about software engineering, Kundan's stack, or general coding concepts.
          </p>

          <div class="sim-chat-box" id="simChatBox">
            <div class="sim-msg bot">
              👋 <strong>Gemini Assistant:</strong> Hello! I am the conversational AI assistant built by Kundan Kumar using Python, Streamlit, and the Gemini API. How can I help you today?
            </div>
          </div>

          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <button class="pill-btn-sample" onclick="sendChatPrompt('What technologies does Kundan specialize in?')">What is Kundan's tech stack?</button>
            <button class="pill-btn-sample" onclick="sendChatPrompt('Explain how MediFine uses the Gemini API')">How does MediFine work?</button>
            <button class="pill-btn-sample" onclick="sendChatPrompt('What is SAP ABAP Cloud?')">Tell me about SAP ABAP</button>
          </div>

          <div class="sim-input-row">
            <input type="text" id="chatInputPrompt" class="sim-input" placeholder="Type a message or question...">
            <button class="btn btn-primary btn-sm" id="btnSendChat" style="border-radius:var(--radius-full);">
              <i class="fa-solid fa-paper-plane"></i> Send
            </button>
          </div>
        </div>
      `;

      const chatBox = document.getElementById('simChatBox');
      const chatInput = document.getElementById('chatInputPrompt');
      const sendBtn = document.getElementById('btnSendChat');

      function postUserMessage(msgText) {
        if (!msgText.trim()) return;
        chatBox.innerHTML += `<div class="sim-msg user">${escapeHtml(msgText)}</div>`;
        chatInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;

        // Bot typing simulator
        const typingId = 'typing-' + Date.now();
        chatBox.innerHTML += `<div class="sim-msg bot" id="${typingId}"><i class="fa-solid fa-circle-notch fa-spin"></i> Gemini is thinking...</div>`;
        chatBox.scrollTop = chatBox.scrollHeight;

        setTimeout(() => {
          const typingElem = document.getElementById(typingId);
          if (typingElem) {
            typingElem.innerHTML = generateBotReply(msgText);
            chatBox.scrollTop = chatBox.scrollHeight;
          }
        }, 800);
      }

      sendBtn.addEventListener('click', () => postUserMessage(chatInput.value));
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') postUserMessage(chatInput.value);
      });

      window.sendChatPrompt = function(promptText) {
        chatInput.value = promptText;
        postUserMessage(promptText);
      };
    } else if (type === 'smartfin') {
      modalTitle.innerHTML = `<i class="fa-solid fa-wallet" style="color:#f59e0b;"></i> SmartFin – Student Expense & Budget Calculator`;
      modalBody.innerHTML = `
        <div class="sim-container">
          <p style="color:var(--text-muted); font-size:0.92rem;">
            Test the budget health calculation logic created for students. Adjust your monthly budget and expenses to see real-time analysis!
          </p>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem;">
            <div>
              <label style="font-size:0.82rem; color:var(--text-muted); display:block; margin-bottom:0.25rem;">Monthly Allowance (₹)</label>
              <input type="number" id="finBudget" class="sim-input" value="12000" style="width:100%; margin-bottom:0.75rem;">

              <label style="font-size:0.82rem; color:var(--text-muted); display:block; margin-bottom:0.25rem;">Room Rent / Hostel (₹)</label>
              <input type="number" id="finRent" class="sim-input" value="4500" style="width:100%; margin-bottom:0.75rem;">

              <label style="font-size:0.82rem; color:var(--text-muted); display:block; margin-bottom:0.25rem;">Food / Mess / Groceries (₹)</label>
              <input type="number" id="finFood" class="sim-input" value="3500" style="width:100%; margin-bottom:0.75rem;">
            </div>

            <div>
              <label style="font-size:0.82rem; color:var(--text-muted); display:block; margin-bottom:0.25rem;">Transport / Commute (₹)</label>
              <input type="number" id="finTransit" class="sim-input" value="1200" style="width:100%; margin-bottom:0.75rem;">

              <label style="font-size:0.82rem; color:var(--text-muted); display:block; margin-bottom:0.25rem;">Mobile Recharge & Wifi (₹)</label>
              <input type="number" id="finWifi" class="sim-input" value="600" style="width:100%; margin-bottom:0.75rem;">

              <label style="font-size:0.82rem; color:var(--text-muted); display:block; margin-bottom:0.25rem;">Miscellaneous / Social (₹)</label>
              <input type="number" id="finMisc" class="sim-input" value="800" style="width:100%; margin-bottom:0.75rem;">
            </div>
          </div>

          <div id="smartFinReport" style="background:#090d16; border:1px solid var(--border-light); border-radius:var(--radius-md); padding:1.25rem; margin-top:0.5rem;">
            <!-- Calculated dynamically -->
          </div>
        </div>
      `;

      function updateFinStats() {
        const budget = +document.getElementById('finBudget').value || 0;
        const rent = +document.getElementById('finRent').value || 0;
        const food = +document.getElementById('finFood').value || 0;
        const transit = +document.getElementById('finTransit').value || 0;
        const wifi = +document.getElementById('finWifi').value || 0;
        const misc = +document.getElementById('finMisc').value || 0;

        const totalSpent = rent + food + transit + wifi + misc;
        const balance = budget - totalSpent;
        const burnRate = budget > 0 ? Math.round((totalSpent / budget) * 100) : 0;

        let statusColor = '#34d399';
        let statusText = 'Excellent! Within budget and healthy monthly savings.';
        if (burnRate > 90 && burnRate <= 100) {
          statusColor = '#f59e0b';
          statusText = 'Caution! You have spent over 90% of your allowance.';
        } else if (burnRate > 100) {
          statusColor = '#ef4444';
          statusText = 'Alert! You are overspending by ₹' + Math.abs(balance).toLocaleString('en-IN') + '.';
        }

        const reportBox = document.getElementById('smartFinReport');
        if (reportBox) {
          reportBox.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
              <span style="font-size:0.95rem; font-weight:700; color:var(--text-main);">Budget Health Summary:</span>
              <span style="font-size:0.85rem; font-weight:700; color:${statusColor};">${burnRate}% Spent</span>
            </div>
            <div style="height:8px; width:100%; background:rgba(255,255,255,0.08); border-radius:99px; overflow:hidden; margin-bottom:1rem;">
              <div style="height:100%; width:${Math.min(burnRate, 100)}%; background:${statusColor}; transition:width 0.3s ease;"></div>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.5rem; text-align:center;">
              <div style="background:rgba(255,255,255,0.03); padding:0.6rem; border-radius:8px;">
                <span style="font-size:0.75rem; color:var(--text-dim); display:block;">Total Budget</span>
                <span style="font-weight:700; color:var(--text-main);">₹${budget.toLocaleString('en-IN')}</span>
              </div>
              <div style="background:rgba(255,255,255,0.03); padding:0.6rem; border-radius:8px;">
                <span style="font-size:0.75rem; color:var(--text-dim); display:block;">Total Expenses</span>
                <span style="font-weight:700; color:#fb923c;">₹${totalSpent.toLocaleString('en-IN')}</span>
              </div>
              <div style="background:rgba(255,255,255,0.03); padding:0.6rem; border-radius:8px;">
                <span style="font-size:0.75rem; color:var(--text-dim); display:block;">Savings Balance</span>
                <span style="font-weight:700; color:${balance >= 0 ? '#34d399' : '#ef4444'};">₹${balance.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <p style="font-size:0.82rem; color:${statusColor}; margin-top:0.85rem; text-align:center;">
              <i class="fa-solid fa-circle-info"></i> ${statusText}
            </p>
          `;
        }
      }

      ['finBudget', 'finRent', 'finFood', 'finTransit', 'finWifi', 'finMisc'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', updateFinStats);
      });

      updateFinStats();
    }
  }

  function openProjectArchitecture(modalId) {
    modal.classList.add('open');

    if (modalId === 'modal-medifine') {
      modalTitle.innerHTML = `<i class="fa-solid fa-diagram-project" style="color:#06b6d4;"></i> MediFine System Architecture & Tech Specs`;
      modalBody.innerHTML = `
        <div class="sim-container" style="color:var(--text-muted); font-size:0.92rem; line-height:1.7;">
          <h4 style="color:var(--text-main); font-size:1.15rem; margin-bottom:0.5rem;">MediFine Application Architecture</h4>
          <p>
            MediFine is built on a modular client-server cloud model connecting Flutter mobile devices with Google Cloud, Firebase, and Gemini Multimodal APIs.
          </p>

          <div style="background:#090d16; border:1px solid var(--border-light); border-radius:var(--radius-md); padding:1.25rem; font-family:var(--font-mono); font-size:0.8rem; color:#cbd5e1; margin:1rem 0;">
            [Mobile UI (Flutter / Dart)]<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│─── (1) Image Capture / OCR Text ─────────► [Gemini 1.5 Flash API]<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ (Extract Salt & Generics)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│─── (2) Real-Time Location Query ─────────► [Google Maps Places API]<br>
            &nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ (Locate Jan Aushadhi Kendras)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;└─── (3) Auth & Reminders ─────────────────► [Firebase Cloud Firestore]
          </div>

          <h4 style="color:var(--text-main); font-size:1rem; margin-top:1rem; margin-bottom:0.4rem;">Core Technical Contributions by Kundan:</h4>
          <ul style="padding-left:1.2rem; display:flex; flex-direction:column; gap:0.4rem;">
            <li>Authored custom system prompts ensuring Gemini provides disclaimers, chemical compositions, and accurate generic names.</li>
            <li>Designed the mobile UI in Flutter following modern clean layout principles with offline caching for search histories.</li>
            <li>Configured Google Maps geofencing to help lower-income patients find Jan Aushadhi pharmacies.</li>
          </ul>
        </div>
      `;
    } else if (modalId === 'modal-chatbot') {
      modalTitle.innerHTML = `<i class="fa-solid fa-brain" style="color:#a855f7;"></i> AI Chatbot Engineering Breakdown`;
      modalBody.innerHTML = `
        <div class="sim-container" style="color:var(--text-muted); font-size:0.92rem; line-height:1.7;">
          <h4 style="color:var(--text-main); font-size:1.15rem; margin-bottom:0.5rem;">Python & Streamlit Chat Interface</h4>
          <p>
            An agile, full-stack AI conversational application deployed via Streamlit cloud with Gemini API authentication.
          </p>
          <div style="background:#090d16; border:1px solid var(--border-light); border-radius:var(--radius-md); padding:1rem; margin:1rem 0;">
            <p><strong>Key Engineering Highlights:</strong></p>
            <ul style="padding-left:1.2rem; margin-top:0.5rem; display:flex; flex-direction:column; gap:0.4rem;">
              <li><strong>Session State Retention:</strong> Uses Streamlit's <code>st.session_state.messages</code> to preserve conversational context across multi-turn queries.</li>
              <li><strong>Streaming Responses:</strong> Implemented response chunking to render text dynamically as generated by the Gemini model.</li>
              <li><strong>Prompt Guardrails:</strong> Input validation prevents token overflow and filters inappropriate queries.</li>
            </ul>
          </div>
        </div>
      `;
    } else if (modalId === 'modal-smartfin') {
      modalTitle.innerHTML = `<i class="fa-solid fa-coins" style="color:#fb923c;"></i> SmartFin Technical Specifications`;
      modalBody.innerHTML = `
        <div class="sim-container" style="color:var(--text-muted); font-size:0.92rem; line-height:1.7;">
          <h4 style="color:var(--text-main); font-size:1.15rem; margin-bottom:0.5rem;">SmartFin - Student Cashflow Manager</h4>
          <p>
            Targeted specifically for undergraduate and postgraduate students living away from home in hostel accommodations or PGs.
          </p>
          <div style="background:#090d16; border:1px solid var(--border-light); border-radius:var(--radius-md); padding:1rem; margin:1rem 0;">
            <p><strong>Implemented & Planned Features:</strong></p>
            <ul style="padding-left:1.2rem; margin-top:0.5rem; display:flex; flex-direction:column; gap:0.4rem;">
              <li>Real-time categorized ledger (Rent, Mess, Transport, Recharge, Study Materials).</li>
              <li>Persistent client storage using browser LocalStorage and JSON schemas.</li>
              <li>Predictive budget alerts notifying users when daily velocity exceeds planned limits.</li>
            </ul>
          </div>
        </div>
      `;
    }
  }

  function runMediFineQuery(query) {
    const resultBox = document.getElementById('mediFineResultBox');
    resultBox.innerHTML = `
      <div style="text-align:center; padding:1.5rem; color:var(--accent-cyan);">
        <i class="fa-solid fa-circle-notch fa-spin fa-2x"></i>
        <p style="margin-top:0.75rem; font-size:0.9rem;">Gemini AI is analyzing packaging & active chemical salts...</p>
      </div>
    `;

    setTimeout(() => {
      let data = {
        brand: query,
        salt: 'Amoxicillin (500mg) + Clavulanic Acid (125mg)',
        genericName: 'Amoxyclav Generic 625mg',
        brandPrice: '₹225.00',
        genericPrice: '₹55.00',
        savings: '75%',
        pharmacies: 'Jan Aushadhi Kendra (650m away)'
      };

      if (query.toLowerCase().includes('crocin') || query.toLowerCase().includes('paracetamol')) {
        data = {
          brand: 'Crocin 650',
          salt: 'Paracetamol 650mg',
          genericName: 'Paracetamol IP 650mg',
          brandPrice: '₹34.00',
          genericPrice: '₹6.50',
          savings: '80%',
          pharmacies: 'Government Jan Aushadhi Store (1.1 km away)'
        };
      } else if (query.toLowerCase().includes('lipitor')) {
        data = {
          brand: 'Lipitor 20mg',
          salt: 'Atorvastatin 20mg',
          genericName: 'Atorvastatin IP 20mg',
          brandPrice: '₹190.00',
          genericPrice: '₹32.00',
          savings: '83%',
          pharmacies: 'Apollo Pharmacy & Jan Aushadhi (800m away)'
        };
      } else if (query.toLowerCase().includes('pan')) {
        data = {
          brand: 'Pan 40',
          salt: 'Pantoprazole 40mg',
          genericName: 'Pantoprazole Gastro-resistant 40mg',
          brandPrice: '₹165.00',
          genericPrice: '₹28.00',
          savings: '83%',
          pharmacies: 'MedPlus & Jan Aushadhi Kendra (950m away)'
        };
      }

      resultBox.innerHTML = `
        <div style="animation:fadeInCard 0.4s ease;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
            <div>
              <span style="font-size:0.75rem; font-weight:700; color:var(--accent-cyan); text-transform:uppercase;">AI Analysis Verified</span>
              <h4 style="font-size:1.15rem; color:var(--text-main); margin-top:2px;">${escapeHtml(data.brand)}</h4>
              <p style="font-size:0.85rem; color:var(--text-dim);">Active Salt: <strong>${data.salt}</strong></p>
            </div>
            <span style="background:rgba(16,185,129,0.15); color:#34d399; border:1px solid rgba(16,185,129,0.3); font-weight:700; font-size:0.8rem; padding:0.3rem 0.75rem; border-radius:99px;">
              Save ${data.savings}
            </span>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; background:rgba(255,255,255,0.03); padding:0.85rem; border-radius:8px; margin-bottom:0.75rem;">
            <div>
              <span style="font-size:0.72rem; color:var(--text-dim); display:block;">Branded Market Price</span>
              <span style="font-size:1rem; font-weight:700; color:#ef4444; text-decoration:line-through;">${data.brandPrice}</span>
            </div>
            <div>
              <span style="font-size:0.72rem; color:var(--text-dim); display:block;">Affordable Generic Price</span>
              <span style="font-size:1.15rem; font-weight:800; color:#34d399;">${data.genericPrice}</span>
            </div>
          </div>

          <div style="font-size:0.85rem; color:var(--text-muted); display:flex; align-items:center; gap:0.5rem;">
            <i class="fa-solid fa-map-pin" style="color:#38bdf8;"></i>
            <span>Google Maps Nearby: <strong>${data.pharmacies}</strong></span>
          </div>
        </div>
      `;
    }, 600);
  }

  function generateBotReply(prompt) {
    const p = prompt.toLowerCase();
    if (p.includes('tech') || p.includes('skill') || p.includes('stack')) {
      return `Kundan is proficient in:
      <br>• <strong>Languages:</strong> JavaScript, HTML5/CSS3, Python, SQL, Java, C
      <br>• <strong>AI & APIs:</strong> Gemini API, Prompt Engineering, Claude & Antigravity
      <br>• <strong>Mobile:</strong> Flutter & Firebase
      <br>• <strong>Enterprise:</strong> SAP ABAP Cloud, SAP S/4HANA
      <br>• <strong>Cloud:</strong> Microsoft Certified Azure Fundamentals`;
    }
    if (p.includes('medifine') || p.includes('medicine')) {
      return `<strong>MediFine</strong> is Kundan's flagship Flutter mobile application. It pairs Google's Gemini API with phone camera scanning to identify medicine salts, suggest generic substitutes saving up to 80%, and uses Google Maps API to guide patients to affordable pharmacies!`;
    }
    if (p.includes('sap') || p.includes('abap')) {
      return `Kundan holds an official certification: <strong>SAP Certified – Back-End Developer – ABAP Cloud</strong>. He understands Module Pool programming, CDS views, RESTful Application Programming (RAP), and enterprise data dictionaries!`;
    }
    if (p.includes('hire') || p.includes('contact') || p.includes('email')) {
      return `You can reach Kundan directly at <a href="mailto:kundankumar.codes@gmail.com" style="color:#06b6d4;">kundankumar.codes@gmail.com</a> or via phone at <strong>+91 9708597570</strong>. He is currently seeking developer opportunities!`;
    }
    return `That's an interesting question about "${escapeHtml(prompt)}"! As part of Kundan's Gemini API integration, prompts are sent to Google's model with specialized system contexts to provide concise, production-ready responses.`;
  }
}

/* ==========================================================================
   10. COPY TO CLIPBOARD UTILITY
   ========================================================================== */
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
          btn.innerHTML = `<i class="fa-solid fa-check" style="color:#10b981;"></i>`;
          setTimeout(() => {
            btn.innerHTML = `<i class="fa-regular fa-copy"></i>`;
          }, 2000);
        }).catch(() => {
          showToast('Failed to copy');
        });
      }
    });
  });
}

/* ==========================================================================
   11. CONTACT FORM HANDLER
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formStatus = document.getElementById('formStatus');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    const nameInput = document.getElementById('senderName');
    const emailInput = document.getElementById('senderEmail');
    const subjectInput = document.getElementById('msgSubject');
    const messageInput = document.getElementById('senderMessage');

    // Validation checks
    if (!nameInput.value.trim()) {
      nameInput.parentElement.classList.add('has-error');
      isValid = false;
    } else {
      nameInput.parentElement.classList.remove('has-error');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      emailInput.parentElement.classList.add('has-error');
      isValid = false;
    } else {
      emailInput.parentElement.classList.remove('has-error');
    }

    if (!subjectInput.value.trim()) {
      subjectInput.parentElement.classList.add('has-error');
      isValid = false;
    } else {
      subjectInput.parentElement.classList.remove('has-error');
    }

    if (messageInput.value.trim().length < 10) {
      messageInput.parentElement.classList.add('has-error');
      isValid = false;
    } else {
      messageInput.parentElement.classList.remove('has-error');
    }

    if (!isValid) return;

    // Simulate sending animation
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Sending Message...`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span class="btn-text">Submit Message</span> <i class="fa-solid fa-paper-plane btn-icon"></i>`;

      // Success notification
      formStatus.classList.add('success');
      formStatus.innerHTML = `
        <i class="fa-solid fa-circle-check"></i> Thank you, <strong>${escapeHtml(nameInput.value)}</strong>! Your message has been sent. A direct email client can also be launched via:
        <br><a href="mailto:kundankumar.codes@gmail.com?subject=${encodeURIComponent(subjectInput.value)}&body=${encodeURIComponent(messageInput.value)}" style="color:var(--accent-cyan); font-weight:700; text-decoration:underline;">Click to launch mailto client</a>
      `;

      showToast('Message submitted successfully!');
      form.reset();
    }, 1000);
  });
}

/* ==========================================================================
   12. QUICK RESUME VIEWER
   ========================================================================== */
function initResumeViewer() {
  const resumeBtn = document.getElementById('quickResumeBtn');
  const modal = document.getElementById('interactiveDemoModal');
  const modalTitle = document.getElementById('demoModalTitle');
  const modalBody = document.getElementById('demoModalBody');

  resumeBtn?.addEventListener('click', () => {
    if (!modal || !modalBody) return;
    modal.classList.add('open');
    modalTitle.innerHTML = `<i class="fa-solid fa-file-pdf" style="color:#ef4444;"></i> Kundan Kumar – Official Curriculum Vitae`;
    modalBody.innerHTML = `
      <div style="background:#090d16; border:1px solid var(--border-light); border-radius:var(--radius-md); padding:1.75rem; color:#f1f5f9; font-size:0.9rem; line-height:1.65;">
        <div style="border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:1rem; margin-bottom:1.25rem;">
          <h2 style="font-size:1.6rem; color:#ffffff; font-family:var(--font-heading);">KUNDAN KUMAR</h2>
          <p style="color:var(--accent-cyan); font-size:0.92rem;">Greater Noida, UP | +91 9708597570 | kundankumar.codes@gmail.com</p>
          <p style="color:var(--text-muted); font-size:0.82rem;">LinkedIn: linkedin.com/in/kundan-kumar-40bb0a415</p>
        </div>

        <h4 style="color:var(--accent-purple); font-size:1rem; text-transform:uppercase; margin-bottom:0.4rem;">Professional Summary</h4>
        <p style="color:var(--text-muted); margin-bottom:1rem; font-size:0.85rem;">
          Early-career software developer & MCA candidate (graduating 2027) with hands-on experience building websites using HTML, CSS, JavaScript, and software projects involving frontend dev, application functionality, and problem-solving. Built MediFine (Flutter + Gemini API AI medicine discovery). Working knowledge of SQL, SAP ABAP, and modern AI coding assistants.
        </p>

        <h4 style="color:var(--accent-purple); font-size:1rem; text-transform:uppercase; margin-bottom:0.4rem;">Key Projects</h4>
        <p style="font-size:0.85rem; margin-bottom:0.25rem;"><strong>• MediFine (Flutter, Gemini API, Firebase, Google Maps):</strong> AI-powered generic medicine discovery, image scanning, price comparison, nearby pharmacies.</p>
        <p style="font-size:0.85rem; margin-bottom:0.25rem;"><strong>• AI-Powered Chatbot (Python, Streamlit, Gemini API):</strong> Interactive generative conversational assistant with session memory.</p>
        <p style="font-size:0.85rem; margin-bottom:1rem;"><strong>• SmartFin (Student Expense Tracker):</strong> Real-time budget monitoring, categorizing food/rent/transit, monthly analytics.</p>

        <h4 style="color:var(--accent-purple); font-size:1rem; text-transform:uppercase; margin-bottom:0.4rem;">Education & Certifications</h4>
        <p style="font-size:0.85rem;">• <strong>MCA (Pursuing 2025–2027):</strong> GL Bajaj Institute of Technology & Mgmt (70%)</p>
        <p style="font-size:0.85rem;">• <strong>BCA (2021–2024):</strong> MMHAPU, Patna (79% Distinction)</p>
        <p style="font-size:0.85rem;">• <strong>Microsoft Certified:</strong> Azure Fundamentals</p>
        <p style="font-size:0.85rem;">• <strong>SAP Certified:</strong> Back-End Developer – ABAP Cloud</p>

        <div style="display:flex; justify-content:center; gap:1rem; margin-top:1.5rem; padding-top:1rem; border-top:1px solid rgba(255,255,255,0.1);">
          <button class="btn btn-primary btn-sm" onclick="window.print()">
            <i class="fa-solid fa-print"></i> Print / Save as PDF
          </button>
          <a href="mailto:kundankumar.codes@gmail.com?subject=Resume%20Inquiry%20-%20Kundan%20Kumar" class="btn btn-secondary btn-sm">
            <i class="fa-solid fa-envelope"></i> Request Direct PDF
          </a>
        </div>
      </div>
    `;
  });
}

/* ==========================================================================
   TOAST HELPER
   ========================================================================== */
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-bell" style="color:var(--accent-cyan);"></i> <span>${escapeHtml(message)}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s ease-in reverse forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* Helper to escape strings */
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Injected styles for interactive pills
const customStyle = document.createElement('style');
customStyle.textContent = `
  .pill-btn-sample {
    background: rgba(0, 240, 255, 0.06);
    border: 1px solid rgba(0, 240, 255, 0.3);
    color: var(--text-muted);
    font-size: 0.76rem;
    padding: 0.28rem 0.75rem;
    border-radius: var(--radius-full);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .pill-btn-sample:hover {
    color: #ffffff;
    border-color: var(--neon-cyan);
    background: rgba(0, 240, 255, 0.2);
    box-shadow: 0 0 15px var(--neon-cyan-glow);
  }
  @keyframes fadeInCard {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(customStyle);

/* ==========================================================================
   14. CYBERPUNK NEON CUSTOM CURSOR ENGINE
   ========================================================================== */
function initCustomCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  // Disable on touch screens
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isMoving = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isMoving) {
      dot.classList.add('visible');
      ring.classList.add('visible');
      ringX = mouseX;
      ringY = mouseY;
      isMoving = true;
    }

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  // Smooth lerp trailing animation for ring
  function animateRing() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;

    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover detection for interactive targets
  const interactiveTargets = 'a, button, input, textarea, .project-card, .skill-card, .cert-card, .timeline-content, .pill-btn-sample, .theme-toggle-btn, .brand-logo, .copy-btn, .filter-tab, .skill-filter-btn';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveTargets)) {
      ring.classList.add('cursor-hover');
      dot.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveTargets)) {
      ring.classList.remove('cursor-hover');
      dot.classList.remove('cursor-hover');
    }
  });

  // Click physics & neon sparks
  window.addEventListener('mousedown', (e) => {
    ring.classList.add('cursor-click');
    createClickSparks(e.clientX, e.clientY);
  });

  window.addEventListener('mouseup', () => {
    ring.classList.remove('cursor-click');
  });

  // Hide when mouse exits window
  document.addEventListener('mouseleave', () => {
    dot.classList.remove('visible');
    ring.classList.remove('visible');
    isMoving = false;
  });

  function createClickSparks(x, y) {
    const colors = ['#00f0ff', '#ff007f', '#8b5cf6', '#00ff88'];
    for (let i = 0; i < 7; i++) {
      const spark = document.createElement('div');
      spark.className = 'cursor-spark';
      const size = Math.random() * 4 + 3;
      const angle = (Math.PI * 2 / 7) * i + (Math.random() * 0.4 - 0.2);
      const distance = Math.random() * 32 + 18;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      spark.style.width = `${size}px`;
      spark.style.height = `${size}px`;
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      spark.style.boxShadow = `0 0 10px ${spark.style.backgroundColor}`;
      spark.style.setProperty('--dx', `${dx}px`);
      spark.style.setProperty('--dy', `${dy}px`);

      document.body.appendChild(spark);
      setTimeout(() => spark.remove(), 600);
    }
  }
}

