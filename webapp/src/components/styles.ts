export const globalStyles = `
    /* ===== RESET & BASE ===== */
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
    
    :root {
      --bg-primary: #0a0a0a;
      --bg-secondary: #111111;
      --bg-card: #161616;
      --text-primary: #f5f5f0;
      --text-secondary: #a0a0a0;
      --text-muted: #666666;
      --accent: #c8a97e;
      --accent-light: #e0c9a6;
      --accent-glow: rgba(200, 169, 126, 0.3);
      --border: rgba(255,255,255,0.06);
      --glass: rgba(255,255,255,0.03);
      --naver: #03C75A;
      --kakao: #FEE500;
      --google: #4285F4;
    }

    html { scroll-behavior: smooth; overflow-x: hidden; }
    body {
      font-family: 'Noto Sans KR', 'Inter', sans-serif;
      background: var(--bg-primary);
      color: var(--text-primary);
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      padding-bottom: 70px;
      word-break: keep-all;
      overflow-wrap: break-word;
    }
    ::selection { background: var(--accent); color: var(--bg-primary); }

    /* ===== NOISE ===== */
    .noise {
      position: fixed; inset: 0; z-index: 9998; pointer-events: none; opacity: 0.03;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }

    /* ===== NAVBAR ===== */
    .navbar {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      padding: 1.5rem 4rem; display: flex; align-items: center; justify-content: space-between;
      transition: all 0.5s ease; background: rgba(10,10,10,0.95);
      backdrop-filter: blur(20px); border-bottom: 1px solid var(--border);
    }
    .navbar.hero-nav { background: transparent; backdrop-filter: none; border-bottom: none; }
    .navbar.hero-nav.scrolled { background: rgba(10,10,10,0.95); backdrop-filter: blur(20px); padding: 1rem 4rem; border-bottom: 1px solid var(--border); }
    .nav-left { display: flex; align-items: center; }
    .nav-logo { display: flex; align-items: center; color: var(--text-primary); text-decoration: none; }
    .nav-logo img { height: 32px; width: auto; }
    /* Clinic Status Badge */
    .clinic-status { display: flex; align-items: center; gap: 0.4rem; padding: 0.3rem 0.9rem; border-radius: 50px; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.02em; white-space: nowrap; border: 1px solid var(--border); background: rgba(255,255,255,0.03); margin-left: 0.8rem; }
    .status-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
    .clinic-status.open { border-color: rgba(52,199,89,0.3); }
    .clinic-status.open .status-dot { background: #34c759; box-shadow: 0 0 6px rgba(52,199,89,0.5); animation: statusPulse 2s ease-in-out infinite; }
    .clinic-status.open .status-text { color: #34c759; }
    .clinic-status.closed { border-color: rgba(255,69,58,0.2); }
    .clinic-status.closed .status-dot { background: #ff453a; }
    .clinic-status.closed .status-text { color: var(--text-muted); }
    @keyframes statusPulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
    .nav-links { display: flex; gap: 2.5rem; list-style: none; position: absolute; left: 50%; transform: translateX(-50%); }
    .nav-links a {
      color: var(--text-secondary); text-decoration: none; font-size: 0.92rem; font-weight: 500;
      letter-spacing: 0.1em; text-transform: uppercase; transition: color 0.3s; position: relative;
    }
    .nav-links a::after { content: ''; position: absolute; bottom: -4px; left: 0; width: 0; height: 1px; background: var(--accent); transition: width 0.3s; }
    .nav-links a:hover { color: var(--accent); }
    .nav-links a:hover::after { width: 100%; }
    .nav-links a.active { color: var(--accent); }
    .nav-links a.active::after { width: 100%; }
    .nav-cta { padding: 0.6rem 1.8rem; border: 1px solid var(--accent); color: var(--accent) !important; font-size: 0.85rem !important; letter-spacing: 0.15em; transition: all 0.3s !important; }
    .nav-cta:hover { background: var(--accent) !important; color: var(--bg-primary) !important; }
    .nav-cta::after { display: none !important; }
    /* Nav Right (auth + hamburger) */
    .nav-right { display: flex; align-items: center; gap: 1.2rem; }
    .nav-auth { display: flex; align-items: center; gap: 0.8rem; }
    .nav-auth-btn { color: var(--text-secondary); text-decoration: none; font-size: 0.85rem; font-weight: 500; letter-spacing: 0.05em; transition: color 0.3s; display: inline-flex; align-items: center; gap: 0.4rem; white-space: nowrap; }
    .nav-auth-btn:hover { color: var(--accent); }
    .nav-auth-btn i { font-size: 0.75rem; }
    .nav-auth-sep { color: var(--text-muted); font-size: 0.7rem; user-select: none; }
    .nav-auth-user { display: flex; align-items: center; gap: 0.6rem; }
    .nav-auth-user img { width: 28px; height: 28px; border-radius: 50%; object-fit: cover; border: 1px solid var(--accent); }
    .nav-auth-user span { color: var(--text-secondary); font-size: 0.8rem; font-weight: 400; }
    .nav-auth-user span em { color: var(--accent); font-style: normal; font-weight: 500; }
    .nav-auth-mobile { display: none; }

    .menu-toggle { display: none; flex-direction: column; gap: 6px; cursor: pointer; z-index: 10001; position: relative; }
    .menu-toggle span { width: 28px; height: 1.5px; background: var(--text-primary); transition: all 0.3s; }
    .menu-toggle.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    .menu-toggle.open span:nth-child(2) { opacity: 0; }
    .menu-toggle.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }

    /* ===== PAGE HEADER (sub-pages) ===== */
    .page-header { padding: 10rem 4rem 5rem; text-align: center; background: var(--bg-secondary); position: relative; overflow: hidden; }
    .page-header::before { content: ''; position: absolute; width: 500px; height: 500px; background: var(--accent); border-radius: 50%; filter: blur(200px); opacity: 0.05; top: 0; left: 50%; transform: translateX(-50%); }
    .page-header .section-label { justify-content: center; }
    .page-header-title { font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight: 900; letter-spacing: -0.02em; margin-bottom: 1rem; position: relative; z-index: 1; }
    .page-header-desc { font-size: 1.05rem; color: var(--text-secondary); line-height: 1.8; max-width: 600px; margin: 0 auto; font-weight: 300; position: relative; z-index: 1; }

    /* ===== SECTION COMMON ===== */
    section { position: relative; padding: 8rem 4rem; }
    .section-label { font-size: 0.7rem; letter-spacing: 0.35em; text-transform: uppercase; color: var(--accent); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 1rem; }
    .section-label::before { content: ''; width: 40px; height: 1px; background: var(--accent); }
    .section-title { font-size: clamp(2rem, 4.5vw, 3.5rem); font-weight: 900; line-height: 1.3; margin-bottom: 1.5rem; letter-spacing: -0.02em; }
    .section-desc { font-size: 1.05rem; color: var(--text-secondary); line-height: 1.9; max-width: 650px; font-weight: 300; }

    /* ===== BUTTONS ===== */
    .btn-primary { padding: 1rem 3rem; background: var(--accent); color: var(--bg-primary); border: none; font-size: 0.9rem; font-weight: 600; letter-spacing: 0.1em; cursor: pointer; position: relative; overflow: hidden; transition: transform 0.3s; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; }
    .btn-primary:hover { transform: scale(1.03); }
    .btn-primary::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent); transform: translateX(-100%); transition: transform 0.5s; }
    .btn-primary:hover::before { transform: translateX(100%); }
    .btn-ghost { padding: 1rem 3rem; background: transparent; color: var(--text-primary); border: 1px solid var(--border); font-size: 0.9rem; font-weight: 400; letter-spacing: 0.1em; cursor: pointer; transition: all 0.3s; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; }
    .btn-ghost:hover { border-color: var(--accent); color: var(--accent); }
    .btn-naver { padding: 1rem 2.5rem; background: var(--naver); color: #fff; border: none; font-size: 0.9rem; font-weight: 600; letter-spacing: 0.05em; cursor: pointer; transition: all 0.3s; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; border-radius: 4px; }
    .btn-naver:hover { transform: scale(1.03); filter: brightness(1.1); }

    /* ===== REVEAL ===== */
    .reveal { opacity: 0; transform: translateY(60px); transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1); }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-delay-1 { transition-delay: 0.15s; }
    .reveal-delay-2 { transition-delay: 0.3s; }
    .reveal-delay-3 { transition-delay: 0.45s; }
    .reveal-delay-4 { transition-delay: 0.6s; }

    /* ===== CARDS ===== */
    .card { border: 1px solid var(--border); padding: 3rem; position: relative; overflow: hidden; transition: all 0.5s ease; background: var(--bg-card); }
    .card:hover { border-color: rgba(200,169,126,0.3); transform: translateY(-5px); }

    /* ===== FORM ===== */
    .form-group { margin-bottom: 1.5rem; }
    .form-group label { display: block; font-size: 0.8rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.5rem; font-weight: 500; }
    .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 0.9rem 1rem; background: var(--bg-primary); border: 1px solid var(--border); color: var(--text-primary); font-family: inherit; font-size: 0.9rem; transition: border-color 0.3s; outline: none; }
    .form-group input:focus, .form-group textarea:focus, .form-group select:focus { border-color: var(--accent); }
    .form-group textarea { resize: vertical; min-height: 100px; }
    .form-group select { cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23c8a97e' d='M6 8L1 3h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; }
    .form-group select option { background: var(--bg-primary); color: var(--text-primary); }
    .form-privacy { display: flex; align-items: flex-start; gap: 0.5rem; margin-bottom: 1.5rem; }
    .form-privacy input[type="checkbox"] { margin-top: 3px; accent-color: var(--accent); }
    .form-privacy label { font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5; cursor: pointer; }
    .form-submit { width: 100%; padding: 1rem; background: var(--accent); color: var(--bg-primary); border: none; font-size: 0.95rem; font-weight: 700; letter-spacing: 0.1em; cursor: pointer; transition: all 0.3s; }
    .form-submit:hover { filter: brightness(1.1); transform: translateY(-2px); }
    .form-submit:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    .form-success { display: none; text-align: center; padding: 2rem; }
    .form-success.show { display: block; }
    .form-success i { font-size: 3rem; color: var(--accent); margin-bottom: 1rem; }
    .form-success h3 { font-size: 1.2rem; margin-bottom: 0.5rem; }
    .form-success p { color: var(--text-secondary); font-size: 0.9rem; }

    /* ===== SOCIAL LOGIN ===== */
    .social-login-buttons { display: flex; flex-direction: column; gap: 0.8rem; max-width: 320px; margin: 0 auto; }
    .social-btn { display: flex; align-items: center; justify-content: center; gap: 0.8rem; padding: 0.9rem 1.5rem; border: none; border-radius: 8px; font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: all 0.3s; text-decoration: none; }
    .social-btn:hover { transform: translateY(-2px); filter: brightness(1.05); }
    .social-btn.kakao { background: var(--kakao); color: #191919; }
    .social-btn.naver-login { background: var(--naver); color: #fff; }
    .social-btn.google { background: #fff; color: #333; border: 1px solid #ddd; }

    /* ===== MODAL ===== */
    .modal-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 10001; align-items: center; justify-content: center; padding: 1rem; }
    .modal-overlay.active { display: flex; }
    .modal { background: var(--bg-card); border: 1px solid var(--border); max-width: 480px; width: 100%; max-height: 90vh; overflow-y: auto; position: relative; }
    .modal-header { display: flex; align-items: center; justify-content: space-between; padding: 1.5rem 2rem; border-bottom: 1px solid var(--border); }
    .modal-header h3 { font-size: 1.1rem; font-weight: 700; }
    .modal-close { background: none; border: none; color: var(--text-muted); font-size: 1.5rem; cursor: pointer; transition: color 0.3s; padding: 0; line-height: 1; }
    .modal-close:hover { color: var(--text-primary); }
    .modal-body { padding: 2rem; }

    /* ===== FOOTER ===== */
    footer { padding: 5rem 4rem 3rem; border-top: 1px solid var(--border); background: var(--bg-secondary); }
    .footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 4rem; margin-bottom: 4rem; }
    .footer-brand h3 { font-family: 'Playfair Display', serif; font-size: 1.5rem; margin-bottom: 1rem; }
    .footer-brand h3 em { color: var(--accent); font-style: italic; }
    .footer-brand p { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.8; font-weight: 300; }
    .footer-col .footer-col-title, .footer-col h4 { font-size: 0.7rem; letter-spacing: 0.25em; text-transform: uppercase; color: var(--accent); margin-bottom: 1.5rem; }
    .footer-col ul { list-style: none; }
    .footer-col li { margin-bottom: 0.8rem; }
    .footer-col a { color: var(--text-secondary); text-decoration: none; font-size: 0.85rem; font-weight: 300; transition: color 0.3s; }
    .footer-col a:hover { color: var(--accent); }
    .footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 2rem; border-top: 1px solid var(--border); font-size: 0.75rem; color: var(--text-muted); }

    /* ===== MOBILE BOTTOM BAR ===== */
    .mobile-bottom-bar { display: none; position: fixed; bottom: 0; left: 0; right: 0; z-index: 9999; background: rgba(10,10,10,0.97); backdrop-filter: blur(20px); border-top: 1px solid var(--border); }
    .mobile-bottom-bar-inner { display: flex; }
    .mobile-bottom-bar a { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0.7rem 0.5rem; text-decoration: none; transition: all 0.3s; gap: 0.3rem; border-right: 1px solid var(--border); }
    .mobile-bottom-bar a:last-child { border-right: none; }
    .mobile-bottom-bar a i { font-size: 1.1rem; }
    .mobile-bottom-bar a span { font-size: 0.65rem; font-weight: 500; letter-spacing: 0.05em; }
    .mobile-bottom-bar a.bar-naver { color: var(--naver); }
    .mobile-bottom-bar a.bar-consult { color: var(--accent); }
    .mobile-bottom-bar a.bar-call { color: #fff; background: var(--accent); }

    /* ===== MOBILE NAV ===== */
    .nav-links.mobile-open {
      display: flex !important; flex-direction: column; position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      width: 100vw; height: 100vh; height: 100dvh;
      background: #0a0a0a;
      justify-content: center; align-items: center; gap: 0.8rem;
      z-index: 10000;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      padding: 4.5rem 2rem 5rem;
      transform: none;
    }
    .nav-links.mobile-open li {
      list-style: none;
      width: 100%;
      text-align: center;
    }
    .nav-links.mobile-open a {
      font-size: 1.15rem;
      color: var(--text-primary);
      opacity: 1;
      display: block;
      padding: 0.6rem 1rem;
    }
    .nav-links.mobile-open a::after { display: none !important; }
    .nav-links.mobile-open a.active { color: var(--accent); }
    .nav-links.mobile-open a:hover { color: var(--accent); }
    .nav-links.mobile-open .nav-cta {
      margin-top: 1rem;
      padding: 0.8rem 2.5rem;
      border: 1px solid var(--accent);
      color: var(--accent) !important;
      display: inline-block;
    }
    .nav-links.mobile-open .nav-auth-mobile { display: block !important; }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 1024px) {
      section { padding: 6rem 2rem; }
      .footer-top { grid-template-columns: 1fr 1fr; gap: 2rem; }
      .navbar { padding: 1.2rem 2rem; }
      .navbar.hero-nav.scrolled { padding: 1rem 2rem; }
      .nav-links { display: none; }
      .menu-toggle { display: flex; }
      .nav-auth { display: none; }
      .nav-auth-mobile { display: block !important; margin-top: 1rem; text-align: center; }
      .nav-auth-mobile .nav-auth-btn { font-size: 1rem; color: var(--text-primary); padding: 0.5rem 1rem; }
      .nav-auth-mobile .nav-auth-user span { font-size: 1rem; color: var(--text-primary); }
      .mobile-bottom-bar { display: block; }
      .page-header { padding: 8rem 2rem 4rem; }
      .section-title { font-size: clamp(1.6rem, 4vw, 2.5rem); }
      .section-desc { font-size: 0.95rem; }
      footer { padding: 4rem 2rem 2rem; }
    }
    @media (max-width: 640px) {
      section { padding: 4rem 1.2rem; }
      .clinic-status { font-size: 0.65rem; padding: 0.25rem 0.65rem; margin-left: 0.5rem; }
      .status-dot { width: 5px; height: 5px; }
      .footer-top { grid-template-columns: 1fr; }
      .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
      .page-header { padding: 6.5rem 1.2rem 2.5rem; }
      .page-header-title { font-size: clamp(1.6rem, 6vw, 2.2rem); }
      .page-header-desc { font-size: 0.9rem; line-height: 1.7; }
      .section-title { font-size: clamp(1.4rem, 5vw, 2rem); }
      .section-label { font-size: 0.65rem; letter-spacing: 0.25em; }
      footer { padding: 3rem 1.2rem 2rem; }
      .footer-top { gap: 1.5rem; }
      .btn-primary, .btn-ghost, .btn-naver { padding: 0.8rem 2rem; font-size: 0.85rem; }
    }
`
