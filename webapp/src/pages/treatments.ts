import { layout } from '../components/layout'

interface TreatmentDetail {
  id: string
  icon: string
  title: string
  subtitle: string
  description: string
  features: string[]
  process: { step: string; desc: string }[]
  faq: { q: string; a: string }[]
}

const treatments: TreatmentDetail[] = [
  {
    id: 'implant',
    icon: 'fas fa-tooth',
    title: '임플란트',
    subtitle: 'Implant',
    description: '상실된 치아를 자연치아와 유사하게 회복하는 치료입니다. 정밀 진단과 디지털 가이드 수술로 안전하고 정확한 임플란트 치료를 제공합니다.',
    features: [
      '3D CT 촬영을 통한 정밀 진단',
      '디지털 가이드 수술 시스템',
      '맞춤형 보철물 제작',
      '체계적인 사후 관리 프로그램',
      '다양한 임플란트 시스템 보유',
    ],
    process: [
      { step: '정밀 검사', desc: '3D CT 및 구강 검사를 통해 뼈의 상태, 잇몸 건강, 교합 관계를 정밀하게 분석합니다.' },
      { step: '치료 계획', desc: '검사 결과를 바탕으로 최적의 임플란트 위치와 보철 계획을 수립합니다.' },
      { step: '임플란트 식립', desc: '디지털 가이드를 활용하여 계획된 위치에 정확하게 임플란트를 식립합니다.' },
      { step: '보철 완성', desc: '골유착 확인 후 맞춤형 보철물을 제작하여 장착합니다.' },
    ],
    faq: [
      { q: '임플란트 수술은 아픈가요?', a: '충분한 마취 하에 진행되므로 수술 중 통증은 거의 없습니다. 수술 후 약간의 불편감은 처방약으로 관리됩니다.' },
      { q: '치료 기간은 얼마나 걸리나요?', a: '일반적으로 3~6개월 정도 소요되며, 뼈 이식이 필요한 경우 추가 기간이 필요할 수 있습니다.' },
      { q: '임플란트 수명은 어떻게 되나요?', a: '올바른 관리 시 반영구적으로 사용 가능합니다. 정기적인 검진과 관리가 중요합니다.' },
    ],
  },
  {
    id: 'cosmetic',
    icon: 'fas fa-gem',
    title: '심미보철',
    subtitle: 'Cosmetic Prosthetics',
    description: '자연스럽고 아름다운 미소를 위한 맞춤형 보철 치료입니다. 라미네이트, 크라운, 브릿지 등 다양한 심미 보철 솔루션을 제공합니다.',
    features: [
      '자연치아와 구분 어려운 색상 매칭',
      '올세라믹(지르코니아) 보철',
      '라미네이트 & 비니어',
      '디지털 스마일 디자인',
      '최소 삭제 심미 보철',
    ],
    process: [
      { step: '상담 및 스마일 분석', desc: '환자의 얼굴형, 입술 라인, 치아 형태를 분석하여 최적의 디자인을 설계합니다.' },
      { step: '치아 준비', desc: '최소 삭제 원칙으로 치아를 준비하고 정밀 인상을 채득합니다.' },
      { step: '보철물 제작', desc: '숙련된 기공사가 맞춤형 보철물을 제작합니다.' },
      { step: '장착 및 마무리', desc: '보철물을 장착하고 교합 조정 후 최종 마무리합니다.' },
    ],
    faq: [
      { q: '라미네이트는 치아를 많이 깎아야 하나요?', a: '최소 삭제 라미네이트의 경우 치아 삭제량이 매우 적어 치아 건강을 최대한 보존합니다.' },
      { q: '심미보철의 수명은 어떻게 되나요?', a: '올세라믹 보철의 경우 적절한 관리 시 10년 이상 사용 가능합니다.' },
    ],
  },
  {
    id: 'cavity',
    icon: 'fas fa-shield-halved',
    title: '충치치료',
    subtitle: 'Cavity Treatment',
    description: '최소 침습 원칙으로 건강한 치아 조직을 최대한 보존하며 치료합니다. 초기 충치부터 심한 충치까지 단계별 맞춤 치료를 제공합니다.',
    features: [
      '최소 침습 치료 원칙',
      '심미적 레진 충전',
      '세라믹 인레이/온레이',
      '근관(신경)치료',
      '크라운 보철 치료',
    ],
    process: [
      { step: '충치 진단', desc: 'X-ray와 구강 검사를 통해 충치의 범위와 깊이를 정확히 파악합니다.' },
      { step: '치료 계획 설명', desc: '충치 상태에 따른 치료 방법과 대안을 자세히 설명합니다.' },
      { step: '충치 제거', desc: '충치 부위만을 정밀하게 제거하고 건강한 치질을 최대한 보존합니다.' },
      { step: '수복 치료', desc: '레진, 인레이, 크라운 등 적합한 재료로 치아를 복원합니다.' },
    ],
    faq: [
      { q: '충치 치료는 아프지 않나요?', a: '충분한 마취를 진행하므로 치료 중 통증은 거의 없습니다.' },
      { q: '레진과 인레이의 차이점은 무엇인가요?', a: '레진은 직접 충전, 인레이는 본을 떠서 맞춤 제작합니다. 충치 범위에 따라 적합한 방법을 추천합니다.' },
    ],
  },
  {
    id: 'pediatric',
    icon: 'fas fa-child',
    title: '소아치과',
    subtitle: 'Pediatric Dentistry',
    description: '아이들이 편안하게 치료받을 수 있도록 세심하고 친절한 진료를 합니다. 성장기 구강 건강 관리부터 예방 치료까지 제공합니다.',
    features: [
      '아이 눈높이에 맞춘 설명',
      '불소 도포 및 실란트',
      '유치 충치 치료',
      '교합 유도 장치',
      '정기 검진 프로그램',
    ],
    process: [
      { step: '첫 만남', desc: '아이가 치과 환경에 익숙해질 수 있도록 충분한 시간을 갖습니다.' },
      { step: '구강 검진', desc: '치아 발육 상태, 충치 유무, 교합 관계를 전반적으로 확인합니다.' },
      { step: '예방 치료', desc: '불소 도포, 실란트 등 예방 치료를 우선적으로 시행합니다.' },
      { step: '필요 시 치료', desc: '치료가 필요한 경우 아이에게 충분히 설명하고 진행합니다.' },
    ],
    faq: [
      { q: '아이가 몇 살부터 치과에 가야 하나요?', a: '첫 치아가 나면 (보통 6개월~1세) 치과 검진을 시작하는 것이 좋습니다.' },
      { q: '유치도 치료해야 하나요?', a: '네, 유치 충치는 영구치 발육에 영향을 줄 수 있으므로 반드시 치료해야 합니다.' },
    ],
  },
  {
    id: 'gum',
    icon: 'fas fa-hand-holding-medical',
    title: '잇몸치료',
    subtitle: 'Periodontal Treatment',
    description: '치주질환의 원인을 정확히 파악하고 체계적인 잇몸 관리 치료를 시행합니다. 스케일링부터 치주 수술까지 단계별 치료를 제공합니다.',
    features: [
      '치주 상태 정밀 검사',
      '스케일링 및 치근면 활택술',
      '잇몸 수술 (필요시)',
      '잇몸 재생 치료',
      '유지 관리 프로그램',
    ],
    process: [
      { step: '치주 검사', desc: '치주낭 깊이 측정, X-ray 촬영으로 잇몸 뼈 상태를 정밀 진단합니다.' },
      { step: '비수술 치료', desc: '스케일링, 치근면 활택술로 치석과 세균을 제거합니다.' },
      { step: '재평가', desc: '치료 후 잇몸 상태를 재평가하여 추가 치료 필요성을 판단합니다.' },
      { step: '유지 관리', desc: '정기적인 검진과 관리로 건강한 잇몸 상태를 유지합니다.' },
    ],
    faq: [
      { q: '잇몸에서 피가 나면 치주질환인가요?', a: '잇몸 출혈은 치주질환의 초기 증상일 수 있습니다. 정확한 진단을 위해 검진을 받으시길 권합니다.' },
      { q: '스케일링은 얼마나 자주 받아야 하나요?', a: '보통 6개월~1년에 한 번 권장되며, 치주 상태에 따라 더 자주 필요할 수 있습니다.' },
    ],
  },
]

