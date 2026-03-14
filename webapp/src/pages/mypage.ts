import { layout } from '../components/layout'

const mypageStyles = `
  .mypage { padding: 10rem 4rem 6rem; max-width: 700px; margin: 0 auto; }
  .mypage-title { font-size: 1.8rem; font-weight: 900; margin-bottom: 0.5rem; }
  .mypage-sub { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 3rem; }
  
  .profile-card { background: var(--bg-card); border: 1px solid var(--border); padding: 2rem; margin-bottom: 2rem; }
  .profile-header { display: flex; align-items: center; gap: 1.2rem; margin-bottom: 2rem; padding-bottom: 1.5rem; border-bottom: 1px solid var(--border); }
  .profile-header img { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; border: 2px solid var(--accent); }
  .profile-header-info h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.3rem; }
  .profile-header-info span { font-size: 0.8rem; color: var(--text-muted); }
  .profile-badge { display: inline-block; padding: 0.2rem 0.6rem; font-size: 0.65rem; border-radius: 3px; font-weight: 600; letter-spacing: 0.05em; }
  .profile-badge.kakao { background: var(--kakao); color: #191919; }
  .profile-badge.naver { background: var(--naver); color: #fff; }
  .profile-badge.google { background: var(--google); color: #fff; }
  
  .info-section { margin-bottom: 2rem; }
  .info-section h4 { font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 1rem; }
  
  .info-row { display: flex; justify-content: space-between; align-items: center; padding: 0.8rem 0; border-bottom: 1px solid var(--border); }
  .info-row:last-child { border-bottom: none; }
  .info-label { font-size: 0.85rem; color: var(--text-secondary); }
  .info-value { font-size: 0.9rem; font-weight: 500; }
  .info-value.empty { color: var(--text-muted); font-weight: 300; font-style: italic; }
  
  .phone-form { margin-top: 1.5rem; }
  .phone-input-group { display: flex; gap: 0.8rem; margin-bottom: 0.8rem; }
  .phone-input-group input { flex: 1; padding: 0.8rem 1rem; background: var(--bg-primary); border: 1px solid var(--border); color: var(--text-primary); font-family: inherit; font-size: 0.9rem; outline: none; transition: border-color 0.3s; }
  .phone-input-group input:focus { border-color: var(--accent); }
  .phone-input-group button { padding: 0.8rem 1.5rem; background: var(--accent); color: var(--bg-primary); border: none; font-size: 0.85rem; font-weight: 600; cursor: pointer; transition: all 0.3s; white-space: nowrap; }
  .phone-input-group button:hover { filter: brightness(1.1); }
  
  .consent-section { background: var(--bg-card); border: 1px solid var(--border); padding: 2rem; margin-bottom: 2rem; }
  .consent-section h4 { font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 1rem; }
  .consent-item { display: flex; align-items: flex-start; gap: 0.6rem; padding: 0.8rem 0; }
  .consent-item input[type="checkbox"] { margin-top: 3px; accent-color: var(--accent); }
  .consent-item label { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.5; cursor: pointer; }
  .consent-item label strong { color: var(--text-primary); font-weight: 500; }
  .consent-note { font-size: 0.75rem; color: var(--text-muted); margin-top: 0.5rem; line-height: 1.6; }

  .mypage-actions { display: flex; gap: 1rem; margin-top: 2rem; }
  .mypage-actions a { font-size: 0.85rem; color: var(--text-muted); text-decoration: none; transition: color 0.3s; }
  .mypage-actions a:hover { color: var(--accent); }

  .save-msg { display: none; padding: 0.8rem 1rem; background: rgba(200,169,126,0.1); border: 1px solid var(--accent); font-size: 0.85rem; color: var(--accent); margin-top: 1rem; text-align: center; }
  .save-msg.show { display: block; }
  .save-msg.error { background: rgba(255,80,80,0.1); border-color: #f55; color: #f55; }

  @media (max-width: 640px) {
    .mypage { padding: 7rem 1.2rem 4rem; }
    .phone-input-group { flex-direction: column; }
    .phone-input-group button { width: 100%; }
  }
`

