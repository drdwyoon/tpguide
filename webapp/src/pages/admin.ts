import { layout } from '../components/layout'

const adminStyles = `
  .admin { padding: 10rem 4rem 6rem; max-width: 900px; margin: 0 auto; }
  .admin-title { font-size: 1.8rem; font-weight: 900; margin-bottom: 0.5rem; }
  .admin-sub { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 3rem; }

  /* Login */
  .admin-login { max-width: 400px; margin: 0 auto; text-align: center; }
  .admin-login h2 { font-size: 1.3rem; margin-bottom: 0.5rem; }
  .admin-login p { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 2rem; }
  .admin-login input { width: 100%; padding: 0.9rem 1rem; background: var(--bg-primary); border: 1px solid var(--border); color: var(--text-primary); font-family: inherit; font-size: 0.9rem; outline: none; margin-bottom: 1rem; }
  .admin-login input:focus { border-color: var(--accent); }
  .admin-login button { width: 100%; padding: 0.9rem; background: var(--accent); color: var(--bg-primary); border: none; font-weight: 700; cursor: pointer; font-size: 0.9rem; }
  .admin-login .error { color: #e74c3c; font-size: 0.85rem; margin-top: 0.5rem; display: none; }

  /* Upload */
  .upload-card { background: var(--bg-card); border: 1px solid var(--border); padding: 2rem; margin-bottom: 2rem; }
  .upload-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 1.5rem; color: var(--accent); letter-spacing: 0.05em; }
  .upload-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
  .upload-box { border: 2px dashed var(--border); padding: 2rem; text-align: center; cursor: pointer; transition: all 0.3s; position: relative; min-height: 180px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .upload-box:hover { border-color: var(--accent); }
  .upload-box.has-image { padding: 0; border-style: solid; }
  .upload-box img { width: 100%; height: 100%; object-fit: cover; position: absolute; inset: 0; }
  .upload-box input[type="file"] { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
  .upload-box i { font-size: 2rem; color: var(--text-muted); margin-bottom: 0.5rem; }
  .upload-box span { font-size: 0.8rem; color: var(--text-muted); }
  .upload-box .label { position: absolute; top: 0.5rem; left: 0.5rem; background: var(--accent); color: var(--bg-primary); font-size: 0.65rem; padding: 0.2rem 0.5rem; font-weight: 700; z-index: 1; }

  .upload-fields { margin-bottom: 1.5rem; }
  .upload-fields input, .upload-fields select, .upload-fields textarea { width: 100%; padding: 0.8rem 1rem; background: var(--bg-primary); border: 1px solid var(--border); color: var(--text-primary); font-family: inherit; font-size: 0.9rem; outline: none; margin-bottom: 0.8rem; }
  .upload-fields input:focus, .upload-fields select:focus, .upload-fields textarea:focus { border-color: var(--accent); }
  .upload-fields textarea { resize: vertical; min-height: 80px; }
  .upload-fields select { cursor: pointer; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23c8a97e' d='M6 8L1 3h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; }
  .upload-btn { width: 100%; padding: 1rem; background: var(--accent); color: var(--bg-primary); border: none; font-size: 0.95rem; font-weight: 700; cursor: pointer; transition: all 0.3s; }
  .upload-btn:hover { filter: brightness(1.1); }
  .upload-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .upload-msg { margin-top: 1rem; padding: 0.8rem; text-align: center; font-size: 0.85rem; display: none; }
  .upload-msg.success { display: block; background: rgba(200,169,126,0.1); border: 1px solid var(--accent); color: var(--accent); }
  .upload-msg.error { display: block; background: rgba(255,80,80,0.1); border: 1px solid #f55; color: #f55; }

  /* List */
  .ba-list { margin-top: 2rem; }
  .ba-list h3 { font-size: 1rem; font-weight: 700; margin-bottom: 1.5rem; color: var(--accent); letter-spacing: 0.05em; }
  .ba-item { display: grid; grid-template-columns: 180px 1fr auto; gap: 1.5rem; align-items: center; padding: 1.5rem; background: var(--bg-card); border: 1px solid var(--border); margin-bottom: 1rem; }
  .ba-item-images { display: flex; gap: 0.5rem; }
  .ba-item-images img { width: 80px; height: 60px; object-fit: cover; border: 1px solid var(--border); }
  .ba-item-info h4 { font-size: 0.95rem; font-weight: 600; margin-bottom: 0.3rem; }
  .ba-item-info span { font-size: 0.8rem; color: var(--text-muted); }
  .ba-item-delete { background: none; border: 1px solid #e74c3c; color: #e74c3c; padding: 0.5rem 1rem; font-size: 0.8rem; cursor: pointer; transition: all 0.3s; }
  .ba-item-delete:hover { background: #e74c3c; color: #fff; }
  .ba-empty { text-align: center; padding: 3rem; color: var(--text-muted); font-size: 0.9rem; }

  @media (max-width: 768px) {
    .admin { padding: 7rem 1.2rem 4rem; }
    .upload-row { grid-template-columns: 1fr; }
    .ba-item { grid-template-columns: 1fr; gap: 1rem; }
  }
`

