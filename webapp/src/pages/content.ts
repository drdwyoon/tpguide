import { layout } from '../components/layout'

const contentStyles = `
    /* ===== CONTENT NAV ===== */
    .content-nav { display: flex; gap: 0.5rem; max-width: 1200px; margin: 0 auto 3rem; flex-wrap: wrap; }
    .content-nav a { padding: 0.6rem 1.5rem; border: 1px solid var(--border); color: var(--text-secondary); text-decoration: none; font-size: 0.85rem; font-weight: 400; letter-spacing: 0.05em; transition: all 0.3s; }
    .content-nav a:hover { border-color: var(--accent); color: var(--accent); }
    .content-nav a.active { background: var(--accent); color: var(--bg-primary); border-color: var(--accent); font-weight: 600; }

    /* ===== CONTENT GRID ===== */
    .content-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto; }
    .content-card { border: 1px solid var(--border); background: var(--bg-card); transition: all 0.5s ease; overflow: hidden; }
    .content-card:hover { border-color: rgba(200,169,126,0.3); transform: translateY(-5px); }
    .content-card-thumb { aspect-ratio: 16/9; background: linear-gradient(135deg, #1a1a1a, #2a2a2a); display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .content-card-thumb i { font-size: 3rem; color: var(--accent); opacity: 0.2; }
    .content-card-body { padding: 2rem; }
    .content-card-tag { display: inline-block; padding: 0.3rem 0.8rem; border: 1px solid var(--accent); font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); margin-bottom: 1rem; }
    .content-card-body h2, .content-card-body h3 { font-size: 1.15rem; font-weight: 700; margin-bottom: 0.8rem; line-height: 1.4; }
    .content-card-body p { font-size: 0.9rem; color: var(--text-secondary); line-height: 1.7; font-weight: 300; }

    .coming-soon { text-align: center; padding: 4rem 2rem; }
    .coming-soon-icon { width: 100px; height: 100px; border: 2px solid var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; }
    .coming-soon-icon i { font-size: 2.5rem; color: var(--accent); }
    .coming-soon h2, .coming-soon h3 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1rem; }
    .coming-soon p { font-size: 1rem; color: var(--text-secondary); line-height: 1.8; font-weight: 300; max-width: 500px; margin: 0 auto; }

    /* ===== BEFORE/AFTER ===== */
    .ba-section { max-width: 1200px; margin: 0 auto; }
    .ba-login-wall { max-width: 600px; margin: 0 auto; text-align: center; padding: 4rem 2rem; border: 1px solid var(--border); background: var(--bg-card); }
    .ba-login-wall .lock-icon { font-size: 3rem; color: var(--accent); margin-bottom: 1.5rem; opacity: 0.5; }
    .ba-login-wall h2, .ba-login-wall h3 { font-size: 1.3rem; font-weight: 700; margin-bottom: 0.8rem; }
    .ba-login-wall p { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; margin-bottom: 2rem; font-weight: 300; }
    .ba-logged-in { max-width: 800px; margin: 0 auto; }
    .ba-welcome { text-align: center; padding: 3rem 2rem; border: 1px solid var(--border); background: var(--bg-card); }
    .ba-welcome h2, .ba-welcome h3 { font-size: 1.3rem; font-weight: 700; margin-bottom: 0.8rem; }
    .ba-welcome p { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.7; font-weight: 300; }

    /* BA Gallery */
    .ba-gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 2rem; margin-top: 2rem; }
    .ba-card { background: var(--bg-card); border: 1px solid var(--border); overflow: hidden; transition: all 0.4s; }
    .ba-card:hover { border-color: rgba(200,169,126,0.3); transform: translateY(-3px); }
    .ba-card-images { display: grid; grid-template-columns: 1fr 1fr; position: relative; }
    .ba-card-images img { width: 100%; aspect-ratio: 4/3; object-fit: cover; }
    .ba-card-images .ba-label { position: absolute; bottom: 0; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; padding: 0.25rem 0.6rem; }
    .ba-card-images .ba-label-before { left: 0; background: rgba(0,0,0,0.7); color: #fff; }
    .ba-card-images .ba-label-after { left: 50%; background: var(--accent); color: var(--bg-primary); }
    .ba-card-body { padding: 1.5rem; }
    .ba-card-body .ba-card-cat { display: inline-block; padding: 0.2rem 0.6rem; border: 1px solid var(--accent); font-size: 0.65rem; letter-spacing: 0.08em; color: var(--accent); margin-bottom: 0.8rem; }
    .ba-card-body h4 { font-size: 1.05rem; font-weight: 700; margin-bottom: 0.5rem; }
    .ba-card-body p { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.6; font-weight: 300; }
    .ba-card-body .ba-card-date { font-size: 0.75rem; color: var(--text-muted); margin-top: 0.8rem; }
    .ba-empty-msg { text-align: center; padding: 4rem 2rem; color: var(--text-muted); }
    .ba-empty-msg i { font-size: 3rem; margin-bottom: 1rem; opacity: 0.3; display: block; }
    .ba-card-images { cursor: pointer; }

    /* Image Viewer Modal */
    .ba-viewer { position: fixed; inset: 0; z-index: 9999; background: rgba(0,0,0,0.95); display: none; flex-direction: column; align-items: center; justify-content: center; }
    .ba-viewer.active { display: flex; }
    .ba-viewer-close { position: absolute; top: 1.2rem; right: 1.5rem; background: none; border: none; color: #fff; font-size: 2rem; cursor: pointer; z-index: 10; opacity: 0.7; transition: opacity 0.3s; }
    .ba-viewer-close:hover { opacity: 1; }
    .ba-viewer-title { color: #fff; font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; text-align: center; letter-spacing: 0.03em; }
    .ba-viewer-images { display: flex; gap: 1rem; align-items: center; justify-content: center; max-width: 95vw; max-height: 75vh; }
    .ba-viewer-img-wrap { position: relative; flex: 1; max-width: 45vw; }
    .ba-viewer-img-wrap img { width: 100%; max-height: 75vh; object-fit: contain; border: 1px solid rgba(255,255,255,0.1); }
    .ba-viewer-img-wrap .ba-viewer-label { position: absolute; top: 0.6rem; left: 0.6rem; padding: 0.3rem 0.8rem; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em; }
    .ba-viewer-label-before { background: rgba(0,0,0,0.8); color: #fff; }
    .ba-viewer-label-after { background: var(--accent); color: var(--bg-primary); }
    .ba-viewer-desc { color: var(--text-secondary); font-size: 0.9rem; margin-top: 1rem; text-align: center; max-width: 600px; line-height: 1.6; }
    .ba-viewer-nav { display: flex; gap: 1rem; margin-top: 1.5rem; }
    .ba-viewer-nav button { background: none; border: 1px solid rgba(255,255,255,0.3); color: #fff; width: 40px; height: 40px; cursor: pointer; font-size: 1rem; transition: all 0.3s; display: flex; align-items: center; justify-content: center; }
    .ba-viewer-nav button:hover { border-color: var(--accent); color: var(--accent); }
    .ba-viewer-counter { color: var(--text-muted); font-size: 0.8rem; display: flex; align-items: center; padding: 0 1rem; }

    @media (max-width: 640px) {
      .ba-viewer-images { flex-direction: column; gap: 0.5rem; max-height: none; }
      .ba-viewer-img-wrap { max-width: 95vw; }
      .ba-viewer-img-wrap img { max-height: 38vh; }
      .ba-viewer-title { font-size: 0.95rem; margin-bottom: 0.5rem; }
    }

    @media (max-width: 640px) {
      .content-nav { gap: 0.4rem; }
      .content-nav a { padding: 0.5rem 1rem; font-size: 0.8rem; }
      .ba-login-wall { padding: 2.5rem 1.5rem; }
      .ba-login-wall h2, .ba-login-wall h3 { font-size: 1.1rem; }
      .ba-login-wall p { font-size: 0.88rem; }
      .ba-gallery { grid-template-columns: 1fr; gap: 1.5rem; }
    }
`

