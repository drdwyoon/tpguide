export const logoHtml = (height: number = 32) => `<img src="/static/logo-accent.png" alt="태평가이드치과" height="${height}" style="display:block;width:auto;height:${height}px;">`

export function header(activePage: string = '', isHero: boolean = false): string {
  const navClass = isHero ? 'navbar hero-nav' : 'navbar'
  
  const links = [
    { href: '/treatments', label: '진료안내', id: 'treatments' },
    { href: '/pricing', label: '수가표', id: 'pricing' },
    { href: '/doctor', label: '의료진', id: 'doctor' },
    { href: '/mission', label: '미션', id: 'mission' },
    { href: '/content', label: '콘텐츠', id: 'content' },
    { href: '/info', label: '병원안내', id: 'info' },
  ]

  const navLinksHtml = links.map(l => 
    `<li><a href="${l.href}" class="${activePage === l.id ? 'active' : ''}">${l.label}</a></li>`
  ).join('\n      ')

  return `
  <nav class="${navClass}" id="navbar">
    <div class="nav-left">
      <a href="/" class="nav-logo">${logoHtml(32)}</a>
      <div class="clinic-status" id="clinicStatus">
        <span class="status-dot"></span>
        <span class="status-text" id="clinicStatusText"></span>
      </div>
    </div>
    <ul class="nav-links" id="navLinks">
      ${navLinksHtml}
      <li><a href="/info#consult" class="nav-cta">상담신청</a></li>
      <li class="nav-auth-mobile">
        <div id="navAuthMobile"></div>
      </li>
    </ul>
    <div class="nav-right">
      <div class="nav-auth" id="navAuth">
        <a href="javascript:void(0)" onclick="openLoginModal()" class="nav-auth-btn"><i class="fas fa-sign-in-alt"></i> 로그인</a>
      </div>
      <div class="menu-toggle" id="menuToggle" onclick="toggleMobileMenu()">
        <span></span><span></span><span></span>
      </div>
    </div>
  </nav>

  <!-- Login Modal -->
  <div class="modal-overlay" id="loginModal">
    <div class="modal" style="max-width:380px;">
      <div class="modal-header">
        <div style="font-size:1.17em;font-weight:bold;">로그인</div>
        <button class="modal-close" onclick="closeLoginModal()">&times;</button>
      </div>
      <div class="modal-body" style="text-align:center;">
        <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:1.5rem;">소셜 계정으로 간편하게 로그인하세요</p>
        <div class="social-login-buttons">
          <a href="/api/auth/kakao" onclick="document.cookie='auth_return='+encodeURIComponent(location.pathname+location.hash)+';path=/;max-age=300'" class="social-btn kakao">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#191919" d="M12 3C6.48 3 2 6.36 2 10.5c0 2.61 1.74 4.91 4.36 6.22l-1.1 4.07c-.1.35.31.64.62.44l4.85-3.19c.42.04.84.06 1.27.06 5.52 0 10-3.36 10-7.5S17.52 3 12 3z"/></svg>
            카카오로 시작하기
          </a>
          <a href="/api/auth/naver" onclick="document.cookie='auth_return='+encodeURIComponent(location.pathname+location.hash)+';path=/;max-age=300'" class="social-btn naver-login">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#fff" d="M16.27 10.5L7.73 3H3v18h4.73V13.5L16.27 21H21V3h-4.73z"/></svg>
            네이버로 시작하기
          </a>
          <a href="/api/auth/google" class="social-btn google" onclick="return checkProvider('google')">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google로 시작하기
          </a>
        </div>
      </div>
    </div>
  </div>
  `
}