const mypageScript = `
  // Load member data
  (function loadMyPage() {
    const cookie = document.cookie.match(/auth=([^;]+)/);
    if (!cookie) { window.location.href = '/'; return; }
    
    try {
      const user = JSON.parse(decodeURIComponent(escape(atob(cookie[1]))));
      // Set profile info
      const imgEl = document.getElementById('profileImg');
      if (imgEl && user.profileImage) imgEl.src = user.profileImage;
      else if (imgEl) imgEl.style.display = 'none';
      
      document.getElementById('profileName').textContent = user.nickname || '회원';
      document.getElementById('profileProvider').textContent = 
        user.provider === 'kakao' ? '카카오' : user.provider === 'naver' ? '네이버' : 'Google';
      
      const badge = document.getElementById('profileBadge');
      badge.textContent = user.provider === 'kakao' ? 'KAKAO' : user.provider === 'naver' ? 'NAVER' : 'GOOGLE';
      badge.className = 'profile-badge ' + user.provider;
      
      document.getElementById('infoName').textContent = user.nickname || '-';
      document.getElementById('infoProvider').textContent = 
        user.provider === 'kakao' ? '카카오 계정' : user.provider === 'naver' ? '네이버 계정' : 'Google 계정';
      
      // Fetch saved member data from server
      fetch('/api/member/me')
        .then(r => r.json())
        .then(data => {
          if (data.member) {
            if (data.member.phone) {
              document.getElementById('phoneInput').value = data.member.phone;
              document.getElementById('infoPhone').textContent = data.member.phone;
              document.getElementById('infoPhone').classList.remove('empty');
            }
            if (data.member.smsConsent) {
              document.getElementById('smsConsent').checked = true;
            }
            if (data.member.joinDate) {
              document.getElementById('infoJoinDate').textContent = data.member.joinDate;
            }
          }
        })
        .catch(() => {});
    } catch(e) { window.location.href = '/'; }
  })();

  function savePhone() {
    const phone = document.getElementById('phoneInput').value.trim();
    if (!phone) { alert('전화번호를 입력해주세요.'); return; }
    if (!/^01[016789]-?\\d{3,4}-?\\d{4}$/.test(phone.replace(/-/g, ''))) {
      alert('올바른 전화번호 형식이 아닙니다.'); return;
    }
    
    const smsConsent = document.getElementById('smsConsent').checked;
    const btn = document.querySelector('.phone-input-group button');
    btn.disabled = true; btn.textContent = '저장 중...';
    
    fetch('/api/member/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, smsConsent })
    })
    .then(r => r.json())
    .then(data => {
      btn.disabled = false; btn.textContent = '저장';
      const msg = document.getElementById('saveMsg');
      if (data.success) {
        msg.className = 'save-msg show';
        msg.textContent = '✓ 저장되었습니다.';
        document.getElementById('infoPhone').textContent = phone;
        document.getElementById('infoPhone').classList.remove('empty');
      } else {
        msg.className = 'save-msg show error';
        msg.textContent = '저장에 실패했습니다.';
      }
      setTimeout(() => { msg.className = 'save-msg'; }, 3000);
    })
    .catch(() => {
      btn.disabled = false; btn.textContent = '저장';
    });
  }
`

export function myPage(): string {
  const body = `
    <div class="mypage">
      <h1 class="mypage-title">마이페이지</h1>
      <p class="mypage-sub">회원 정보를 확인하고 관리할 수 있습니다.</p>

      <div class="profile-card">
        <div class="profile-header">
          <img id="profileImg" src="" alt="프로필">
          <div class="profile-header-info">
            <h3 id="profileName">회원</h3>
            <span id="profileBadge" class="profile-badge">-</span>
            <span id="profileProvider" style="font-size:0.8rem;color:var(--text-muted);margin-left:0.5rem;"></span>
          </div>
        </div>

        <div class="info-section">
          <h4>기본 정보</h4>
          <div class="info-row">
            <span class="info-label">이름</span>
            <span class="info-value" id="infoName">-</span>
          </div>
          <div class="info-row">
            <span class="info-label">로그인 방식</span>
            <span class="info-value" id="infoProvider">-</span>
          </div>
          <div class="info-row">
            <span class="info-label">전화번호</span>
            <span class="info-value empty" id="infoPhone">미등록</span>
          </div>
          <div class="info-row">
            <span class="info-label">가입일</span>
            <span class="info-value" id="infoJoinDate">-</span>
          </div>
        </div>

        <div class="info-section">
          <h4>전화번호 등록</h4>
          <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:1rem;line-height:1.6;">
            전화번호를 등록하시면 상담 예약 확인 등 편리한 서비스를 이용하실 수 있습니다.
          </p>
          <div class="phone-form">
            <div class="phone-input-group">
              <input type="tel" id="phoneInput" placeholder="010-0000-0000" maxlength="13">
              <button onclick="savePhone()">저장</button>
            </div>
          </div>
        </div>
      </div>

      <div class="consent-section">
        <h4>마케팅 정보 수신 동의</h4>
        <div class="consent-item">
          <input type="checkbox" id="smsConsent">
          <label for="smsConsent">
            <strong>SMS/문자 수신 동의 (선택)</strong><br>
            태평가이드치과의 이벤트, 할인 정보, 진료 안내 등을 문자로 받아보실 수 있습니다.
          </label>
        </div>
        <p class="consent-note">
          ※ 수신 동의는 언제든지 마이페이지에서 철회할 수 있습니다.<br>
          ※ 수신 동의와 관계없이 상담 예약 확인 등 필수 안내는 발송됩니다.
        </p>
      </div>

      <div id="saveMsg" class="save-msg"></div>

      <div class="mypage-actions">
        <a href="/api/auth/logout"><i class="fas fa-sign-out-alt"></i> 로그아웃</a>
      </div>
    </div>
  `

  return layout(body, {
    title: '마이페이지 | 태평가이드치과',
    description: '회원 정보 관리',
    activePage: 'mypage',
    extraStyles: mypageStyles,
    extraScripts: mypageScript,
  })
}
