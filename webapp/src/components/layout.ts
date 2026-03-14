import { globalStyles } from './styles'
import { header } from './header'
import { footer } from './footer'

interface LayoutOptions {
  title?: string
  description?: string
  activePage?: string
  isHero?: boolean
  extraStyles?: string
  extraScripts?: string
}

export function layout(body: string, options: LayoutOptions = {}): string {
  const {
    title = '태평가이드치과 | 믿을 수밖에 없는 진료',
    description = '설명으로 신뢰를 만들고, 신뢰를 통해 선택의 확신을 드리는 치과. 태평가이드치과입니다.',
    activePage = '',
    isHero = false,
    extraStyles = '',
    extraScripts = '',
  } = options

  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="naver-site-verification" content="5cfd3fa8b484b29d18ebc4575160ca368de4f2bf" />
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Noto+Serif+KR:wght@200;300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    ${globalStyles}
    ${extraStyles}
  </style>
</head>
<body>
  <div class="noise"></div>
  ${header(activePage, isHero)}
  ${body}
  ${footer()}

  <script>
    // ===== MOBILE MENU TOGGLE =====
    function toggleMobileMenu() {
      const nav = document.getElementById('navLinks');
      const toggle = document.getElementById('menuToggle');
      if (!nav) return;
      const isOpen = nav.classList.toggle('mobile-open');
      if (toggle) toggle.classList.toggle('open', isOpen);
      if (isOpen) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = '-' + window.scrollY + 'px';
      } else {
        const scrollY = document.body.style.top;
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // ===== NAVBAR SCROLL =====
    window.addEventListener('scroll', () => {
      const nav = document.getElementById('navbar');
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 80);
    });

    // ===== NAV LINK CLICK → CLOSE MENU =====
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('click', () => {
        const nav = document.getElementById('navLinks');
        const toggle = document.getElementById('menuToggle');
        if (nav && nav.classList.contains('mobile-open')) {
          nav.classList.remove('mobile-open');
          if (toggle) toggle.classList.remove('open');
          const scrollY = document.body.style.top;
          document.body.style.overflow = '';
          document.body.style.position = '';
          document.body.style.width = '';
          document.body.style.top = '';
          window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
      });
    });

    // ===== SCROLL REVEAL =====
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ===== AUTH STATE CHECK =====
    (function checkAuth() {
      var navAuthMobile = document.getElementById('navAuthMobile');
      const cookie = document.cookie.match(/auth=([^;]+)/);
      if (!cookie) {
        // 비로그인: 모바일 메뉴에 로그인 버튼
        if (navAuthMobile) {
          navAuthMobile.innerHTML = '<a href="javascript:void(0)" onclick="openLoginModal()" class="nav-auth-btn"><i class="fas fa-sign-in-alt"></i> 로그인</a>';
        }
        return;
      }
      try {
        const user = JSON.parse(decodeURIComponent(escape(atob(cookie[1]))));
        const nickname = user.nickname || '회원';
        const img = user.profileImage ? '<img src="' + user.profileImage + '" alt="">' : '';
        
        // PC header
        const navAuth = document.getElementById('navAuth');
        if (navAuth) {
          navAuth.innerHTML = '<div class="nav-auth-user">' + img +
            '<span><em>' + nickname + '</em>님</span></div>' +
            '<a href="/mypage" class="nav-auth-btn"><i class="fas fa-user"></i> 마이페이지</a>' +
            '<a href="/api/auth/logout" class="nav-auth-btn"><i class="fas fa-sign-out-alt"></i> 로그아웃</a>';
        }
        // Mobile menu
        const navAuthMobile = document.getElementById('navAuthMobile');
        if (navAuthMobile) {
          navAuthMobile.innerHTML = '<div class="nav-auth-user" style="justify-content:center;margin-bottom:0.5rem;">' + img +
            '<span><em>' + nickname + '</em>님</span></div>' +
            '<a href="/mypage" class="nav-auth-btn"><i class="fas fa-user"></i> 마이페이지</a>' +
            '<a href="/api/auth/logout" class="nav-auth-btn"><i class="fas fa-sign-out-alt"></i> 로그아웃</a>';
        }
      } catch(e) {}
    })();

    // ===== LOGIN MODAL =====
    function openLoginModal() {
      // 모바일 메뉴가 열려있으면 닫기
      var nav = document.getElementById('navLinks');
      var toggle = document.getElementById('menuToggle');
      if (nav && nav.classList.contains('mobile-open')) {
        nav.classList.remove('mobile-open');
        if (toggle) toggle.classList.remove('open');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
      }
      document.getElementById('loginModal').classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function closeLoginModal() {
      document.getElementById('loginModal').classList.remove('active');
      document.body.style.overflow = '';
    }
    // 모달 배경 클릭 시 닫기
    document.getElementById('loginModal').addEventListener('click', function(e) {
      if (e.target === this) closeLoginModal();
    });
    // 미구현 프로바이더 체크
    function checkProvider(provider) {
      alert(provider === 'naver' ? '네이버 로그인은 준비 중입니다.' : 'Google 로그인은 준비 중입니다.');
      return false;
    }

    // ===== CLINIC STATUS =====
    (function updateClinicStatus() {
      var el = document.getElementById('clinicStatus');
      var txt = document.getElementById('clinicStatusText');
      if (!el || !txt) return;
      var now = new Date(new Date().toLocaleString('en-US', {timeZone:'Asia/Seoul'}));
      var day = now.getDay(); // 0=Sun
      var h = now.getHours(), m = now.getMinutes(), t = h * 60 + m;
      // 진료시간: 월(1)09:30-18:30, 화(2)09:30-20:30, 수(3)09:30-18:30, 목(4)09:30-18:30, 금(5)휴진, 토(6)09:30-13:30, 일(0)휴진
      // 점심시간: 13:00-14:00
      var schedule = { 1:[570,1110], 2:[570,1230], 3:[570,1110], 4:[570,1110], 6:[570,810] };
      var todaySch = schedule[day];
      var lunchStart = 780, lunchEnd = 840; // 13:00-14:00

      if (!todaySch) {
        // 휴진일 → 다음 영업일 찾기
        el.classList.add('closed');
        var nextDay = day, daysAhead = 0;
        do { nextDay = (nextDay + 1) % 7; daysAhead++; } while (!schedule[nextDay]);
        var dayNames = ['일','월','화','수','목','금','토'];
        var openH = Math.floor(schedule[nextDay][0] / 60);
        var openM = schedule[nextDay][0] % 60;
        if (daysAhead === 1) {
          txt.textContent = '휴진 \u00B7 내일 ' + String(openH).padStart(2,'0') + ':' + String(openM).padStart(2,'0') + ' 오픈';
        } else {
          txt.textContent = '휴진 \u00B7 ' + dayNames[nextDay] + '요일 ' + String(openH).padStart(2,'0') + ':' + String(openM).padStart(2,'0') + ' 오픈';
        }
      } else if (t < todaySch[0]) {
        // 영업 전
        el.classList.add('closed');
        var oh = Math.floor(todaySch[0] / 60), om = todaySch[0] % 60;
        txt.textContent = '진료 전 \u00B7 ' + String(oh).padStart(2,'0') + ':' + String(om).padStart(2,'0') + ' 오픈';
      } else if (t >= todaySch[1]) {
        // 영업 종료
        el.classList.add('closed');
        var nextDay2 = day, daysAhead2 = 0;
        do { nextDay2 = (nextDay2 + 1) % 7; daysAhead2++; } while (!schedule[nextDay2]);
        var dayNames2 = ['일','월','화','수','목','금','토'];
        var oh2 = Math.floor(schedule[nextDay2][0] / 60), om2 = schedule[nextDay2][0] % 60;
        if (daysAhead2 === 1) {
          txt.textContent = '진료 종료 \u00B7 내일 ' + String(oh2).padStart(2,'0') + ':' + String(om2).padStart(2,'0') + ' 오픈';
        } else {
          txt.textContent = '진료 종료 \u00B7 ' + dayNames2[nextDay2] + '요일 ' + String(oh2).padStart(2,'0') + ':' + String(om2).padStart(2,'0') + ' 오픈';
        }
      } else if (t >= lunchStart && t < lunchEnd && day !== 6) {
        // 점심시간 (토요일 제외)
        el.classList.add('open');
        txt.textContent = '점심시간 \u00B7 14:00 진료 재개';
      } else {
        // 진료중
        el.classList.add('open');
        var ch = Math.floor(todaySch[1] / 60), cm = todaySch[1] % 60;
        txt.textContent = '진료중 \u00B7 ' + String(ch).padStart(2,'0') + ':' + String(cm).padStart(2,'0') + ' 마감';
      }
    })();

    ${extraScripts}
  </script>
</body>
</html>`
}