export function getTreatmentById(id: string): TreatmentDetail | undefined {
  return treatments.find(t => t.id === id)
}

const treatmentPageStyles = `
    .treatments-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto; }
    .treatment-card { border: 1px solid var(--border); padding: 2.5rem 2rem; text-align: center; background: var(--bg-card); transition: all 0.5s ease; position: relative; overflow: hidden; text-decoration: none; color: inherit; display: block; }
    .treatment-card:hover { border-color: rgba(200,169,126,0.3); transform: translateY(-5px); }
    .treatment-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 3px; background: linear-gradient(90deg, var(--accent), transparent); opacity: 0; transition: opacity 0.3s; }
    .treatment-card:hover::before { opacity: 1; }
    .treatment-icon { width: 70px; height: 70px; margin: 0 auto 1.5rem; border: 1px solid var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--accent); font-size: 1.5rem; transition: all 0.4s; }
    .treatment-card:hover .treatment-icon { background: var(--accent); color: var(--bg-primary); }
    .treatment-card h2 { font-size: 1.2rem; font-weight: 700; margin-bottom: 0.5rem; }
    .treatment-card p { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.7; font-weight: 300; }
    .treatment-card .card-arrow { margin-top: 1.5rem; color: var(--accent); font-size: 0.85rem; opacity: 0; transition: all 0.3s; }
    .treatment-card:hover .card-arrow { opacity: 1; }
`

