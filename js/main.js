/* ============================================================
   Aryan Pawar — Portfolio scripts
   Requires: vendor/three.min.js, vendor/gsap.min.js,
             vendor/ScrollTrigger.min.js (all local)
   ============================================================ */

/* ========== LOADER ========== */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hide');
    initAnimations();
  }, 2200);
});

/* ========== CUSTOM CURSOR ========== */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
const glow = document.getElementById('mouseGlow');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top = mouseY + 'px';
  glow.style.left = mouseX + 'px';
  glow.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  ring.style.left = ringX + 'px';
  ring.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .glass-card, .portfolio-card, input, textarea, select').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hover'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
});

/* ========== PARTICLES ========== */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.color = Math.random() > 0.5 ? 'rgba(0, 212, 255,' : 'rgba(168, 85, 247,';
    this.alpha = Math.random() * 0.5 + 0.2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color + this.alpha + ')';
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color + '1)';
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ========== THREE.JS 3D LAPTOP ========== */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);

const container = document.getElementById('three-canvas').parentElement;
function resizeRenderer() {
  const w = container.clientWidth;
  const h = container.clientHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
resizeRenderer();
window.addEventListener('resize', resizeRenderer);

// Laptop group
const laptop = new THREE.Group();

// Base (keyboard)
const baseGeom = new THREE.BoxGeometry(4.5, 0.15, 3);
const baseMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.8, roughness: 0.3 });
const base = new THREE.Mesh(baseGeom, baseMat);
base.position.y = -1;
base.rotation.x = -Math.PI / 12;
laptop.add(base);

// Keyboard details
const kbGeom = new THREE.BoxGeometry(4, 0.02, 1.5);
const kbMat = new THREE.MeshStandardMaterial({ color: 0x050505, metalness: 0.9, roughness: 0.5 });
const keyboard = new THREE.Mesh(kbGeom, kbMat);
keyboard.position.set(0, 0.08, 0.3);
keyboard.rotation.x = -Math.PI / 12;
laptop.add(keyboard);

// Trackpad
const tpGeom = new THREE.BoxGeometry(1.5, 0.01, 0.8);
const tpMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.9, roughness: 0.3 });
const trackpad = new THREE.Mesh(tpGeom, tpMat);
trackpad.position.set(0, 0.09, 1.3);
trackpad.rotation.x = -Math.PI / 12;
laptop.add(trackpad);

// Screen frame
const screenFrameGeom = new THREE.BoxGeometry(4.5, 2.8, 0.12);
const screenFrameMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.7, roughness: 0.4 });
const screenFrame = new THREE.Mesh(screenFrameGeom, screenFrameMat);
screenFrame.position.set(0, 0.4, -1.4);
screenFrame.rotation.x = -Math.PI / 8;
laptop.add(screenFrame);

// Screen (display) - animated canvas texture
const screenCanvas = document.createElement('canvas');
screenCanvas.width = 800;
screenCanvas.height = 500;
const screenCtx = screenCanvas.getContext('2d');

let slideIndex = 0;
const slides = [
  { bg: ['#1a0a2e', '#0a0a1a'], title: 'LUXE DINING', subtitle: 'Restaurant', accent: '#ffaa66' },
  { bg: ['#0a1a2e', '#051020'], title: 'AZURE HOTEL', subtitle: 'Luxury Stays', accent: '#00D4FF' },
  { bg: ['#1a0a0a', '#0a0505'], title: 'IRON FITNESS', subtitle: 'Premium Gym', accent: '#ff4444' },
  { bg: ['#2a1a2e', '#1a0f1a'], title: 'BELLA SALON', subtitle: 'Beauty Studio', accent: '#ec4899' },
  { bg: ['#0a1528', '#050a1a'], title: 'MEDICARE', subtitle: 'Clinic Portal', accent: '#3b82f6' },
];

function drawScreen() {
  const slide = slides[slideIndex];
  const grad = screenCtx.createLinearGradient(0, 0, 800, 500);
  grad.addColorStop(0, slide.bg[0]);
  grad.addColorStop(1, slide.bg[1]);
  screenCtx.fillStyle = grad;
  screenCtx.fillRect(0, 0, 800, 500);

  // Accent glow
  const glowGrad = screenCtx.createRadialGradient(400, 250, 50, 400, 250, 400);
  glowGrad.addColorStop(0, slide.accent + '40');
  glowGrad.addColorStop(1, 'transparent');
  screenCtx.fillStyle = glowGrad;
  screenCtx.fillRect(0, 0, 800, 500);

  // Title
  screenCtx.fillStyle = '#ffffff';
  screenCtx.font = 'bold 72px sans-serif';
  screenCtx.textAlign = 'center';
  screenCtx.fillText(slide.title, 400, 230);

  // Subtitle
  screenCtx.fillStyle = slide.accent;
  screenCtx.font = '300 20px sans-serif';
  screenCtx.letterSpacing = '4px';
  screenCtx.fillText(slide.subtitle.toUpperCase(), 400, 275);

  // Nav mockup
  screenCtx.fillStyle = 'rgba(255,255,255,0.3)';
  screenCtx.font = '14px sans-serif';
  screenCtx.textAlign = 'left';
  screenCtx.fillText('Home    Menu    About    Contact', 40, 50);

  // Button
  screenCtx.fillStyle = slide.accent;
  screenCtx.fillRect(330, 320, 140, 45);
  screenCtx.fillStyle = '#000';
  screenCtx.font = 'bold 16px sans-serif';
  screenCtx.textAlign = 'center';
  screenCtx.fillText('EXPLORE', 400, 350);
}
drawScreen();

