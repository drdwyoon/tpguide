import { layout } from '../components/layout'

const infoStyles = `
    /* ===== LOCATION ===== */
    .location-content { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; max-width: 1200px; margin: 0 auto; }
    .location-map { aspect-ratio: 4/3; background: var(--bg-card); border: 1px solid var(--border); overflow: hidden; }
    .location-map iframe { width: 100%; height: 100%; border: none; }
    .location-details { padding-top: 1rem; }
    .location-item { padding: 1.5rem 0; border-bottom: 1px solid var(--border); }
    .location-item:last-child { border-bottom: none; }
    .location-item-label { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.5rem; font-weight: 600; }
    .location-item-value { font-size: 1rem; color: var(--text-primary); font-weight: 400; line-height: 1.6; }
    .location-item-value a { color: var(--accent); text-decoration: none; transition: opacity 0.3s; }
    .location-item-value a:hover { opacity: 0.8; }
    .hours-table { width: 100%; }
    .hours-table tr td { padding: 0.3rem 0; font-size: 0.9rem; }
    .hours-table tr td:first-child { color: var(--text-secondary); width: 80px; font-weight: 400; }
    .hours-table tr td:last-child { color: var(--text-primary); font-weight: 500; }
    .hours-table tr.holiday td { color: #e74c3c; }

    /* ===== CONSULTATION ===== */
    .consult-content { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; max-width: 1200px; margin: 0 auto; align-items: start; }
    .consult-info h3 { font-size: 1.8rem; font-weight: 700; margin-bottom: 1rem; line-height: 1.4; }
    .consult-info p { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 2rem; font-weight: 300; }
    .consult-features { list-style: none; }
    .consult-features li { display: flex; align-items: center; gap: 1rem; padding: 0.8rem 0; font-size: 0.9rem; color: var(--text-secondary); }
    .consult-features li i { color: var(--accent); width: 20px; text-align: center; }
    .consult-form { background: var(--bg-card); border: 1px solid var(--border); padding: 3rem; }

    @media (max-width: 1024px) {
      .location-content { grid-template-columns: 1fr; gap: 2rem; }
      .consult-content { grid-template-columns: 1fr; gap: 3rem; }
    }
    @media (max-width: 640px) {
      .consult-form { padding: 1.5rem; }
      .consult-info h3 { font-size: 1.3rem; }
      .location-map { aspect-ratio: 16/10; }
      .hours-table tr td { font-size: 0.85rem; }
    }
`

const consultScript = `
    function submitConsultation() {
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const privacy = document.getElementById('privacy').checked;

      if (!name) { alert('이름을 입력해주세요.'); return; }
      if (!phone) { alert('연락처를 입력해주세요.'); return; }
      if (!privacy) { alert('개인정보 수집에 동의해주세요.'); return; }

      const treatment = document.getElementById('treatment').value;
      const symptoms = document.getElementById('symptoms').value.trim();

      fetch('/api/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, treatment, symptoms })
      }).then(r => r.json()).then(data => {
        document.getElementById('formContent').style.display = 'none';
        document.getElementById('formSuccess').classList.add('show');
      }).catch(() => {
        document.getElementById('formContent').style.display = 'none';
        document.getElementById('formSuccess').classList.add('show');
      });
    }


`