export function treatmentsPage(): string {
  const cards = treatments.map((t, i) => `
      <a href="/treatments/${t.id}" class="treatment-card reveal ${i > 0 ? 'reveal-delay-' + Math.min(i, 4) : ''}">
        <div class="treatment-icon"><i class="${t.icon}"></i></div>
        <h2>${t.title}</h2>
        <p>${t.description.split('.')[0]}.</p>
        <div class="card-arrow">자세히 보기 <i class="fas fa-arrow-right"></i></div>
      </a>
  `).join('')

  const body = `
  <div class="page-header">
    <div class="section-label reveal">Treatments</div>
    <h1 class="page-header-title reveal reveal-delay-1">진료안내</h1>
    <p class="page-header-desc reveal reveal-delay-2">
      태평가이드치과에서 제공하는 주요 진료 서비스입니다.<br>
      각 진료과목을 클릭하시면 상세 정보를 확인하실 수 있습니다.
    </p>
  </div>

  <section style="background:var(--bg-primary);">
    <div class="treatments-grid">
      ${cards}
    </div>
  </section>
  `

  return layout(body, {
    title: '진료안내 | 태평가이드치과',
    description: '태평가이드치과의 진료과목 안내 - 임플란트, 심미보철, 충치치료, 소아치과, 잇몸치료',
    activePage: 'treatments',
    extraStyles: treatmentPageStyles,
  })
}

const detailStyles = `
    .detail-hero { padding: 10rem 4rem 5rem; background: var(--bg-secondary); position: relative; overflow: hidden; }
    .detail-hero::before { content: ''; position: absolute; width: 500px; height: 500px; background: var(--accent); border-radius: 50%; filter: blur(200px); opacity: 0.05; top: 0; right: -10%; }
    .detail-hero-inner { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr auto; gap: 4rem; align-items: center; }
    .detail-hero-icon { width: 120px; height: 120px; border: 2px solid var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 3rem; color: var(--accent); }
    .detail-hero .section-label { justify-content: flex-start; }

    .detail-section { background: var(--bg-primary); max-width: 1200px; margin: 0 auto; }
    .detail-features { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
    .feature-item { display: flex; align-items: flex-start; gap: 1rem; padding: 1.5rem; border: 1px solid var(--border); background: var(--bg-card); }
    .feature-item i { color: var(--accent); margin-top: 3px; flex-shrink: 0; }
    .feature-item span { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; }

    .detail-process { margin-top: 3rem; }
    .process-timeline { position: relative; padding-left: 3rem; }
    .process-timeline::before { content: ''; position: absolute; left: 12px; top: 0; bottom: 0; width: 1px; background: var(--border); }
    .timeline-item { position: relative; padding: 1.5rem 0; }
    .timeline-item::before { content: ''; position: absolute; left: -2.35rem; top: 1.8rem; width: 12px; height: 12px; border: 2px solid var(--accent); border-radius: 50%; background: var(--bg-primary); z-index: 1; }
    .timeline-item h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-primary); }
    .timeline-item p { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.8; font-weight: 300; }

    .detail-faq { margin-top: 3rem; }
    .faq-item { border: 1px solid var(--border); padding: 1.5rem 2rem; margin-bottom: 1rem; background: var(--bg-card); }
    .faq-item h3 { font-size: 1rem; font-weight: 700; margin-bottom: 0.8rem; color: var(--accent); }
    .faq-item h3::before { content: 'Q. '; }
    .faq-item p { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.8; font-weight: 300; }
    .faq-item p::before { content: 'A. '; color: var(--accent); font-weight: 600; }

    .detail-nav { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 3rem; }
    .detail-nav a { padding: 0.6rem 1.5rem; border: 1px solid var(--border); font-size: 0.85rem; color: var(--text-secondary); text-decoration: none; transition: all 0.3s; }
    .detail-nav a:hover, .detail-nav a.current { border-color: var(--accent); color: var(--accent); background: rgba(200,169,126,0.05); }

    @media (max-width: 1024px) {
      .detail-hero-inner { grid-template-columns: 1fr; gap: 2rem; }
      .detail-hero-icon { width: 80px; height: 80px; font-size: 2rem; }
    }
    @media (max-width: 640px) {
      .detail-hero { padding: 7rem 1.2rem 3rem; }
      .detail-features { grid-template-columns: 1fr; gap: 1rem; }
      .feature-item { padding: 1.2rem; }
      .feature-item span { font-size: 0.88rem; }
      .faq-item { padding: 1.2rem 1.5rem; }
      .faq-item h3 { font-size: 0.95rem; }
      .faq-item p { font-size: 0.88rem; }
      .detail-nav a { padding: 0.5rem 1rem; font-size: 0.8rem; }
      .treatments-grid { grid-template-columns: 1fr 1fr; gap: 1rem; }
      .treatment-card { padding: 1.5rem 1.2rem; }
      .treatment-card h2 { font-size: 1rem; }
      .treatment-card p { font-size: 0.8rem; }
      .treatment-icon { width: 55px; height: 55px; font-size: 1.2rem; }
    }
`

