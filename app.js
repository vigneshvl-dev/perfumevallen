/**
 * Vallen Luxury Brand Store - Core Visual & E-Commerce Engine
 * Designed in high-performance vanilla JS utilizing HTML5 Canvas APIs,
 * mathematical fluid kinematics, and responsive event managers.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation scrolling state
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Main interactive elements
  initHeroSplits();
  initThemeToggle();
  initBackgroundCanvases();
  initProductCanvases();
  initScentLab();
  initMiniCart();
  initCinematicConcepts();
  initInteractiveBottles();
});

/* ==========================================================================
   1. HERO SPLIT INTERACTION
   ========================================================================== */
function initHeroSplits() {
  const container = document.querySelector('.hero-split-container');
  const divider = document.querySelector('.split-divider');
  const panelHomme = document.querySelector('.panel-homme');
  const panelFemme = document.querySelector('.panel-femme');
  
  if (!container || !divider) return;

  // Let split divider button trigger a smooth centering scroll
  divider.addEventListener('click', () => {
    const nextSection = document.getElementById('collection');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Track mouse coordinates for subtle split shift on container hover
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const percentX = ((e.clientX - rect.left) / rect.width) * 100;
    
    // Smoothly constrain divider position within comfortable bounds (30% to 70%)
    const clampedPercent = Math.min(Math.max(percentX, 30), 70);
    
    // We only apply this dynamic shift if not hovering on mobile resolutions
    if (window.innerWidth > 1024) {
      panelHomme.style.flex = `${clampedPercent / 100}`;
      panelFemme.style.flex = `${(100 - clampedPercent) / 100}`;
      divider.style.left = `${clampedPercent}%`;
    }
  });

  container.addEventListener('mouseleave', () => {
    // Reset to equal split when mouse leaves
    if (window.innerWidth > 1024) {
      panelHomme.style.flex = '1';
      panelFemme.style.flex = '1';
      divider.style.left = '50%';
    }
  });
}

/* ==========================================================================
   1B. DYNAMIC THEME TOGGLE (NOIR VS FEMME PINK)
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  if (!toggleBtn) return;

  // Load existing theme state from localStorage
  const savedTheme = localStorage.getItem('vallen-theme');
  if (savedTheme === 'femme') {
    document.body.classList.add('theme-femme');
  }

  toggleBtn.addEventListener('click', () => {
    const isFemme = document.body.classList.toggle('theme-femme');
    if (isFemme) {
      localStorage.setItem('vallen-theme', 'femme');
      showToast("🌸 Switched to Vallen Femme Pink Mode");
    } else {
      localStorage.setItem('vallen-theme', 'noir');
      showToast("🖤 Switched to Vallen Homme Noir Mode");
    }
  });
}

/* ==========================================================================
   2. AMBIENT BACKGROUND PARTICLE SYSTEMS (PROMPT 3 BACKGROUND CONCEPT)
   ========================================================================== */