const adminScript = `
  var adminToken = localStorage.getItem('admin_token');
  
  if (adminToken) {
    showAdminPanel();
  }

  function adminLogin() {
    var pw = document.getElementById('adminPw').value;
    if (!pw) return;
    
    fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw })
    }).then(r => r.json()).then(data => {
      if (data.success) {
        localStorage.setItem('admin_token', data.token);
        adminToken = data.token;
        showAdminPanel();
      } else {
        document.getElementById('loginError').style.display = 'block';
      }
    });
  }

  function showAdminPanel() {
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'block';
    loadBAList();
  }

  function adminLogout() {
    localStorage.removeItem('admin_token');
    adminToken = null;
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('adminLogin').style.display = 'block';
    document.getElementById('adminPw').value = '';
  }

  // File preview
  function previewFile(input, previewId) {
    var file = input.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('5MB 이하의 이미지만 업로드 가능합니다.'); input.value=''; return; }
    var reader = new FileReader();
    reader.onload = function(e) {
      var box = input.closest('.upload-box');
      var existing = box.querySelector('img');
      if (existing) existing.remove();
      var img = document.createElement('img');
      img.src = e.target.result;
      box.appendChild(img);
      box.classList.add('has-image');
    };
    reader.readAsDataURL(file);
  }

  // Upload
  function uploadBA() {
    var beforeInput = document.getElementById('beforeFile');
    var afterInput = document.getElementById('afterFile');
    var title = document.getElementById('baTitle').value.trim();
    var category = document.getElementById('baCategory').value;
    var desc = document.getElementById('baDesc').value.trim();

    if (!beforeInput.files[0] || !afterInput.files[0]) { alert('비포/애프터 사진을 모두 선택해주세요.'); return; }
    if (!title) { alert('제목을 입력해주세요.'); return; }

    var btn = document.getElementById('uploadBtn');
    btn.disabled = true; btn.textContent = '업로드 중...';

    // Read both files as base64
    Promise.all([readAsBase64(beforeInput.files[0]), readAsBase64(afterInput.files[0])])
      .then(function(results) {
        return fetch('/api/admin/ba/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Admin-Token': adminToken },
          body: JSON.stringify({
            title: title,
            category: category,
            description: desc,
            beforeImage: results[0],
            afterImage: results[1]
          })
        });
      })
      .then(r => r.json())
      .then(data => {
        btn.disabled = false; btn.textContent = '업로드';
        var msg = document.getElementById('uploadMsg');
        if (data.success) {
          msg.className = 'upload-msg success';
          msg.textContent = '업로드 완료!';
          // Reset form
          beforeInput.value = ''; afterInput.value = '';
          document.getElementById('baTitle').value = '';
          document.getElementById('baDesc').value = '';
          document.querySelectorAll('.upload-box').forEach(function(b) { 
            var img = b.querySelector('img'); if (img) img.remove(); 
            b.classList.remove('has-image'); 
          });
          loadBAList();
        } else {
          msg.className = 'upload-msg error';
          msg.textContent = data.error || '업로드 실패';
        }
        setTimeout(function() { msg.className = 'upload-msg'; msg.textContent = ''; }, 3000);
      })
      .catch(function() {
        btn.disabled = false; btn.textContent = '업로드';
      });
  }

  function readAsBase64(file) {
    return new Promise(function(resolve) {
      var reader = new FileReader();
      reader.onload = function() { resolve(reader.result); };
      reader.readAsDataURL(file);
    });
  }

  // Load list
  function loadBAList() {
    fetch('/api/admin/ba/list', { headers: { 'X-Admin-Token': adminToken } })
      .then(r => r.json())
      .then(data => {
        var container = document.getElementById('baListContainer');
        if (!data.items || data.items.length === 0) {
          container.innerHTML = '<div class="ba-empty">등록된 사진이 없습니다.</div>';
          return;
        }
        container.innerHTML = data.items.map(function(item) {
          return '<div class="ba-item">' +
            '<div class="ba-item-images">' +
              '<img src="' + item.beforeThumb + '" alt="before">' +
              '<img src="' + item.afterThumb + '" alt="after">' +
            '</div>' +
            '<div class="ba-item-info">' +
              '<h4>' + item.title + '</h4>' +
              '<span>' + (item.category || '') + ' · ' + (item.createdAt || '') + '</span>' +
            '</div>' +
            '<button class="ba-item-delete" onclick="deleteBA(\\'' + item.id + '\\')">삭제</button>' +
          '</div>';
        }).join('');
      });
  }

  function deleteBA(id) {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    fetch('/api/admin/ba/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Admin-Token': adminToken },
      body: JSON.stringify({ id: id })
    }).then(r => r.json()).then(function(data) {
      if (data.success) loadBAList();
      else alert('삭제 실패');
    });
  }

  document.getElementById('adminPw').addEventListener('keyup', function(e) {
    if (e.key === 'Enter') adminLogin();
  });
`