export function treatmentDetailPage(id: string): string | null {
  const t = getTreatmentById(id)
  if (!t) return null

  const otherLinks = treatments.filter(o => o.id !== t.id).map(o =>
    `<a href="/treatments/${o.id}">${o.title}</a>`
  ).join('')

  const features = t.features.map(f =>
    `<div class="feature-item reveal"><i class="fas fa-check"></i><span>${f}</span></div>`
  ).join('')

  const processSteps = t.process.map(p =>
    `<div class="timeline-item reveal"><h3>${p.step}</h3><p>${p.desc}</p></div>`
  ).join('')

  const faqItems = t.faq.map(f =>
    `<div class="faq-item reveal"><h3>${f.q}</h3><p>${f.a}</p></div>`
  ).join('')

  const body = `
  <div class="detail-hero">
    <div class="detail-hero-inner">
      <div>
        <div class="section-label reveal">${t.subtitle}</div>
        <h1 class="page-header-title reveal reveal-delay-1">${t.title}</h1>
        <p class="page-header-desc reveal reveal-delay-2" style="margin:0;text-align:left;">
          ${t.description}
        </p>
        <div style="margin-top:2rem" class="reveal reveal-delay-3">
          <a href="/info#consult" class="btn-primary" style="font-size:0.85rem;padding:0.8rem 2rem;">
            <i class="fas fa-pen-to-square"></i> 상담 신청하기
          </a>
        </div>
      </div>
      <div class="detail-hero-icon reveal">
        <i class="${t.icon}"></i>
      </div>
    </div>
  </div>

  <section style="background:var(--bg-primary);padding:6rem 4rem;">
    <div class="detail-section">
      <h2 class="section-title reveal" style="font-size:1.8rem;">치료 특징</h2>
      <div class="detail-features">
        ${features}
      </div>
    </div>
  </section>

  <section style="background:var(--bg-secondary);padding:6rem 4rem;">
    <div class="detail-section">
      <h2 class="section-title reveal" style="font-size:1.8rem;">치료 과정</h2>
      <div class="detail-process">
        <div class="process-timeline">
          ${processSteps}
        </div>
      </div>
    </div>
  </section>

  <section style="background:var(--bg-primary);padding:6rem 4rem;">
    <div class="detail-section">
      <h2 class="section-title reveal" style="font-size:1.8rem;">자주 묻는 질문</h2>
      <div class="detail-faq">
        ${faqItems}
      </div>
    </div>
  </section>

  <section style="background:var(--bg-secondary);padding:4rem;">
    <div class="detail-section">
      <h3 class="reveal" style="font-size:1.1rem;font-weight:600;margin-bottom:1rem;color:var(--text-secondary);">다른 진료과목 보기</h3>
      <div class="detail-nav reveal">
        ${otherLinks}
        <a href="/treatments" style="border-color:var(--accent);color:var(--accent);">전체 보기</a>
      </div>
    </div>
  </section>
  `

  return layout(body, {
    title: `${t.title} | 진료안내 | 태평가이드치과`,
    description: t.description,
    activePage: 'treatments',
    extraStyles: detailStyles,
  })
}
