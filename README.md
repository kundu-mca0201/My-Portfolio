# Kundan Kumar - Personal Portfolio Website

A static, modern personal portfolio website built with semantic **HTML5**, **Vanilla CSS3**, and **Modern JavaScript (ES6+)**, optimized for instant static deployment on [Vercel](https://vercel.com).

## 🚀 Features & Aesthetics
- **Visual Design**: Dark-mode glassmorphic interface with electric cyan & violet neon gradients, subtle ambient glows, and interactive canvas particles.
- **Micro-Animations & Hover Effects**:
  - Interactive 3D tilt and floating badge animations in the Hero section.
  - Hover glow, scale effects, and animated border highlights across all project cards, skill badges, and contact elements.
  - Dynamic typewriter effect cycling through core developer specialties.
  - Interactive skill progress indicators and real-time counter metrics.
- **Live Interactive Project Simulators**:
  - **MediFine (AI Medicine Discovery)**: Live simulator to test generic medicine searches, salt composition breakdown, and price savings calculations.
  - **AI-Powered Chatbot**: Live in-browser simulated conversation assistant.
  - **SmartFin**: Interactive student budget and expense analyzer with live calculations.
- **Resume Viewer**: One-click modal resume view with instant printing / PDF export support.
- **Theme Toggle**: Seamless Dark and Light mode switching with `localStorage` persistence.
- **Fully Responsive**: Mobile-first architecture with collapsible drawer navigation.

---

## 📁 File Structure
```
├── index.html          # Semantic HTML5 layout and structured sections
├── css/
│   └── style.css       # Complete modern CSS design system, animations & responsive rules
├── js/
│   └── main.js         # Interactive simulators, dynamic typing, canvas, and UI logic
├── vercel.json         # Vercel static routing, clean URLs & security headers
└── README.md           # Documentation & deployment guide
```

---

## ⚡ How to Deploy to Vercel in 2 Minutes

### Option 1: Via Vercel CLI (Quickest)
Open your terminal in this project directory and run:
```bash
npx vercel
```
Follow the simple prompts (accept the default options by pressing Enter), and your website will be live in seconds with a free `.vercel.app` URL!

### Option 2: Via GitHub & Vercel Dashboard
1. Initialize git and push this folder to your GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Click **"Deploy"** (no build settings or commands needed—it's static!).
5. Your portfolio is live with automatic CI/CD on every push.