export function infoPage(): string {
  const body = `
  <div class="page-header">
    <div class="section-label reveal">Hospital Info</div>
    <h1 class="page-header-title reveal reveal-delay-1">병원안내</h1>
    <p class="page-header-desc reveal reveal-delay-2">
      오시는 길, 진료시간, 상담 안내 등 태평가이드치과 이용 정보입니다.
    </p>
  </div>

  <!-- LOCATION -->
  <section style="background:var(--bg-primary);" id="location">
    <div class="section-label reveal" style="max-width:1200px;margin:0 auto 3rem">Location</div>
    <h2 class="section-title reveal reveal-delay-1" style="max-width:1200px;margin:0 auto 4rem">오시는 길</h2>
    <div class="location-content">
      <div class="location-map reveal">
        <iframe src="https://maps.google.com/maps?q=%ED%83%9C%ED%8F%89%EA%B0%80%EC%9D%B4%EB%93%9C%EC%B9%98%EA%B3%BC%EC%9D%98%EC%9B%90&t=&z=17&ie=UTF8&iwloc=&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div class="location-details reveal reveal-delay-1">
        <div class="location-item">
          <div class="location-item-label">주소</div>
          <div class="location-item-value">
            경기 성남시 수정구 수정로118 5층 501호
            <br><a href="https://naver.me/5Jp92GAV" target="_blank"><i class="fas fa-external-link-alt" style="font-size:0.8rem"></i> 네이버 지도에서 보기</a>
          </div>
        </div>
        <div class="location-item">
          <div class="location-item-label">전화</div>
          <div class="location-item-value">
            <a href="tel:031-751-7528">031-751-7528</a>
          </div>
        </div>
        <div class="location-item">
          <div class="location-item-label">진료시간</div>
          <div class="location-item-value">
            <table class="hours-table">
              <tr><td>월</td><td>09:30 - 18:30</td></tr>
              <tr><td>화</td><td>09:30 - 20:30 <span style="color:var(--accent);font-size:0.8rem">(야간진료)</span></td></tr>
              <tr><td>수</td><td>09:30 - 18:30</td></tr>
              <tr><td>목</td><td>09:30 - 18:30</td></tr>
              <tr class="holiday"><td>금</td><td>휴진</td></tr>
              <tr><td>토</td><td>09:30 - 13:30</td></tr>
              <tr class="holiday"><td>일/공휴일</td><td>휴진</td></tr>
            </table>
          </div>
        </div>
        <div class="location-item">
          <div class="location-item-label">온라인 상담</div>
          <div class="location-item-value">
            <a href="http://talk.naver.com/w4arrp?frm=mnmb&frm=nmb_detail" target="_blank"><i class="fas fa-comment" style="font-size:0.9rem"></i> 네이버 톡톡으로 문의하기</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CONSULTATION FORM -->
  <section style="background:var(--bg-secondary);" id="consult">
    <div class="section-label reveal" style="max-width:1200px;margin:0 auto 3rem">Consultation</div>
    <h2 class="section-title reveal reveal-delay-1" style="max-width:1200px;margin:0 auto 4rem">상담 신청</h2>
    <div class="consult-content">
      <div class="consult-info reveal">
        <h3>편하게 문의해주세요.<br>친절하게 안내드리겠습니다.</h3>
        <p>궁금한 점이 있으시거나 진료 상담이 필요하시면 아래 폼을 통해 신청해주세요. 확인 후 빠르게 연락드리겠습니다.</p>
        <ul class="consult-features">
          <li><i class="fas fa-check"></i>상담 내용은 비밀이 보장됩니다</li>
          <li><i class="fas fa-check"></i>접수 후 빠른 시간 내 회신드립니다</li>
          <li><i class="fas fa-check"></i>전화 상담도 가능합니다</li>
        </ul>
        <div style="margin-top:2rem;display:flex;flex-direction:column;gap:1rem">
          <a href="tel:031-751-7528" class="btn-primary" style="width:fit-content">
            <i class="fas fa-phone"></i> 031-751-7528
          </a>
          <a href="http://talk.naver.com/w4arrp?frm=mnmb&frm=nmb_detail" target="_blank" class="btn-ghost" style="width:fit-content">
            <i class="fas fa-comment"></i> 네이버 톡톡 상담
          </a>
        </div>
      </div>
      <div class="consult-form reveal reveal-delay-1" id="consultForm">
        <div id="formContent">
          <div class="form-group">
            <label for="name">이름 *</label>
            <input type="text" id="name" placeholder="홍길동" required>
          </div>
          <div class="form-group">
            <label for="phone">연락처 *</label>
            <input type="tel" id="phone" placeholder="010-0000-0000" required>
          </div>
          <div class="form-group">
            <label for="treatment">관심 진료</label>
            <select id="treatment">
              <option value="">선택해주세요</option>
              <option value="implant">임플란트</option>
              <option value="cosmetic">심미보철</option>
              <option value="cavity">충치치료</option>
              <option value="pediatric">소아치과</option>
              <option value="gum">잇몸치료</option>
              <option value="other">기타</option>
            </select>
          </div>
          <div class="form-group">
            <label for="symptoms">증상 및 문의사항</label>
            <textarea id="symptoms" placeholder="현재 증상이나 궁금한 점을 자유롭게 적어주세요."></textarea>
          </div>
          <div class="form-privacy">
            <input type="checkbox" id="privacy">
            <label for="privacy"><a href="/privacy" target="_blank" style="color:var(--accent);text-decoration:underline;">개인정보 수집 및 이용</a>에 동의합니다.</label>
          </div>
          <button class="form-submit" id="submitBtn" onclick="submitConsultation()">
            상담 신청하기
          </button>
        </div>
        <div class="form-success" id="formSuccess">
          <i class="fas fa-check-circle"></i>
          <h3>상담 신청이 완료되었습니다</h3>
          <p>확인 후 빠른 시간 내에 연락드리겠습니다.<br>감사합니다.</p>
        </div>
      </div>
    </div>
  </section>


  `

  return layout(body, {
    title: '병원안내 | 태평가이드치과',
    description: '태평가이드치과 오시는길, 진료시간, 상담 안내 - 경기 성남시 수정구 수정로118 5층 501호',
    activePage: 'info',
    extraStyles: infoStyles,
    extraScripts: consultScript,
  })
}