setInterval(() => {
  slideIndex = (slideIndex + 1) % slides.length;
  drawScreen();
}, 3000);

const screenTexture = new THREE.CanvasTexture(screenCanvas);
const screenGeom = new THREE.PlaneGeometry(4.2, 2.5);
const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
const screen = new THREE.Mesh(screenGeom, screenMat);
screen.position.set(0, 0.4, -1.33);
screen.rotation.x = -Math.PI / 8;
laptop.add(screen);

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0x00D4FF, 2, 20);
pointLight1.position.set(5, 5, 5);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xA855F7, 2, 20);
pointLight2.position.set(-5, 3, -5);
scene.add(pointLight2);

const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
rimLight.position.set(0, 5, -5);
scene.add(rimLight);

scene.add(laptop);
camera.position.set(0, 0.5, 6);
camera.lookAt(0, 0, 0);

function animate() {
  requestAnimationFrame(animate);
  laptop.rotation.y += 0.003;
  laptop.position.y = Math.sin(Date.now() * 0.001) * 0.1;
  pointLight1.position.x = Math.sin(Date.now() * 0.001) * 5;
  pointLight2.position.z = Math.cos(Date.now() * 0.001) * 5;
  renderer.render(scene, camera);
}
animate();

/* ========== GSAP ANIMATIONS ========== */
function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // Hero headline char animation
  const headline = document.getElementById('headline');
  const html = headline.innerHTML;
  const words = html.split(' ');
  headline.innerHTML = words.map(word =>
    word.startsWith('<') ? word :
    `<span style="display:inline-block; white-space:nowrap;">${word.split('').map(c => `<span class="headline-char">${c === ' ' ? '&nbsp;' : c}</span>`).join('')}</span>`
  ).join(' ');

  gsap.to('.headline-char', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.02,
    ease: 'power3.out',
    delay: 0.3
  });

  // Reveal animations
  gsap.utils.toArray('.reveal-up').forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
      },
      delay: i % 4 * 0.1
    });
  });

  // Parallax glow orbs
  gsap.utils.toArray('.glow-orb').forEach(orb => {
    gsap.to(orb, {
      y: () => (Math.random() - 0.5) * 200,
      x: () => (Math.random() - 0.5) * 200,
      scrollTrigger: {
        trigger: orb,
        scrub: 1
      }
    });
  });

  // Navbar backdrop
  ScrollTrigger.create({
    start: 100,
    onUpdate: self => {
      const nav = document.querySelector('nav > div');
      if (self.direction === 1 && self.scroll() > 100) {
        nav.style.background = 'rgba(5, 5, 8, 0.7)';
        nav.style.backdropFilter = 'blur(20px)';
        nav.style.padding = '12px 24px';
        nav.style.borderRadius = '50px';
        nav.style.transition = 'all 0.4s';
      } else if (self.scroll() <= 100) {
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
        nav.style.padding = '0';
        nav.style.borderRadius = '0';
      }
    }
  });
}

/* ========== FORM ========== */
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.innerHTML = '<span>✓ Message Sent!</span>';
  btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
  setTimeout(() => {
    btn.innerHTML = '<span>Send Message</span><span>→</span>';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
});

/* ========== MOBILE MENU ========== */
document.getElementById('mobileMenuBtn')?.addEventListener('click', () => {
  // Simple alert for demo; in production use a slide-out menu
  alert('Mobile menu: Home | About | Services | Portfolio | Testimonials | Contact');
});

/* ========== OFFLINE / ONLINE MAP FALLBACK ==========
   The Google Map iframe needs an internet connection.
   When offline we hide it and show a styled local
   placeholder so the layout never breaks.
   =================================================== */
function updateOnlineState() {
  document.body.classList.toggle('is-offline', !navigator.onLine);
}
window.addEventListener('online', updateOnlineState);
window.addEventListener('offline', updateOnlineState);
updateOnlineState();