function initBackgroundCanvases() {
  // Homme Ambient Canvas (Noir - High Velocity Dark Silver Streams)
  const canvasHomme = document.getElementById('homme-bg-canvas');
  if (canvasHomme) {
    const ctx = canvasHomme.getContext('2d');
    let particles = [];
    
    function resize() {
      canvasHomme.width = canvasHomme.parentElement.offsetWidth;
      canvasHomme.height = canvasHomme.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Seed dark silver fast-flowing linear streams
    class SilverParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvasHomme.width;
        this.y = canvasHomme.height + Math.random() * 50;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedY = -(Math.random() * 3 + 2); // Fast upward stream
        this.speedX = (Math.random() - 0.5) * 1.2;
        this.alpha = Math.random() * 0.4 + 0.15;
        this.length = Math.random() * 25 + 5; // Stretch lines
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y < -30 || this.x < -30 || this.x > canvasHomme.width + 30) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        const strokeColor = document.body.classList.contains('theme-femme')
          ? `rgba(251, 113, 133, ${this.alpha * 1.5})`
          : `rgba(226, 232, 240, ${this.alpha})`;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = this.size;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.speedX * 2, this.y + this.length);
        ctx.stroke();
      }
    }

    for (let i = 0; i < 40; i++) {
      particles.push(new SilverParticle());
    }

    function animate() {
      if (document.body.classList.contains('theme-femme')) {
        ctx.fillStyle = 'rgba(255, 245, 246, 0.15)'; // soft rose-water trails
      } else {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.15)'; // Deep matte trailing effect
      }
      ctx.fillRect(0, 0, canvasHomme.width, canvasHomme.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }

  // Femme Ambient Canvas (Luminous White - Warm Rose Gold & Pearl Fluid Mist)
  const canvasFemme = document.getElementById('femme-bg-canvas');
  if (canvasFemme) {
    const ctx = canvasFemme.getContext('2d');
    let particles = [];

    function resize() {
      canvasFemme.width = canvasFemme.parentElement.offsetWidth;
      canvasFemme.height = canvasFemme.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class PearlMistParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvasFemme.width;
        this.y = canvasFemme.height + Math.random() * 50;
        this.radius = Math.random() * 35 + 15; // Thick warm cloud blobs
        this.speedY = -(Math.random() * 0.4 + 0.2); // Slower zero-g drift
        this.speedX = Math.sin(Math.random() * Math.PI) * 0.15;
        this.alpha = Math.random() * 0.05 + 0.02; // Very faint caustics
        this.color = Math.random() > 0.5 ? '#fb7185' : '#f5e8df'; // Pink amber vs soft gold
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        if (this.y < -this.radius || this.x < -this.radius || this.x > canvasFemme.width + this.radius) {
          this.reset();
        }
      }
      draw() {
        ctx.beginPath();
        let grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        grad.addColorStop(0, hexToRGBA(this.color, this.alpha));
        grad.addColorStop(1, hexToRGBA(this.color, 0));
        ctx.fillStyle = grad;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 20; i++) {
      particles.push(new PearlMistParticle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvasFemme.width, canvasFemme.height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }
}

// Utility to convert hex colors to RGBA
function hexToRGBA(hex, alpha) {
  let r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ==========================================================================
   3. HIGH-END BRAND PRODUCT CANVASES (HOMME & FEMME INTERACTIVE VISUALS)
   ========================================================================== */
function initProductCanvases() {
  // Homme Premium Visualizer (Fracture shards defying gravity + Mist Spray)
  const canvasPHomme = document.getElementById('homme-product-canvas');
  if (canvasPHomme) {
    const ctx = canvasPHomme.getContext('2d');
    let width, height;
    let particles = [];
    let shards = [];
    let sprayActive = false;
    let sprayCooldown = 0;
    
    function resize() {
      width = canvasPHomme.width = canvasPHomme.parentElement.offsetWidth;
      height = canvasPHomme.height = canvasPHomme.parentElement.offsetHeight;
      initShards();
    }

    // Set up gravity-defying fractures of the bottle frame
    // We synthetically draw the elegant matte pill canister on canvas, with fractures overlay
    const bottleWidth = 90;
    const bottleHeight = 220;
    
    function initShards() {
      shards = [];
      // Seed fracturing shards around outer border of perfume bottle
      const centerX = width / 2;
      const centerY = height / 2;
      const shardCount = 22;

      for (let i = 0; i < shardCount; i++) {
        // Generate coordinates around perimeter
        const angle = Math.random() * Math.PI * 2;
        const radiusOffset = 0.8 + Math.random() * 0.4;
        const ox = Math.cos(angle) * (bottleWidth / 2) * radiusOffset;
        const oy = Math.sin(angle) * (bottleHeight / 2) * radiusOffset;
        
        shards.push({
          baseX: ox,
          baseY: oy,
          x: ox,
          y: oy,
          size: Math.random() * 8 + 3,
          rot: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.04,
          driftY: -(Math.random() * 0.8 + 0.2), // upward float
          reboundSpeed: 0.05 + Math.random() * 0.05,
          color: Math.random() > 0.4 ? 'rgba(226, 232, 240, 0.7)' : 'rgba(10, 10, 10, 0.9)', // obsidian metal and silver trim
          active: true
        });
      }
    }

    // Capture mouse movements over the canvas to repel shards defying gravity
    let mouse = { x: -1000, y: -1000, radius: 120 };
    canvasPHomme.addEventListener('mousemove', (e) => {
      const rect = canvasPHomme.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    
    canvasPHomme.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    // Public trigger for Homme Spray Action
    window.triggerHommeSpray = function() {
      if (sprayCooldown > 0) return;
      sprayActive = true;
      sprayCooldown = 60; // cooldown ticks
      
      // Ignite massive blast particles shooting outward from spray atomizer nozzle
      const nozzleX = width / 2;
      const nozzleY = height / 2 - bottleHeight / 2; // top of bottle
      
      // Inject fine mist + fluid splash frozen streams
      for (let i = 0; i < 90; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.7; // upwards spray split
        const velocity = Math.random() * 6 + 4;
        
        particles.push({
          x: nozzleX,
          y: nozzleY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: Math.random() * 3 + 1,
          alpha: Math.random() * 0.9 + 0.4,
          color: Math.random() > 0.3 ? 'rgba(226, 232, 240, 0.95)' : 'rgba(156, 163, 175, 0.6)', // silver mist
          life: 1.0,
          decay: 0.015 + Math.random() * 0.015
        });
      }

      // Add a physical impact vibration to shards
      shards.forEach(s => {
        s.y -= 15 + Math.random() * 10;
        s.rot += Math.random() * 0.5;
      });

      showToast("🖤 Unleashing Vallen Homme Noir Spray mist...");
    };

    resize();
    window.addEventListener('resize', resize);

    function updateAndDraw() {
      ctx.clearRect(0, 0, width, height);
      
      const bottleX = width / 2;
      const bottleY = height / 2;

      // Draw modern volcanic stone base
      ctx.fillStyle = '#0f0f0f';
      ctx.strokeStyle = '#1d1d1d';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(bottleX - 110, bottleY + bottleHeight / 2 + 10);
      ctx.lineTo(bottleX + 110, bottleY + bottleHeight / 2 + 10);
      ctx.lineTo(bottleX + 90, bottleY + bottleHeight / 2 + 35);
      ctx.lineTo(bottleX - 90, bottleY + bottleHeight / 2 + 35);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Render main pill-shaped premium container
      // Symmetrical luxury black glass body
      const gradient = ctx.createLinearGradient(bottleX - bottleWidth/2, bottleY, bottleX + bottleWidth/2, bottleY);
      gradient.addColorStop(0, '#0d0d0d');
      gradient.addColorStop(0.3, '#1a1a1a');
      gradient.addColorStop(0.5, '#222222');
      gradient.addColorStop(0.7, '#141414');
      gradient.addColorStop(1, '#080808');
      
      ctx.fillStyle = gradient;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      
      // Draw smooth pill shape
      ctx.beginPath();
      ctx.roundRect(bottleX - bottleWidth/2, bottleY - bottleHeight/2, bottleWidth, bottleHeight, bottleWidth / 2);
      ctx.fill();
      ctx.stroke();

      // Draw luxurious vertical silver trim down the middle
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1.5;
      ctx.shadowColor = 'rgba(226, 232, 240, 0.4)';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(bottleX, bottleY - bottleHeight / 2 + 15);
      ctx.lineTo(bottleX, bottleY + bottleHeight / 2 - 15);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset shadow

      // Spray Atomizer cap details
      ctx.fillStyle = '#262626';
      ctx.beginPath();
      ctx.arc(bottleX, bottleY - bottleHeight/2 + 2, 8, 0, Math.PI, true);
      ctx.fill();

      // Draw VALLEN brand label in gold/silver
      ctx.fillStyle = '#ffffff';
      ctx.font = "800 10px 'Cinzel'";
      ctx.textAlign = 'center';
      ctx.letterSpacing = '0.3em';
      ctx.fillText("VALLEN", bottleX, bottleY - 15);
      
      ctx.fillStyle = '#9ca3af';
      ctx.font = "400 6px 'Inter'";
      ctx.fillText("HOMME", bottleX, bottleY + 5);

      // Handle gravity defying shards updates & mouse collisions
      shards.forEach(s => {
        // Shards naturally float upwards and sway
        s.y += s.driftY;
        s.rot += s.rotSpeed;
        
        // Return target offset (simulating orbital pull of the perfume grid)
        const targetX = bottleX + s.baseX;
        const targetY = bottleY + s.baseY;
        
        // Repel from mouse location if within radius
        const dx = s.x - mouse.x;
        const dy = s.y - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        let forceX = 0;
        let forceY = 0;
        
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          forceX = Math.cos(angle) * force * 4.5;
          forceY = Math.sin(angle) * force * 4.5;
        }

        // Return forces pull back shard home
        const pullX = (targetX - s.x) * s.reboundSpeed;
        const pullY = (targetY - s.y) * s.reboundSpeed;
        
        s.x += pullX + forceX;
        s.y += pullY + forceY;

        // Wrap particles back to bottom of bottle if they float completely off screen
        if (s.y < 0) {
          s.y = height + Math.random() * 50;
          s.x = bottleX + (Math.random() - 0.5) * bottleWidth;
        }

        // Draw micro geometric fragment shards
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot);
        ctx.fillStyle = s.color;
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 0.5;
        
        ctx.beginPath();
        // Generate custom triangle/polygon
        ctx.moveTo(0, -s.size / 2);
        ctx.lineTo(s.size / 2, s.size / 2);
        ctx.lineTo(-s.size / 2, s.size / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });

      // Mist / Spray particle emission loop
      particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.01; // slight gravity pull on mist
        p.life -= p.decay;
        
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fill();

        return p.life > 0;
      });

      if (sprayCooldown > 0) sprayCooldown--;
      requestAnimationFrame(updateAndDraw);
    }
    updateAndDraw();
  }

  // Femme Premium Visualizer (Polished rose gold, orbital pearl droplets & mist)
  const canvasPFemme = document.getElementById('femme-product-canvas');
  if (canvasPFemme) {
    const ctx = canvasPFemme.getContext('2d');
    let width, height;
    let mistDroplets = [];
    let angleShift = 0;
    
    function resize() {
      width = canvasPFemme.width = canvasPFemme.parentElement.offsetWidth;
      height = canvasPFemme.height = canvasPFemme.parentElement.offsetHeight;
    }

    const bottleWidth = 90;
    const bottleHeight = 220;

    // Seed orbital rose-gold fluid beads in zero-g around the bottle
    function initMistDroplets() {
      mistDroplets = [];
      for (let i = 0; i < 30; i++) {
        mistDroplets.push({
          orbitRadiusX: 110 + Math.random() * 50,
          orbitRadiusY: 50 + Math.random() * 40,
          angle: Math.random() * Math.PI * 2,
          speed: 0.005 + Math.random() * 0.008,
          radius: Math.random() * 6 + 2,
          color: Math.random() > 0.4 ? '#fb7185' : '#fef08a', // rose-gold pink vs soft pearl gold
          offsetY: (Math.random() - 0.5) * 160,
          noiseSpeed: 0.01 + Math.random() * 0.02,
          noisePhase: Math.random() * 10
        });
      }
    }

    // Public trigger for Femme Scent Spray Action
    window.triggerFemmeSpray = function() {
      // Ignites custom fluid caustics flash and accelerates orbits
      mistDroplets.forEach(d => {
        d.speed *= 2.5; // instantly speed up orbit flow
        d.radius += 3;
      });
      
      // Inject instant sparkling cloud droplets
      for (let i = 0; i < 40; i++) {
        const theta = Math.random() * Math.PI * 2;
        const dist = 50 + Math.random() * 120;
        mistDroplets.push({
          orbitRadiusX: dist,
          orbitRadiusY: dist * 0.4,
          angle: theta,
          speed: 0.02 + Math.random() * 0.02,
          radius: Math.random() * 5 + 1.5,
          color: '#fb7185',
          offsetY: (Math.random() - 0.5) * 100,
          noiseSpeed: 0.05,
          noisePhase: Math.random(),
          temporary: true,
          life: 100
        });
      }

      setTimeout(() => {
        mistDroplets.forEach(d => {
          d.speed = 0.005 + Math.random() * 0.008;
          if (d.radius > 6) d.radius = Math.random() * 6 + 2;
        });
        // Filter out temporaries
        mistDroplets = mistDroplets.filter(d => !d.temporary);
      }, 2500);

      showToast("🤍 Misting Vallen Femme glowing pink essence...");
    };

    resize();
    initMistDroplets();
    window.addEventListener('resize', resize);

    function updateAndDraw() {
      ctx.clearRect(0, 0, width, height);

      const bottleX = width / 2;
      const bottleY = height / 2;
      
      // Scent oscillation (slow floating physics)
      angleShift += 0.01;
      const floatOffsetY = Math.sin(angleShift) * 12;

      // Draw light reflections / soft pearl caustics backdrop shimmers
      ctx.save();
      let radialGlow = ctx.createRadialGradient(bottleX, bottleY + floatOffsetY, 0, bottleX, bottleY + floatOffsetY, 220);
      radialGlow.addColorStop(0, 'rgba(251, 113, 133, 0.09)');
      radialGlow.addColorStop(0.5, 'rgba(254, 240, 138, 0.02)');
      radialGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = radialGlow;
      ctx.beginPath();
      ctx.arc(bottleX, bottleY + floatOffsetY, 220, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();

      // Render the Women's Perfume bottle: Symmetrical Rose Gold and Polished Chrome
      const gradBody = ctx.createLinearGradient(bottleX - bottleWidth/2, bottleY + floatOffsetY, bottleX + bottleWidth/2, bottleY + floatOffsetY);
      gradBody.addColorStop(0, '#f43f5e'); // warm pink base
      gradBody.addColorStop(0.2, '#fda4af');
      gradBody.addColorStop(0.5, '#ffffff'); // bright reflective chrome highlights
      gradBody.addColorStop(0.7, '#fda4af');
      gradBody.addColorStop(1, '#e11d48');
      
      ctx.fillStyle = gradBody;
      ctx.strokeStyle = 'rgba(251, 113, 133, 0.2)';
      ctx.lineWidth = 1;
      
      ctx.beginPath();
      ctx.roundRect(bottleX - bottleWidth/2, bottleY - bottleHeight/2 + floatOffsetY, bottleWidth, bottleHeight, bottleWidth / 2);
      ctx.fill();
      ctx.stroke();

      // Mirror-gold elegant middle seam divider
      ctx.strokeStyle = '#fda4af';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bottleX, bottleY - bottleHeight / 2 + 15 + floatOffsetY);
      ctx.lineTo(bottleX, bottleY + bottleHeight / 2 - 15 + floatOffsetY);
      ctx.stroke();

      // Golden Brand Label
      ctx.fillStyle = '#1c1917';
      ctx.font = "800 10px 'Cinzel'";
      ctx.textAlign = 'center';
      ctx.letterSpacing = '0.3em';
      ctx.fillText("VALLEN", bottleX, bottleY - 15 + floatOffsetY);
      
      ctx.fillStyle = '#e11d48';
      ctx.font = "400 6px 'Inter'";
      ctx.fillText("FEMME", bottleX, bottleY + 5 + floatOffsetY);

      // Scent Spray Atomizer Cap
      ctx.fillStyle = '#ffe4e6';
      ctx.beginPath();
      ctx.arc(bottleX, bottleY - bottleHeight/2 + 2 + floatOffsetY, 8, 0, Math.PI, true);
      ctx.fill();

      // Render weightless zero-g orbital particles (drifting lazy mist droplets)
      mistDroplets.forEach(d => {
        d.angle += d.speed;
        
        // Calculate orbital projection (ellipse path with depth layered effect)
        const xPos = bottleX + Math.cos(d.angle) * d.orbitRadiusX;
        // Introduce wavy sinusoidal float to simulate natural laboratory currents
        const wVal = Math.sin(angleShift * 0.5 + d.noisePhase) * 10;
        const yPos = (bottleY + floatOffsetY) + Math.sin(d.angle) * d.orbitRadiusY + d.offsetY + wVal;
        
        // Scale circle sizing based on relative orbital depth to achieve dynamic 3D depth-of-field
        const relativeScale = (Math.sin(d.angle) + 1.2) / 2.2;
        const actualRadius = Math.max(d.radius * relativeScale, 1.2);
        
        // Set particle transparency based on depth layer position
        const layeredAlpha = 0.2 + (relativeScale * 0.6);
        
        // Draw the fluid particle with a soft radiating gradient to look translucent
        ctx.save();
        ctx.beginPath();
        let gradF = ctx.createRadialGradient(xPos, yPos, 0, xPos, yPos, actualRadius);
        gradF.addColorStop(0, hexToRGBA(d.color, layeredAlpha));
        gradF.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradF;
        ctx.arc(xPos, yPos, actualRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(updateAndDraw);
    }
    updateAndDraw();
  }
}

/* ==========================================================================
   4. SCENT CHEMISTRY LABORATORY INTERACTIVE SYNTHESIS
   ========================================================================== */
function initScentLab() {
  const canvas = document.getElementById('scent-lab-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const slideCardamom = document.getElementById('slide-cardamom');
  const slideAmber = document.getElementById('slide-amber');
  const slideLeather = document.getElementById('slide-leather');
  const synthBtn = document.getElementById('synthesize-scent-btn');

  const valCardamom = document.getElementById('val-cardamom');
  const valAmber = document.getElementById('val-amber');
  const valLeather = document.getElementById('val-leather');

  const formulaCode = document.getElementById('formula-code-display');
  const formulaName = document.getElementById('formula-name-display');

  let width = canvas.width = canvas.parentElement.offsetWidth;
  let height = canvas.height = canvas.parentElement.offsetHeight;
  
  let chemicalParticles = [];

  function resize() {
    if (canvas.parentElement) {
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    }
  }
  window.addEventListener('resize', resize);

  // Particle models for the Scent Synthesis visualizer
  class ChemNode {
    constructor(type) {
      this.type = type; // cardamom, amber, leather
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = height + 10;
      this.radius = Math.random() * 4 + 2;
      this.speedY = -(Math.random() * 1.5 + 0.8);
      this.speedX = (Math.random() - 0.5) * 1.0;
      
      // Visual elements based on compound notes
      if (this.type === 'cardamom') {
        this.color = '#34d399'; // Mint/Cardamom fresh green
        this.radius = Math.random() * 5 + 3;
      } else if (this.type === 'amber') {
        this.color = '#fb7185'; // Pink/Rose Amber
        this.radius = Math.random() * 8 + 4;
        this.speedY *= 0.7; // heavier amber mist
      } else {
        this.color = '#a3a3a3'; // Obsidian Leather gray
        this.radius = Math.random() * 3 + 1.5;
        this.speedY *= 1.3; // faster volatile fumes
      }
      this.alpha = Math.random() * 0.6 + 0.2;
    }
    update(vCardamom, vAmber, vLeather) {
      // Speed adjustments derived from respective chemical values
      const baseMult = 1.0;
      if (this.type === 'cardamom') this.y += this.speedY * (vCardamom / 50);
      else if (this.type === 'amber') this.y += this.speedY * (vAmber / 50);
      else this.y += this.speedY * (vLeather / 50);

      this.x += this.speedX;

      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      let g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
      g.addColorStop(0, hexToRGBA(this.color, this.alpha));
      g.addColorStop(1, document.body.classList.contains('theme-femme') ? 'rgba(255, 240, 242, 0)' : 'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Populate node seeds
  function seedChemicals() {
    chemicalParticles = [];
    // Populate counts based on default values
    const cntCardamom = parseInt(slideCardamom.value) / 3;
    const cntAmber = parseInt(slideAmber.value) / 3;
    const cntLeather = parseInt(slideLeather.value) / 3;

    for (let i = 0; i < cntCardamom; i++) chemicalParticles.push(new ChemNode('cardamom'));
    for (let i = 0; i < cntAmber; i++) chemicalParticles.push(new ChemNode('amber'));
    for (let i = 0; i < cntLeather; i++) chemicalParticles.push(new ChemNode('leather'));
  }
  seedChemicals();

  // Listen to slider shifts
  function handleSliderChange() {
    const vC = slideCardamom.value;
    const vA = slideAmber.value;
    const vL = slideLeather.value;

    valCardamom.textContent = `${vC}%`;
    valAmber.textContent = `${vA}%`;
    valLeather.textContent = `${vL}%`;

    // Re-seed count density proportional to the mix
    seedChemicals();
  }

  slideCardamom.addEventListener('input', handleSliderChange);
  slideAmber.addEventListener('input', handleSliderChange);
  slideLeather.addEventListener('input', handleSliderChange);

  // Trigger Scent formula synthesis
  synthBtn.addEventListener('click', () => {
    const c = slideCardamom.value;
    const a = slideAmber.value;
    const l = slideLeather.value;

    // Generate unique formula names
    let codeStr = `VL-S${c}A${a}L${l}`;
    let nameStr = "Noir Pearl Absolute";

    if (parseInt(c) > parseInt(a) && parseInt(c) > parseInt(l)) {
      nameStr = "Vignesh Cardamom Spire";
    } else if (parseInt(a) > parseInt(c) && parseInt(a) > parseInt(l)) {
      nameStr = "Volcanic Amber Royale";
    } else if (parseInt(l) > parseInt(c) && parseInt(l) > parseInt(a)) {
      nameStr = "Obsidian Velvet Leather";
    }

    formulaCode.textContent = codeStr;
    formulaName.textContent = nameStr;

    // Explode visualizer particles
    for (let i = 0; i < 60; i++) {
      chemicalParticles.forEach(p => {
        p.y -= Math.random() * 40;
      });
    }

    showToast(`🔬 Scent Synthesized: ${nameStr} (${codeStr})`);
  });

  // Lab main animation loop
  function drawLab() {
    if (document.body.classList.contains('theme-femme')) {
      ctx.fillStyle = 'rgba(255, 240, 242, 0.2)'; // rose water trail
    } else {
      ctx.fillStyle = 'rgba(13, 13, 13, 0.2)'; // trail effect
    }
    ctx.fillRect(0, 0, width, height);

    const vC = parseInt(slideCardamom.value);
    const vA = parseInt(slideAmber.value);
    const vL = parseInt(slideLeather.value);

    // Draw connecting nodes in chemistry layout style
    ctx.strokeStyle = document.body.classList.contains('theme-femme')
      ? 'rgba(251, 113, 133, 0.08)'
      : 'rgba(255,255,255,0.03)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < chemicalParticles.length; i++) {
      for (let j = i + 1; j < chemicalParticles.length; j++) {
        const p1 = chemicalParticles[i];
        const p2 = chemicalParticles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 80) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    chemicalParticles.forEach(p => {
      p.update(vC, vA, vL);
      p.draw();
    });

    requestAnimationFrame(drawLab);
  }
  drawLab();
}

/* ==========================================================================
   5. PREMIUM CART DRAWER & CHECKOUT WORKFLOW
   ========================================================================== */
function initMiniCart() {
  const cartIconBtn = document.getElementById('cart-icon-btn');
  const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
  const cartDrawer = document.getElementById('cart-drawer');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total-val');
  const checkoutBtn = document.getElementById('checkout-btn');

  let cart = [];

  // Toggle mini-cart drawer overlay transitions
  function openCart() {
    cartDrawerOverlay.classList.add('active');
    cartDrawer.classList.add('active');
  }

  function closeCart() {
    cartDrawerOverlay.classList.remove('active');
    cartDrawer.classList.remove('active');
  }

  if (cartIconBtn) cartIconBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartDrawerOverlay) cartDrawerOverlay.addEventListener('click', closeCart);

  // Cart storage updates
  function updateCartUI() {
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `<div class="cart-empty-message">Your shopping cart is currently empty. Add Vallen Homme or Vallen Femme signature sprays to experience luxury scent chemistry.</div>`;
      cartCount.textContent = '0';
      cartTotal.textContent = '₹0.00';
      return;
    }

    let countSum = 0;
    let totalSum = 0.0;

    cart.forEach(item => {
      countSum += item.quantity;
      totalSum += item.price * item.quantity;

      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <img src="${item.img}" class="cart-item-img" alt="${item.name}">
        <div class="cart-item-info">
          <div>
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-type">${item.type}</div>
          </div>
          <div class="cart-item-qty-row">
            <div class="qty-control">
              <button class="qty-btn" onclick="adjustItemQty('${item.id}', -1)">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" onclick="adjustItemQty('${item.id}', 1)">+</button>
            </div>
            <button class="remove-item-btn" onclick="removeCartItem('${item.id}')">Remove</button>
          </div>
        </div>
        <div class="cart-item-price">₹${(item.price * item.quantity).toLocaleString('en-IN')}</div>
      `;
      cartItemsContainer.appendChild(itemEl);
    });

    cartCount.textContent = countSum;
    cartTotal.textContent = `₹${totalSum.toLocaleString('en-IN')}`;
  }

  // Global helper links to support cart actions in DOM
  window.addCartItem = function(id, name, type, price, img) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id, name, type, price, img, quantity: 1 });
    }
    
    updateCartUI();
    openCart();
    showToast(`🛒 Added ${name} to your cart.`);
  };

  window.adjustItemQty = function(id, offset) {
    const item = cart.find(item => item.id === id);
    if (!item) return;

    item.quantity += offset;
    if (item.quantity <= 0) {
      removeCartItem(id);
    } else {
      updateCartUI();
    }
  };

  window.removeCartItem = function(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
    showToast("🗑️ Item removed from cart.");
  };

  // Safe Luxury Checkout Confirmation Modal (Mocking GPay, Paytm, PayPal secure systems)
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast("⚠️ Your cart is empty.");
        return;
      }
      
      const totalAmount = cartTotal.textContent;
      closeCart();

      // Show stylized full screen overlay for checkouts
      const payModal = document.createElement('div');
      payModal.style.position = 'fixed';
      payModal.style.top = '0';
      payModal.style.left = '0';
      payModal.style.width = '100vw';
      payModal.style.height = '100vh';
      payModal.style.background = 'rgba(5, 5, 5, 0.95)';
      payModal.style.zIndex = '500';
      payModal.style.display = 'flex';
      payModal.style.alignItems = 'center';
      payModal.style.justifyContent = 'center';
      payModal.style.backdropFilter = 'blur(20px)';
      payModal.style.transition = 'opacity 0.5s ease';
      
      payModal.innerHTML = `
        <div style="background: #0b0b0b; border: 1px solid rgba(255,255,255,0.08); padding: 3rem; max-width: 500px; width: 90%; text-align: center; border-radius: 8px;">
          <h2 style="font-family: 'Cinzel', serif; color: #ffffff; letter-spacing: 0.15em; margin-bottom: 1.5rem;">VA-SECURE CHECKOUT</h2>
          <p style="color: #9ca3af; font-size: 0.9rem; margin-bottom: 2rem;">Confirm your order of <strong>${totalAmount}</strong> via our secure payment partners.</p>
          
          <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem;">
            <button onclick="window.completePayment('Google Pay')" style="background: #1f1f1f; color: #ffffff; padding: 1rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.15em; border-radius: 4px; display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; border: 1px solid rgba(255,255,255,0.05); font-weight: bold; cursor: pointer;">
              🚀 Pay with Google Pay (GPay)
            </button>
            <button onclick="window.completePayment('Paytm')" style="background: #1f1f1f; color: #ffffff; padding: 1rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.15em; border-radius: 4px; display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; border: 1px solid rgba(255,255,255,0.05); font-weight: bold; cursor: pointer;">
              📱 Pay with Paytm
            </button>
            <button onclick="window.completePayment('PayPal')" style="background: #1f1f1f; color: #ffffff; padding: 1rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.15em; border-radius: 4px; display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; border: 1px solid rgba(255,255,255,0.05); font-weight: bold; cursor: pointer;">
              💳 Pay with PayPal
            </button>
          </div>
          
          <button onclick="document.body.removeChild(this.parentElement.parentElement)" style="color: #fb7185; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.2em; border-bottom: 1px solid #fb7185; padding-bottom: 2px;">
            Cancel Checkout
          </button>
        </div>
      `;
      document.body.appendChild(payModal);

      window.completePayment = function(gateway) {
        document.body.removeChild(payModal);
        
        // Show payment successful alert
        const successModal = document.createElement('div');
        successModal.style.position = 'fixed';
        successModal.style.top = '0';
        successModal.style.left = '0';
        successModal.style.width = '100vw';
        successModal.style.height = '100vh';
        successModal.style.background = 'rgba(5, 5, 5, 0.98)';
        successModal.style.zIndex = '501';
        successModal.style.display = 'flex';
        successModal.style.alignItems = 'center';
        successModal.style.justifyContent = 'center';
        
        successModal.innerHTML = `
          <div style="text-align: center; max-width: 450px; padding: 2rem;">
            <div style="font-size: 3rem; color: #34d399; margin-bottom: 1.5rem;">✦</div>
            <h2 style="font-family: 'Cinzel', serif; color: #ffffff; letter-spacing: 0.2em; margin-bottom: 1rem;">ORDER PLACED</h2>
            <p style="color: #fb7185; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 1.5rem;">Secured via ${gateway}</p>
            <p style="color: #9ca3af; font-size: 0.85rem; line-height: 1.8; margin-bottom: 2.5rem;">Your signature scent selection has been synthesized and handed off to our premium express courier. An email detailing your real-time tracking coordinates has been dispatched.</p>
            
            <button onclick="document.body.removeChild(this.parentElement.parentElement); window.clearCart()" style="background: #ffffff; color: #000000; padding: 1rem 2.5rem; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 0.2em; font-weight: bold; cursor: pointer; border-radius: 0;">
              Return To Store
            </button>
          </div>
        `;
        document.body.appendChild(successModal);
      };

      window.clearCart = function() {
        cart = [];
        updateCartUI();
      };
    });
  }
}

/* ==========================================================================
   6. FLOATING TOAST SYSTEMS
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('toast-notification');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span class="toast-icon">✦</span> <span>${message}</span>`;
  toast.classList.add('active');

  // Automatically fade out after 3.5s
  setTimeout(() => {
    toast.classList.remove('active');
  }, 3500);
}

/* ==========================================================================
   7. CINEMATIC CONCEPTS INTERACTIVITY & CLIPBOARD
   ========================================================================== */
function initCinematicConcepts() {
  const cinematicBtn = document.getElementById('cinematic-btn');
  const overlay = document.getElementById('cinematic-drawer-overlay');
  const drawer = document.getElementById('cinematic-drawer');
  const closeBtn = document.getElementById('close-cinematic-btn');
  const backdropBtn = document.getElementById('apply-backdrop-btn');
  const heroContainer = document.getElementById('hero');

  if (!cinematicBtn || !drawer || !overlay || !closeBtn) return;

  function openDrawer() {
    overlay.classList.add('active');
    drawer.classList.add('active');
  }

  function closeDrawer() {
    overlay.classList.remove('active');
    drawer.classList.remove('active');
  }

  cinematicBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  if (backdropBtn && heroContainer) {
    backdropBtn.addEventListener('click', () => {
      const isApplied = heroContainer.classList.toggle('show-combined-backdrop');
      if (isApplied) {
        backdropBtn.classList.add('active');
        backdropBtn.textContent = 'Remove Split-Screen Backdrop';
        showToast("🖼️ Split-Screen Cinematic Backdrop applied to Hero!");
      } else {
        backdropBtn.classList.remove('active');
        backdropBtn.textContent = 'Apply Split-Screen Backdrop';
        showToast("🔄 Returned to interactive Canvas panels.");
      }
    });
  }
}

// Global utility for copy to clipboard
window.copyPromptText = function(elementId) {
  const textElement = document.getElementById(elementId);
  if (!textElement) return;

  const promptText = textElement.textContent || textElement.innerText;
  
  navigator.clipboard.writeText(promptText).then(() => {
    showToast("📋 Cinematic Video Prompt copied to clipboard!");
  }).catch(err => {
    console.error('Failed to copy: ', err);
    showToast("❌ Clipboard access denied.");
  });
};

/* ==========================================================================
   8. 3D INTERACTIVE CSS BOTTLES (SPIN & CAP OPEN)
   ========================================================================== */
function initInteractiveBottles() {
  const hommeContainer = document.getElementById('homme-bottle-container');
  const hommeCap = document.getElementById('homme-bottle-cap');
  const hommeBody = document.getElementById('homme-bottle-body');

  const femmeContainer = document.getElementById('femme-bottle-container');
  const femmeCap = document.getElementById('femme-bottle-cap');
  const femmeBody = document.getElementById('femme-bottle-body');

  // Handle Homme Bottle Cap Open/Close
  if (hommeCap && hommeContainer) {
    hommeCap.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = hommeContainer.classList.toggle('cap-open');
      if (isOpen) {
        showToast("🖤 Vallen Homme Atomizer Cap opened.");
        if (window.triggerHommeSpray) {
          setTimeout(window.triggerHommeSpray, 400);
        }
      } else {
        showToast("🖤 Vallen Homme Atomizer Cap closed.");
      }
    });
  }

  // Handle Homme Bottle Body 360-degree rotation
  if (hommeBody && hommeContainer) {
    hommeBody.addEventListener('click', (e) => {
      e.stopPropagation();
      if (hommeContainer.classList.contains('rotate-active')) return;
      hommeContainer.classList.add('rotate-active');
      showToast("🖤 Rotating Vallen Homme 360°...");
      setTimeout(() => {
        hommeContainer.classList.remove('rotate-active');
      }, 1200);
    });
  }

  // Handle Femme Bottle Cap Open/Close
  if (femmeCap && femmeContainer) {
    femmeCap.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = femmeContainer.classList.toggle('cap-open');
      if (isOpen) {
        showToast("🌸 Vallen Femme Atomizer Cap opened.");
        if (window.triggerFemmeSpray) {
          setTimeout(window.triggerFemmeSpray, 400);
        }
      } else {
        showToast("🌸 Vallen Femme Atomizer Cap closed.");
      }
    });
  }

  // Handle Femme Bottle Body 360-degree rotation
  if (femmeBody && femmeContainer) {
    femmeBody.addEventListener('click', (e) => {
      e.stopPropagation();
      if (femmeContainer.classList.contains('rotate-active')) return;
      femmeContainer.classList.add('rotate-active');
      showToast("🌸 Rotating Vallen Femme 360°...");
      setTimeout(() => {
        femmeContainer.classList.remove('rotate-active');
      }, 1200);
    });
  }
}