const contentScript = `
    // ===== BEFORE/AFTER AUTH CHECK =====
    var baSection = document.getElementById('baSection');
    if (baSection) {
      fetch('/api/auth/me').then(function(r) { return r.json(); }).then(function(data) {
        if (data.loggedIn) {
          document.getElementById('baLoginWall').style.display = 'none';
          document.getElementById('baLoggedIn').style.display = 'block';
          document.getElementById('baWelcome').textContent = data.user.nickname + '님, 환영합니다!';
          loadBAGallery();
        }
      }).catch(function() {});
    }

    var baItems = [];
    var viewerIndex = 0;

    function loadBAGallery() {
      fetch('/api/ba/list').then(function(r) { return r.json(); }).then(function(data) {
        var gallery = document.getElementById('baGallery');
        if (!data.items || data.items.length === 0) {
          gallery.innerHTML = '<div class="ba-empty-msg"><i class="fas fa-camera"></i>등록된 치료 전후 사진이 없습니다.<br>곧 업데이트 예정입니다.</div>';
          return;
        }
        baItems = data.items;
        gallery.innerHTML = data.items.map(function(item, idx) {
          return '<div class="ba-card">' +
            '<div class="ba-card-images" onclick="openViewer(' + idx + ')">' +
              '<img src="' + item.beforeUrl + '" alt="치료 전" loading="lazy">' +
              '<img src="' + item.afterUrl + '" alt="치료 후" loading="lazy">' +
              '<span class="ba-label ba-label-before">BEFORE</span>' +
              '<span class="ba-label ba-label-after">AFTER</span>' +
            '</div>' +
            '<div class="ba-card-body">' +
              '<span class="ba-card-cat">' + (item.categoryName || '') + '</span>' +
              '<h4>' + item.title + '</h4>' +
              (item.description ? '<p>' + item.description + '</p>' : '') +
              '<div class="ba-card-date">' + (item.createdAt || '') + '</div>' +
            '</div>' +
          '</div>';
        }).join('');
      }).catch(function() {
        document.getElementById('baGallery').innerHTML = '<div class="ba-empty-msg">사진을 불러오는 중 오류가 발생했습니다.</div>';
      });
    }

    function openViewer(idx) {
      viewerIndex = idx;
      renderViewer();
      document.getElementById('baViewer').classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeViewer() {
      document.getElementById('baViewer').classList.remove('active');
      document.body.style.overflow = '';
    }

    function viewerPrev() {
      if (viewerIndex > 0) { viewerIndex--; renderViewer(); }
    }

    function viewerNext() {
      if (viewerIndex < baItems.length - 1) { viewerIndex++; renderViewer(); }
    }

    function renderViewer() {
      var item = baItems[viewerIndex];
      if (!item) return;
      document.getElementById('viewerTitle').textContent = item.title;
      document.getElementById('viewerBefore').src = item.beforeUrl;
      document.getElementById('viewerAfter').src = item.afterUrl;
      document.getElementById('viewerDesc').textContent = item.description || '';
      document.getElementById('viewerDesc').style.display = item.description ? 'block' : 'none';
      document.getElementById('viewerCounter').textContent = (viewerIndex + 1) + ' / ' + baItems.length;
      document.getElementById('viewerPrevBtn').style.opacity = viewerIndex === 0 ? '0.3' : '1';
      document.getElementById('viewerNextBtn').style.opacity = viewerIndex === baItems.length - 1 ? '0.3' : '1';
    }

    document.addEventListener('keydown', function(e) {
      var viewer = document.getElementById('baViewer');
      if (!viewer || !viewer.classList.contains('active')) return;
      if (e.key === 'Escape') closeViewer();
      if (e.key === 'ArrowLeft') viewerPrev();
      if (e.key === 'ArrowRight') viewerNext();
    });
`

