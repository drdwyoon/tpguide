import { layout } from '../components/layout'

const doctorStyles = `
    .doctor-content { display: grid; grid-template-columns: 1fr 1.5fr; gap: 5rem; max-width: 1200px; margin: 0 auto; align-items: start; }
    .doctor-photo { position: relative; aspect-ratio: 3/4; background: linear-gradient(135deg, #1a1a1a, #2a2a2a); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .doctor-photo img { width: 100%; height: 100%; object-fit: cover; }
    .doctor-info { padding-top: 1rem; }
    .doctor-name { font-size: 2.2rem; font-weight: 900; margin-bottom: 0.3rem; }
    .doctor-title-text { font-size: 1.05rem; color: var(--accent); margin-bottom: 2.5rem; letter-spacing: 0.1em; }
    .doctor-credentials { list-style: none; }
    .doctor-credentials li { padding: 0.6rem 0; font-size: 0.9rem; color: var(--text-secondary); font-weight: 300; border-bottom: 1px solid var(--border); display: flex; align-items: flex-start; gap: 0.8rem; line-height: 1.5; }
    .doctor-credentials li:last-child { border-bottom: none; }
    .doctor-credentials li i { color: var(--accent); font-size: 0.5rem; margin-top: 0.5rem; flex-shrink: 0; }
    .credential-category { margin-top: 2rem; margin-bottom: 0.8rem; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); font-weight: 600; }

    .doctor-philosophy { background: var(--bg-secondary); }
    .philosophy-content { max-width: 900px; margin: 0 auto; }
    .philosophy-quote { font-family: 'Playfair Display', serif; font-size: clamp(1.2rem, 3vw, 1.6rem); font-style: italic; color: var(--accent); line-height: 1.6; margin-bottom: 2rem; text-align: center; }
    .philosophy-text { font-size: clamp(0.9rem, 1.5vw, 1rem); color: var(--text-secondary); line-height: 2; font-weight: 300; text-align: center; }

    @media (max-width: 1024px) {
      .doctor-content { grid-template-columns: 1fr; gap: 3rem; }
      .doctor-photo { max-width: 400px; margin: 0 auto; }
    }
    @media (max-width: 640px) {
      .doctor-content { gap: 2rem; }
      .doctor-photo { max-width: 100%; }
      .doctor-name { font-size: 1.6rem; }
      .doctor-title-text { font-size: 0.9rem; margin-bottom: 1.5rem; }
      .doctor-credentials li { font-size: 0.85rem; }
      .credential-category { margin-top: 1.5rem; }
    }
`

export function doctorPage(): string {
  const body = `
  <div class="page-header">
    <div class="section-label reveal">Medical Staff</div>
    <h1 class="page-header-title reveal reveal-delay-1">의료진 소개</h1>
    <p class="page-header-desc reveal reveal-delay-2">
      태평가이드치과의 의료진을 소개합니다.
    </p>
  </div>

  <section style="background:var(--bg-primary);">
    <div class="doctor-content">
      <div class="doctor-photo reveal">
        <picture><source srcset="/static/doctor.webp" type="image/webp"><img src="/static/doctor.jpg" alt="태평가이드치과 윤도완 대표원장 프로필 사진" loading="lazy"></picture>
      </div>
      <div class="doctor-info reveal reveal-delay-1">
        <div class="doctor-name">윤도완 대표원장</div>
        <div class="doctor-title-text">통합치의학 전문의 | DMD</div>
        
        <div class="credential-category">학력</div>
        <ul class="doctor-credentials">
          <li><i class="fas fa-circle"></i>연세대학교 생물학 학사</li>
          <li><i class="fas fa-circle"></i>경희대학교 치의학 석사, DMD</li>
        </ul>

        <div class="credential-category">자격 및 수료</div>
        <ul class="doctor-credentials">
          <li><i class="fas fa-circle"></i>보건복지부인증 통합치의학 전문의</li>
          <li><i class="fas fa-circle"></i>University of Pennsylvania 치과대학 근관치료학 과정 수료</li>
          <li><i class="fas fa-circle"></i>오스템 AIC 임플란트 고급과정 수료</li>
          <li><i class="fas fa-circle"></i>오스템 AIC 임플란트 디지털가이드 수술과정 수료</li>
          <li><i class="fas fa-circle"></i>턱관절장애 교육연구회 교육과정 수료</li>
        </ul>

        <div class="credential-category">학회 활동</div>
        <ul class="doctor-credentials">
          <li><i class="fas fa-circle"></i>대한치과보철학회 정회원</li>
          <li><i class="fas fa-circle"></i>대한심미보철학회 정회원</li>
          <li><i class="fas fa-circle"></i>세계임플란트학회(ICOI) 정회원</li>
          <li><i class="fas fa-circle"></i>미국임플란트학회(AAID) 정회원</li>
        </ul>

        <div class="credential-category">경력</div>
        <ul class="doctor-credentials">
          <li><i class="fas fa-circle"></i>전) 예미담치과 원장</li>
          <li><i class="fas fa-circle"></i>전) 올바른치과 원장</li>
          <li><i class="fas fa-circle"></i>전) 상도이편한치과 원장</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="doctor-philosophy">
    <div class="philosophy-content">
      <div class="section-label reveal" style="justify-content:center">Philosophy</div>
      <h2 class="section-title reveal reveal-delay-1" style="text-align:center;font-size:2rem;">진료 철학</h2>
      <p class="philosophy-quote reveal reveal-delay-2">
        "좋은 치료는 좋은 설명에서 시작됩니다."
      </p>
      <p class="philosophy-text reveal reveal-delay-3">
        환자분이 자신의 상태를 충분히 이해하고, 납득한 상태에서 치료를 결정할 수 있도록 돕는 것이 제 역할이라 생각합니다.
        숨기지 않고 설명하고, 흔들림 없이 진료하며, 끝까지 책임지겠습니다.
      </p>
    </div>
  </section>
  `

  return layout(body, {
    title: '의료진 소개 | 태평가이드치과',
    description: '태평가이드치과 윤도완 대표원장 소개 - 통합치의학 전문의, 학력, 자격, 경력 안내',
    activePage: 'doctor',
    extraStyles: doctorStyles,
  })
}