export function adminPage(): string {
  const body = `
    <div class="admin">
      <h1 class="admin-title">관리자</h1>
      <p class="admin-sub">치료 전후 사진을 관리합니다.</p>

      <!-- Admin Login -->
      <div id="adminLogin">
        <div class="admin-login">
          <h2><i class="fas fa-lock" style="color:var(--accent);margin-right:0.5rem;"></i>관리자 인증</h2>
          <p>관리자 비밀번호를 입력해주세요.</p>
          <input type="password" id="adminPw" placeholder="비밀번호">
          <button onclick="adminLogin()">로그인</button>
          <div class="error" id="loginError">비밀번호가 올바르지 않습니다.</div>
        </div>
      </div>

      <!-- Admin Panel -->
      <div id="adminPanel" style="display:none;">
        <div style="display:flex;justify-content:flex-end;margin-bottom:1.5rem;">
          <button onclick="adminLogout()" style="background:none;border:1px solid var(--text-muted);color:var(--text-muted);padding:0.5rem 1.2rem;font-size:0.8rem;cursor:pointer;transition:all 0.3s;font-family:inherit;"
            onmouseover="this.style.borderColor='#e74c3c';this.style.color='#e74c3c'" onmouseout="this.style.borderColor='';this.style.color=''"><i class="fas fa-sign-out-alt" style="margin-right:0.4rem;"></i>로그아웃</button>
        </div>
        <div class="upload-card">
          <h3><i class="fas fa-camera" style="margin-right:0.5rem;"></i>새 사진 등록</h3>
          <div class="upload-row">
            <div class="upload-box">
              <span class="label">BEFORE</span>
              <i class="fas fa-cloud-upload-alt"></i>
              <span>클릭하여 사진 선택</span>
              <input type="file" id="beforeFile" accept="image/*" onchange="previewFile(this, 'beforePreview')">
            </div>
            <div class="upload-box">
              <span class="label">AFTER</span>
              <i class="fas fa-cloud-upload-alt"></i>
              <span>클릭하여 사진 선택</span>
              <input type="file" id="afterFile" accept="image/*" onchange="previewFile(this, 'afterPreview')">
            </div>
          </div>
          <div class="upload-fields">
            <input type="text" id="baTitle" placeholder="제목 (예: 앞니 심미보철)">
            <select id="baCategory">
              <option value="implant">임플란트</option>
              <option value="cosmetic">심미보철</option>
              <option value="cavity">충치치료</option>
              <option value="gum">잇몸치료</option>
              <option value="other">기타</option>
            </select>
            <textarea id="baDesc" placeholder="설명 (선택사항)"></textarea>
          </div>
          <button class="upload-btn" id="uploadBtn" onclick="uploadBA()">업로드</button>
          <div class="upload-msg" id="uploadMsg"></div>
        </div>

        <div class="ba-list">
          <h3><i class="fas fa-images" style="margin-right:0.5rem;"></i>등록된 사진</h3>
          <div id="baListContainer">
            <div class="ba-empty">로딩 중...</div>
          </div>
        </div>
      </div>
    </div>
  `

  return layout(body, {
    title: '관리자 | 태평가이드치과',
    description: '관리자 페이지',
    extraStyles: adminStyles,
    extraScripts: adminScript,
  })
}