export function contentPage(): string {
  const body = `
  <div class="page-header">
    <div class="section-label reveal">Contents</div>
    <h1 class="page-header-title reveal reveal-delay-1">콘텐츠</h1>
    <p class="page-header-desc reveal reveal-delay-2">
      태평가이드치과에서 제공하는 치과 관련 유용한 콘텐츠입니다.
    </p>
  </div>

  <!-- CONTENT NAV -->
  <section style="background:var(--bg-primary);padding-bottom:2rem;">
    <div class="content-nav reveal">
      <a href="/content" class="active">전체</a>
      <a href="/content/before-after">치료 전후</a>
      <a href="#" onclick="return false" style="opacity:0.4;cursor:default;">치아 관리 팁</a>
      <a href="#" onclick="return false" style="opacity:0.4;cursor:default;">치료 가이드</a>
    </div>
  </section>

  <section style="background:var(--bg-primary);padding-top:0;">
    <div class="coming-soon reveal">
      <div class="coming-soon-icon">
        <i class="fas fa-pen-fancy"></i>
      </div>
      <h2>콘텐츠 준비 중입니다</h2>
      <p>
        환자분들께 도움이 되는 치과 관련 콘텐츠를 준비하고 있습니다.<br>
        치아 관리 팁, 치료 가이드, 건강 정보 등 유용한 내용을 곧 만나보실 수 있습니다.
      </p>
    </div>

    <div class="content-grid" style="margin-top:4rem;">
      <a href="/content/before-after" class="content-card reveal" style="text-decoration:none;color:inherit;">
        <div class="content-card-thumb"><i class="fas fa-images"></i></div>
        <div class="content-card-body">
          <div class="content-card-tag">회원 전용</div>
          <h2>치료 전후 사진</h2>
          <p>실제 치료 전후 사진을 통해 진료 결과를 확인하실 수 있습니다.</p>
        </div>
      </a>
      <div class="content-card reveal reveal-delay-1">
        <div class="content-card-thumb"><i class="fas fa-tooth"></i></div>
        <div class="content-card-body">
          <div class="content-card-tag">Coming Soon</div>
          <h2>임플란트, 언제 해야 할까?</h2>
          <p>임플란트 치료 시기와 준비 사항에 대해 알려드립니다.</p>
        </div>
      </div>
      <div class="content-card reveal reveal-delay-2">
        <div class="content-card-thumb"><i class="fas fa-shield-halved"></i></div>
        <div class="content-card-body">
          <div class="content-card-tag">Coming Soon</div>
          <h2>충치, 초기에 잡으면 간단합니다</h2>
          <p>충치의 진행 단계와 초기 치료의 중요성을 설명합니다.</p>
        </div>
      </div>
    </div>
  </section>
  `

  return layout(body, {
    title: '콘텐츠 | 태평가이드치과',
    description: '태평가이드치과의 치과 관련 콘텐츠 - 치아 관리 팁, 치료 가이드, 건강 정보',
    activePage: 'content',
    extraStyles: contentStyles,
  })
}

