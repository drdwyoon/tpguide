import { layout } from '../components/layout'
import { logoHtml } from '../components/header'

export function homePage(): string {
  const extraStyles = `
    /* ===== HERO ===== */
    .hero { position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; background: var(--bg-primary); }
    .hero-particles { position: absolute; inset: 0; z-index: 1; }
    .hero-mesh { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
    .mesh-blob { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.15; animation: blobFloat 20s ease-in-out infinite; }
    .mesh-blob:nth-child(1) { width: 600px; height: 600px; background: var(--accent); top: -10%; left: -10%; }
    .mesh-blob:nth-child(2) { width: 500px; height: 500px; background: #4a6fa5; bottom: -15%; right: -5%; animation-delay: -7s; }
    .mesh-blob:nth-child(3) { width: 400px; height: 400px; background: #8b5e3c; top: 50%; left: 50%; animation-delay: -14s; }
    @keyframes blobFloat { 0%, 100% { transform: translate(0,0) scale(1); } 25% { transform: translate(80px,-60px) scale(1.1); } 50% { transform: translate(-40px,80px) scale(0.95); } 75% { transform: translate(60px,40px) scale(1.05); } }
    .hero-grid { position: absolute; inset: 0; z-index: 1; background-image: linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px); background-size: 80px 80px; animation: gridShift 30s linear infinite; }
    @keyframes gridShift { to { transform: translate(80px, 80px); } }
    .hero-content { position: relative; z-index: 10; text-align: left; max-width: 800px; padding: 0 2rem; margin: 0 auto; }
    .hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1.5rem; border: 1px solid rgba(200,169,126,0.3); border-radius: 50px; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 2.5rem; opacity: 0; transform: translateY(30px); backdrop-filter: blur(10px); background: rgba(200,169,126,0.05); justify-self: flex-start; }
    .hero-badge .dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; animation: pulse 2s ease-in-out infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.5); } }
    .hero-title { font-family: 'Noto Sans KR', sans-serif; font-weight: 900; font-size: clamp(2rem, 6vw, 5.5rem); line-height: 1.15; margin-bottom: 2rem; letter-spacing: -0.03em; }
    .hero-title .line { display: block; overflow: hidden; }
    .hero-title .line-inner { display: block; transform: translateY(110%); opacity: 0; }
    .hero-title .accent { color: var(--accent); position: relative; }
    .hero-title .accent::after { content: ''; position: absolute; bottom: 0.1em; left: 0; width: 100%; height: 0.12em; background: var(--accent); opacity: 0.3; transform: scaleX(0); transform-origin: left; }
    .hero-sub { font-size: clamp(1rem, 1.8vw, 1.25rem); color: var(--text-secondary); font-weight: 300; line-height: 1.8; max-width: 700px; margin: 0 0 3rem; opacity: 0; transform: translateY(30px); }
    .hero-cta-group { display: flex; gap: 1.5rem; justify-content: flex-start; opacity: 0; transform: translateY(30px); flex-wrap: wrap; }
    .hero-scroll { position: absolute; bottom: 3rem; left: 50%; transform: translateX(-50%); z-index: 10; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; opacity: 0; animation: fadeInUp 1s ease 2.5s forwards; }
    .hero-scroll span { font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase; color: var(--text-muted); }
    .scroll-line { width: 1px; height: 60px; background: linear-gradient(to bottom, var(--accent), transparent); animation: scrollPulse 2s ease-in-out infinite; }
    @keyframes scrollPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
    @keyframes fadeInUp { to { opacity: 1; } }

    /* ===== LOADING ===== */
    .loader { position: fixed; inset: 0; background: var(--bg-primary); z-index: 10000; display: flex; align-items: center; justify-content: center; flex-direction: column; transition: opacity 0.8s ease, visibility 0.8s; }
    .loader.hidden { opacity: 0; visibility: hidden; }
    .loader-inner { display: flex; flex-direction: column; align-items: center; opacity: 0; animation: fadeInLoader 0.8s ease 0.2s forwards; }
    .loader-logo-img { height: clamp(48px, 15vw, 160px); width: auto; display: block; }
    .loader-line { width: 0; height: 1px; background: var(--accent); margin-top: 1.2rem; animation: expandLine 1.5s ease 0.5s forwards; }
    @keyframes fadeInLoader { to { opacity: 1; } }
    @keyframes slideUp { to { transform: translateY(0); } }
    @keyframes expandLine { to { width: 100%; } }

    /* ===== INTRO SECTION ===== */
    .home-intro { background: var(--bg-secondary); display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }
    .intro-visual { position: relative; width: 100%; aspect-ratio: 3/4; max-height: 520px; overflow: hidden; border: 1px solid var(--border); border-radius: 2px; }
    .intro-visual img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity 1.2s ease; }
    .intro-visual img.fade-out { opacity: 0; }
    .intro-quote { font-family: 'Playfair Display', serif; font-size: clamp(1.2rem, 3vw, 1.8rem); font-style: italic; color: var(--accent); line-height: 1.5; margin-bottom: 2rem; }

    /* ===== MARQUEE ===== */
    .marquee-section { padding: 4rem 0; overflow: hidden; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); background: var(--bg-secondary); }
    .marquee-track { display: flex; gap: 3rem; animation: marquee 25s linear infinite; white-space: nowrap; }
    .marquee-item { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 5vw, 4rem); font-weight: 700; color: rgba(255,255,255,0.06); flex-shrink: 0; display: flex; align-items: center; gap: 2rem; }
    .marquee-item .sep { width: 8px; height: 8px; background: var(--accent); opacity: 0.3; border-radius: 50%; }
    @keyframes marquee { to { transform: translateX(-50%); } }

    /* ===== QUICK LINKS ===== */
    .quick-links { background: var(--bg-primary); }
    .quick-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto; }
    .quick-card { border: 1px solid var(--border); padding: 2.5rem 2rem; background: var(--bg-card); transition: all 0.5s ease; position: relative; overflow: hidden; text-decoration: none; color: inherit; display: block; }
    .quick-card:hover { border-color: rgba(200,169,126,0.3); transform: translateY(-5px); }
    .quick-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 3px; background: linear-gradient(90deg, var(--accent), transparent); opacity: 0; transition: opacity 0.3s; }
    .quick-card:hover::before { opacity: 1; }
    .quick-card-icon { width: 60px; height: 60px; margin-bottom: 1.5rem; border: 1px solid var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--accent); font-size: 1.3rem; transition: all 0.4s; }
    .quick-card:hover .quick-card-icon { background: var(--accent); color: var(--bg-primary); }
    .quick-card h3 { font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; }
    .quick-card p { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.7; font-weight: 300; }
    .quick-card .arrow { position: absolute; bottom: 2rem; right: 2rem; color: var(--accent); opacity: 0; transition: all 0.3s; transform: translateX(-10px); }
    .quick-card:hover .arrow { opacity: 1; transform: translateX(0); }

    /* ===== HORIZONTAL SCROLL TEXT ===== */
    .horizontal-text { padding: 6rem 0; overflow: hidden; background: var(--bg-primary); }
    .horizontal-text-inner { font-size: clamp(4rem, 12vw, 10rem); font-weight: 900; white-space: nowrap; color: transparent; -webkit-text-stroke: 1px rgba(200,169,126,0.15); letter-spacing: -0.03em; animation: marqueeScroll 20s linear infinite; }
    @keyframes marqueeScroll { 0% { transform: translateX(10%); } 100% { transform: translateX(-60%); } }

    /* ===== PROMISE ===== */
    .promise { background: var(--bg-secondary); text-align: center; padding: 8rem 4rem; }
    .promise-text { font-size: clamp(1.1rem, 3vw, 2.8rem); font-weight: 300; line-height: 1.8; max-width: 900px; margin: 0 auto; color: var(--text-primary); word-break: keep-all; overflow-wrap: break-word; }
    .promise-text .highlight { color: var(--accent); font-weight: 700; }
    .promise-text .dim { color: var(--text-muted); }

    @media (max-width: 1024px) {
      .home-intro { grid-template-columns: 1fr; gap: 3rem; }
      .intro-visual { height: 350px; }
      .hero-cta-group { flex-direction: column; align-items: flex-start; }
      .hero-cta-group a { width: 80%; max-width: 320px; text-align: center; justify-content: center; }
    }
    @media (max-width: 640px) {
      .hero { min-height: 90vh; }
      .hero-content { padding: 0 1.2rem; }
      .hero-title { font-size: clamp(1.8rem, 8vw, 2.8rem); margin-bottom: 1.5rem; }
      .hero-sub { font-size: 0.9rem; margin-bottom: 2rem; line-height: 1.7; }
      .hero-badge { font-size: 0.65rem; letter-spacing: 0.1em; padding: 0.4rem 1rem; margin-bottom: 1.5rem; }
      .hero-cta-group { gap: 0.8rem; }
      .hero-cta-group a { width: 100%; font-size: 0.85rem; padding: 0.8rem 2rem; }
      .hero-scroll { display: none; }
      .intro-visual { aspect-ratio: 4/5; max-height: 400px; }
      .intro-quote { font-size: 1.1rem; }
      .quick-grid { grid-template-columns: 1fr; }
      .promise { padding: 5rem 1.2rem; }
      .promise-text { font-size: 1rem; line-height: 2; }
      .promise-text br { display: none; }
      .horizontal-text { padding: 4rem 0; }
    }
  `

  const body = `
  <!-- Loading screen -->
  <div class="loader" id="loader">
    <div class="loader-inner">
      <img src="/static/logo-accent.png" alt="태평가이드치과" class="loader-logo-img">
      <div class="loader-line"></div>
    </div>
  </div>

  <!-- HERO -->
  <section class="hero" id="hero">
    <div class="hero-mesh">
      <div class="mesh-blob"></div>
      <div class="mesh-blob"></div>
      <div class="mesh-blob"></div>
    </div>
    <div class="hero-grid"></div>
    <canvas class="hero-particles" id="particleCanvas"></canvas>
    
    <div class="hero-content">
      <h1 class="sr-only">성남 수정구 태평가이드치과 - 통합치의학과 전문의의 믿을 수 있는 진료</h1>
      <div class="hero-title" id="heroTitle" role="presentation">
        <span class="line"><span class="line-inner">믿을 수밖에 없는</span></span>
        <span class="line"><span class="line-inner"><span class="accent">진료 구조</span>를</span></span>
        <span class="line"><span class="line-inner">만듭니다</span></span>
      </div>
      <p class="hero-sub" id="heroSub">
        설명으로 신뢰를 만들고, 신뢰를 통해 선택의 확신을 드리는 치과.<br>
        숨기지 않고 설명하고, 흔들림 없이 진료하며, 끝까지 책임집니다.
      </p>
      <div class="hero-cta-group" id="heroCta">
        <a href="/info#consult" class="btn-primary">
          상담 신청하기 <i class="fas fa-arrow-right"></i>
        </a>
        <a href="https://m.booking.naver.com/booking/13/bizes/634456?theme=place&lang=ko&area=ple" target="_blank" class="btn-naver">
          <i class="fas fa-calendar-check"></i> 네이버 예약
        </a>
        <a href="/mission" class="btn-ghost">
          자세히 알아보기 <i class="fas fa-chevron-down"></i>
        </a>
      </div>
    </div>

    <div class="hero-scroll">
      <span>Scroll</span>
      <div class="scroll-line"></div>
    </div>
  </section>

  <!-- INTRO / PHILOSOPHY -->
  <section class="home-intro" id="intro">
    <div class="intro-visual reveal">
      <picture><source srcset="/static/consult1.webp" type="image/webp"><img src="/static/consult1.jpg" alt="태평가이드치과 진료실 상담" id="introImg1" loading="lazy"></picture>
      <picture><source srcset="/static/consult2.webp" type="image/webp"><img src="/static/consult2.jpg" alt="태평가이드치과 원장 설명" id="introImg2" class="fade-out" loading="lazy"></picture>
    </div>
    <div>
      <div class="section-label reveal">Our Philosophy</div>
      <p class="intro-quote reveal reveal-delay-1">
        "이곳에서 내가 제대로 설명을 듣고,<br>
        납득한 상태로 치료를 받을 수 있을까?"
      </p>
      <div class="section-desc reveal reveal-delay-2">
        치과 진료는 환자 입장에서 결코 가벼운 경험이 아닙니다. 눈에 잘 보이지 않는 구강 안에서 진행되는 치료이기 때문에, 많은 경우 환자는 자신의 상태를 정확히 알기 어렵습니다.<br><br>
        그래서 치과 진료에는 기술만큼이나 중요한 것이 있습니다. 바로 <strong style="color:var(--accent)">설명</strong>, 그리고 그 설명을 바탕으로 만들어지는 <strong style="color:var(--accent)">신뢰</strong>입니다.
      </div>
      <div style="margin-top:2rem" class="reveal reveal-delay-3">
        <a href="/mission" class="btn-ghost" style="padding:0.8rem 2rem;font-size:0.85rem;">
          진료 철학 더 알아보기 <i class="fas fa-arrow-right" style="font-size:0.8rem;"></i>
        </a>
      </div>
    </div>
  </section>

  <!-- MARQUEE -->
  <div class="marquee-section">
    <div class="marquee-track">
      <div class="marquee-item">TRANSPARENCY <span class="sep"></span></div>
      <div class="marquee-item">CONSISTENCY <span class="sep"></span></div>
      <div class="marquee-item">ACCOUNTABILITY <span class="sep"></span></div>
      <div class="marquee-item">PATIENT CHOICE <span class="sep"></span></div>
      <div class="marquee-item">TRANSPARENCY <span class="sep"></span></div>
      <div class="marquee-item">CONSISTENCY <span class="sep"></span></div>
      <div class="marquee-item">ACCOUNTABILITY <span class="sep"></span></div>
      <div class="marquee-item">PATIENT CHOICE <span class="sep"></span></div>
    </div>
  </div>

  <!-- QUICK LINKS -->
  <section class="quick-links">
    <div style="text-align:center;max-width:700px;margin:0 auto 5rem;">
      <div class="section-label reveal" style="justify-content:center">Quick Links</div>
      <h2 class="section-title reveal reveal-delay-1" style="text-align:center">태평가이드치과 주요 진료 과목 둘러보기</h2>
    </div>
    <div class="quick-grid">
      <a href="/treatments" class="quick-card reveal">
        <div class="quick-card-icon"><i class="fas fa-tooth"></i></div>
        <h3>임플란트 및 심미보철 진료</h3>
        <p>임플란트, 심미보철, 충치치료 등 주요 진료과목을 안내합니다.</p>
        <div class="arrow"><i class="fas fa-arrow-right"></i></div>
      </a>
      <a href="/doctor" class="quick-card reveal reveal-delay-1">
        <div class="quick-card-icon"><i class="fas fa-user-md"></i></div>
        <h3>통합치의학과 전문의 대표원장</h3>
        <p>윤도완 대표원장의 학력, 경력, 자격사항을 확인하세요.</p>
        <div class="arrow"><i class="fas fa-arrow-right"></i></div>
      </a>
      <a href="/mission" class="quick-card reveal reveal-delay-2">
        <div class="quick-card-icon"><i class="fas fa-compass"></i></div>
        <h3>미션과 비전</h3>
        <p>태평가이드치과가 추구하는 4가지 핵심 가치와 진료 방향.</p>
        <div class="arrow"><i class="fas fa-arrow-right"></i></div>
      </a>
      <a href="/info" class="quick-card reveal reveal-delay-3">
        <div class="quick-card-icon"><i class="fas fa-hospital"></i></div>
        <h3>병원안내</h3>
        <p>오시는 길, 진료시간, 상담 신청 정보를 확인하세요.</p>
        <div class="arrow"><i class="fas fa-arrow-right"></i></div>
      </a>
    </div>
  </section>

  <!-- HORIZONTAL SCROLL TEXT -->
  <div class="horizontal-text">
    <div class="horizontal-text-inner" id="hScrollText">
      설명으로 신뢰를 만들고 &mdash; 신뢰를 통해 선택의 확신을 드리는 치과 &mdash; 태평가이드치과 &mdash;
    </div>
  </div>

  <!-- PROMISE -->
  <section class="promise">
    <p class="promise-text reveal">
      <span class="dim">치과 진료가 두렵지 않으려면,</span><br>
      먼저 <span class="highlight">이해</span>할 수 있어야 합니다.<br>
      이해할 수 있으려면, 충분한 <span class="highlight">설명</span>이 있어야 합니다.<br>
      <span class="dim">그리고 충분한 설명이 있을 때,</span><br>
      비로소 환자는 자신의 치료를<br>
      <span class="highlight">스스로 선택</span>할 수 있습니다.
    </p>
  </section>
  `

  const extraScripts = `
    // ===== LOADING SCREEN =====
    window.addEventListener('load', () => {
      setTimeout(() => {
        document.getElementById('loader')?.classList.add('hidden');
        animateHero();
      }, 2200);
    });

    // ===== HERO ANIMATIONS =====
    function animateHero() {
      const badge = document.getElementById('heroBadge');
      const lines = document.querySelectorAll('.hero-title .line-inner');
      const sub = document.getElementById('heroSub');
      const cta = document.getElementById('heroCta');

      setTimeout(() => {
        if (badge) { badge.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)'; badge.style.opacity = '1'; badge.style.transform = 'translateY(0)'; }
      }, 100);

      lines.forEach((line, i) => {
        setTimeout(() => {
          line.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
          line.style.transform = 'translateY(0)';
          line.style.opacity = '1';
        }, 300 + i * 200);
      });

      setTimeout(() => {
        document.querySelectorAll('.hero-title .accent').forEach(el => { el.classList.add('underlined'); });
      }, 1200);

      setTimeout(() => {
        if (sub) { sub.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'; sub.style.opacity = '1'; sub.style.transform = 'translateY(0)'; }
      }, 1000);

      setTimeout(() => {
        if (cta) { cta.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'; cta.style.opacity = '1'; cta.style.transform = 'translateY(0)'; }
      }, 1300);
    }

    // Dynamic accent underline
    const accentStyle = document.createElement('style');
    accentStyle.textContent = '.hero-title .accent.underlined::after { transform: scaleX(1) !important; transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }';
    document.head.appendChild(accentStyle);

    // ===== PARTICLE SYSTEM =====
    const canvas = document.getElementById('particleCanvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let particles = [];
      function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      class Particle {
        constructor() { this.reset(); }
        reset() {
          this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
          this.size = Math.random() * 2 + 0.5; this.speedX = (Math.random() - 0.5) * 0.4;
          this.speedY = (Math.random() - 0.5) * 0.4; this.opacity = Math.random() * 0.4 + 0.1;
          this.pulse = Math.random() * Math.PI * 2;
        }
        update() {
          this.x += this.speedX; this.y += this.speedY; this.pulse += 0.01;
          this.currentOpacity = this.opacity * (0.7 + 0.3 * Math.sin(this.pulse));
          if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
          ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(200, 169, 126, ' + this.currentOpacity + ')'; ctx.fill();
        }
      }

      const particleCount = Math.min(80, Math.floor(window.innerWidth / 15));
      for (let i = 0; i < particleCount; i++) particles.push(new Particle());

      function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x; const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 150) {
              ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = 'rgba(200, 169, 126, ' + (0.06 * (1 - dist / 150)) + ')'; ctx.lineWidth = 0.5; ctx.stroke();
            }
          }
        }
      }

      function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animateParticles);
      }
      animateParticles();
    }

    // ===== PARALLAX BLOBS =====
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      document.querySelectorAll('.mesh-blob').forEach((blob, i) => {
        blob.style.transform = 'translateY(' + (scrollY * (0.1 + i * 0.05)) + 'px)';
      });
    });

    // (horizontal scroll text is now CSS animation - no JS needed)

    // ===== INTRO PHOTO SLIDESHOW =====
    (function() {
      const img1 = document.getElementById('introImg1');
      const img2 = document.getElementById('introImg2');
      if (!img1 || !img2) return;
      let showFirst = true;
      setInterval(() => {
        showFirst = !showFirst;
        img1.classList.toggle('fade-out', !showFirst);
        img2.classList.toggle('fade-out', showFirst);
      }, 5000);
    })();
  `

  return layout(body, {
    activePage: 'home',
    isHero: true,
    extraStyles,
    extraScripts,
  })
}
