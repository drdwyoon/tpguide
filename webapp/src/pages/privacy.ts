import { layout } from '../components/layout'

export function privacyPage(): string {
  const extraStyles = `
    .privacy-content { max-width: 800px; margin: 0 auto; }
    .privacy-content h2 { font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1rem; color: var(--accent); }
    .privacy-content h3 { font-size: 1.1rem; font-weight: 600; margin: 2rem 0 0.8rem; }
    .privacy-content p, .privacy-content li { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.9; font-weight: 300; }
    .privacy-content ul { margin-left: 1.5rem; margin-bottom: 1rem; }
    .privacy-content li { margin-bottom: 0.4rem; }
    .privacy-content table { width: 100%; border-collapse: collapse; margin: 1rem 0 2rem; }
    .privacy-content th, .privacy-content td { padding: 0.8rem 1rem; border: 1px solid var(--border); font-size: 0.9rem; text-align: left; }
    .privacy-content th { background: var(--bg-card); color: var(--accent); font-weight: 600; font-size: 0.8rem; letter-spacing: 0.05em; }
    .privacy-content td { color: var(--text-secondary); font-weight: 300; line-height: 1.6; }
    .privacy-date { margin-top: 4rem; padding-top: 2rem; border-top: 1px solid var(--border); font-size: 0.85rem; color: var(--text-muted); }
  `

  const body = `
  <div class="page-header">
    <div class="section-label reveal">Privacy Policy</div>
    <h1 class="page-header-title reveal reveal-delay-1">개인정보처리방침</h1>
    <p class="page-header-desc reveal reveal-delay-2">
      태평가이드치과는 환자분의 개인정보를 소중히 보호합니다.
    </p>
  </div>

  <section style="background:var(--bg-primary);">
    <div class="privacy-content reveal">

      <h2>1. 개인정보의 수집 및 이용 목적</h2>
      <p>태평가이드치과(이하 "본원")는 다음의 목적을 위해 개인정보를 수집하고 이용합니다.</p>
      <ul>
        <li>온라인 상담 신청 접수 및 회신</li>
        <li>진료 예약 및 안내</li>
        <li>환자 본인 확인 및 연락</li>
      </ul>

      <h2>2. 수집하는 개인정보 항목</h2>
      <table>
        <tr>
          <th>수집 항목</th>
          <th>수집 목적</th>
          <th>보유 기간</th>
        </tr>
        <tr>
          <td>이름, 연락처(전화번호)</td>
          <td>상담 신청 접수, 회신 연락</td>
          <td>상담 완료 후 1년</td>
        </tr>
        <tr>
          <td>관심 진료과목, 증상 내용</td>
          <td>맞춤 상담 제공</td>
          <td>상담 완료 후 1년</td>
        </tr>
      </table>

      <h2>3. 개인정보의 보유 및 이용 기간</h2>
      <p>본원은 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 
         단, 관련 법령에 의해 보존할 필요가 있는 경우에는 해당 법령에서 정한 기간 동안 보존합니다.</p>
      <ul>
        <li>의료법에 의한 진료기록 보존: 10년</li>
        <li>전자상거래 등에서의 소비자 보호에 관한 법률: 3년</li>
      </ul>

      <h2>4. 개인정보의 제3자 제공</h2>
      <p>본원은 환자분의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.</p>
      <ul>
        <li>환자분이 사전에 동의한 경우</li>
        <li>법령의 규정에 의하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
      </ul>

      <h2>5. 개인정보의 파기 절차 및 방법</h2>
      <p>본원은 원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</p>
      <ul>
        <li><strong>전자적 파일:</strong> 복구할 수 없는 기술적 방법을 사용하여 삭제</li>
        <li><strong>종이 문서:</strong> 분쇄기로 분쇄하거나 소각하여 파기</li>
      </ul>

      <h2>6. 개인정보 보호책임자</h2>
      <table>
        <tr>
          <th>구분</th>
          <th>내용</th>
        </tr>
        <tr>
          <td>책임자</td>
          <td>윤정한 원장</td>
        </tr>
        <tr>
          <td>연락처</td>
          <td>031-751-7528</td>
        </tr>
        <tr>
          <td>주소</td>
          <td>경기 성남시 수정구 수정로118 5층 501호</td>
        </tr>
      </table>

      <h2>7. 정보주체의 권리</h2>
      <p>환자분은 언제든지 다음의 권리를 행사할 수 있습니다.</p>
      <ul>
        <li>개인정보 열람 요구</li>
        <li>오류 등이 있을 경우 정정 요구</li>
        <li>삭제 요구</li>
        <li>처리정지 요구</li>
      </ul>
      <p>위 권리 행사는 본원에 전화(031-751-7528) 또는 방문을 통해 하실 수 있으며, 본원은 이에 대해 지체 없이 조치하겠습니다.</p>

      <h2>8. 개인정보의 안전성 확보 조치</h2>
      <p>본원은 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.</p>
      <ul>
        <li>개인정보 접근 권한 제한</li>
        <li>개인정보를 처리하는 시스템에 대한 접근 통제</li>
        <li>개인정보의 암호화</li>
      </ul>

      <div class="privacy-date">
        <p>본 개인정보처리방침은 2025년 1월 1일부터 시행됩니다.</p>
        <p>태평가이드치과</p>
      </div>

    </div>
  </section>
  `

  return layout(body, {
    title: '개인정보처리방침 | 태평가이드치과',
    description: '태평가이드치과 개인정보처리방침',
    activePage: '',
    extraStyles,
  })
}