export function beforeAfterPage(): string {
  const body = `
  <div class="page-header">
    <div class="section-label reveal">Contents</div>
    <h1 class="page-header-title reveal reveal-delay-1">치료 전후 사진</h1>
    <p class="page-header-desc reveal reveal-delay-2">
      실제 치료 전후 사진을 통해 진료 결과를 확인하실 수 있습니다.
    </p>
  </div>

  <!-- CONTENT NAV -->
  <section style="background:var(--bg-primary);padding-bottom:2rem;">
    <div class="content-nav reveal">
      <a href="/content">전체</a>
      <a href="/content/before-after" class="active">치료 전후</a>
      <a href="#" onclick="return false" style="opacity:0.4;cursor:default;">치아 관리 팁</a>
      <a href="#" onclick="return false" style="opacity:0.4;cursor:default;">치료 가이드</a>
    </div>
  </section>

  <section style="background:var(--bg-primary);padding-top:0;" id="baSection">
    <div class="ba-section">
      <!-- 비로그인 -->
      <div class="ba-login-wall reveal" id="baLoginWall">
        <div class="lock-icon"><i class="fas fa-lock"></i></div>
        <h2>회원 전용 콘텐츠입니다</h2>
        <p>치료 전후 사진은 로그인한 회원만 열람하실 수 있습니다.<br>간편 로그인으로 바로 확인해보세요.</p>
        <div class="social-login-buttons">
          <a href="/api/auth/kakao" onclick="document.cookie='auth_return='+encodeURIComponent(location.pathname)+';path=/;max-age=300'" class="social-btn kakao" style="text-decoration:none;display:inline-flex;">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#191919" d="M12 3C6.48 3 2 6.36 2 10.5c0 2.61 1.74 4.91 4.36 6.22l-1.1 4.07c-.1.35.31.64.62.44l4.85-3.19c.42.04.84.06 1.27.06 5.52 0 10-3.36 10-7.5S17.52 3 12 3z"/></svg>
            카카오로 시작하기
          </a>
          <a href="/api/auth/naver" onclick="document.cookie='auth_return='+encodeURIComponent(location.pathname)+';path=/;max-age=300'" class="social-btn naver-login" style="text-decoration:none;display:inline-flex;">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#fff" d="M16.27 10.5L7.73 3H3v18h4.73V13.5L16.27 21H21V3h-4.73z"/></svg>
            네이버로 시작하기
          </a>
          <a href="/api/auth/google" onclick="return checkProvider('google')" class="social-btn google" style="text-decoration:none;display:inline-flex;">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google로 시작하기
          </a>
        </div>
      </div>

      <!-- 로그인됨 -->
      <div class="ba-logged-in" id="baLoggedIn" style="display:none;">
        <div class="ba-welcome reveal">
          <div style="font-size:2.5rem;margin-bottom:1rem;">👋</div>
          <h2 id="baWelcome"></h2>
          <p style="margin-top:0.5rem;" id="baSubtext">치료 전후 사진을 확인해보세요.</p>
        </div>
        <div id="baGallery" class="ba-gallery"></div>
      </div>

      <!-- Image Viewer Modal -->
      <div class="ba-viewer" id="baViewer" onclick="if(event.target===this)closeViewer()">
        <button class="ba-viewer-close" onclick="closeViewer()"><i class="fas fa-times"></i></button>
        <div class="ba-viewer-title" id="viewerTitle"></div>
        <div class="ba-viewer-images">
          <div class="ba-viewer-img-wrap">
            <span class="ba-viewer-label ba-viewer-label-before">BEFORE</span>
            <img id="viewerBefore" src="" alt="치료 전">
          </div>
          <div class="ba-viewer-img-wrap">
            <span class="ba-viewer-label ba-viewer-label-after">AFTER</span>
            <img id="viewerAfter" src="" alt="치료 후">
          </div>
        </div>
        <div class="ba-viewer-desc" id="viewerDesc"></div>
        <div class="ba-viewer-nav">
          <button id="viewerPrevBtn" onclick="viewerPrev()"><i class="fas fa-chevron-left"></i></button>
          <span class="ba-viewer-counter" id="viewerCounter"></span>
          <button id="viewerNextBtn" onclick="viewerNext()"><i class="fas fa-chevron-right"></i></button>
        </div>
      </div>
    </div>
  </section>
  `

  return layout(body, {
    title: '치료 전후 사진 | 태평가이드치과',
    description: '태평가이드치과의 실제 치료 전후 사진을 확인하세요.',
    activePage: 'content',
    extraStyles: contentStyles,
    extraScripts: contentScript,
  })
}
