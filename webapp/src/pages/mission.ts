import { layout } from '../components/layout'

const missionStyles = `
    /* ===== MISSION / VISION ===== */
    .mission-section { background: var(--bg-primary); }
    .mission-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; max-width: 1100px; margin: 4rem auto 0; }
    .mission-card { border: 1px solid var(--border); padding: 3.5rem; text-align: left; position: relative; overflow: hidden; transition: all 0.5s ease; background: var(--bg-card); }
    .mission-card:hover { border-color: rgba(200,169,126,0.3); transform: translateY(-5px); }
    .mission-card::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 3px; background: linear-gradient(90deg, var(--accent), transparent); }
    .mission-card-label { font-size: 0.65rem; letter-spacing: 0.35em; text-transform: uppercase; color: var(--accent); margin-bottom: 1.5rem; }
    .mission-card h3 { font-size: 1.5rem; font-weight: 700; margin-bottom: 1.2rem; line-height: 1.4; }
    .mission-card p { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.9; font-weight: 300; }

    /* ===== VALUES SECTION ===== */
    .values-section { background: var(--bg-secondary); }
    .values-header { max-width: 700px; margin-bottom: 5rem; margin-left: auto; margin-right: auto; text-align: center; }
    .values-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; max-width: 1200px; margin: 0 auto; }
    .value-card { border: 1px solid var(--border); padding: 3rem; position: relative; overflow: hidden; transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); background: var(--bg-card); }
    .value-card:hover { border-color: rgba(200,169,126,0.2); background: rgba(200,169,126,0.03); }
    .value-card:hover .value-num { color: var(--accent); opacity: 1; }
    .value-num { font-family: 'Playfair Display', serif; font-size: 5rem; font-weight: 900; color: var(--text-primary); opacity: 0.05; position: absolute; top: 1.5rem; right: 2rem; transition: all 0.6s; line-height: 1; }
    .value-icon { width: 50px; height: 50px; border: 1px solid var(--accent); display: flex; align-items: center; justify-content: center; margin-bottom: 2rem; color: var(--accent); font-size: 1.2rem; transition: all 0.4s; }
    .value-card:hover .value-icon { background: var(--accent); color: var(--bg-primary); }
    .value-card h3 { font-size: 1.3rem; font-weight: 700; margin-bottom: 0.5rem; }
    .value-card .value-subtitle { font-size: 0.75rem; color: var(--accent); letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1.5rem; }
    .value-card p { font-size: 0.92rem; color: var(--text-secondary); line-height: 1.9; font-weight: 300; }

    /* ===== PROMISE ===== */
    .promise-section { background: var(--bg-primary); text-align: center; padding: 8rem 4rem; }
    .promise-text { font-size: clamp(1.1rem, 3vw, 2.8rem); font-weight: 300; line-height: 1.8; max-width: 900px; margin: 0 auto; color: var(--text-primary); word-break: keep-all; overflow-wrap: break-word; }
    .promise-text .highlight { color: var(--accent); font-weight: 700; }
    .promise-text .dim { color: var(--text-muted); }

    /* ===== PROCESS ===== */
    .process-section { background: var(--bg-secondary); }
    .process-header { text-align: center; max-width: 700px; margin: 0 auto 5rem; }
    .process-steps { display: flex; gap: 0; max-width: 1200px; margin: 0 auto; position: relative; }
    .process-steps::before { content: ''; position: absolute; top: 40px; left: 0; right: 0; height: 1px; background: var(--border); }
    .process-step { flex: 1; padding: 0 2rem; position: relative; text-align: center; }
    .process-step::before { content: ''; width: 12px; height: 12px; border: 2px solid var(--accent); border-radius: 50%; background: var(--bg-secondary); display: block; margin: 0 auto 2.5rem; position: relative; z-index: 2; transition: all 0.3s; }
    .process-step:hover::before { background: var(--accent); box-shadow: 0 0 20px var(--accent-glow); }
    .process-step-num { font-family: 'Playfair Display', serif; font-size: 0.75rem; color: var(--accent); letter-spacing: 0.2em; margin-bottom: 1rem; }
    .process-step h3 { font-size: 1.1rem; font-weight: 700; margin-bottom: 0.8rem; }
    .process-step p { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.8; font-weight: 300; }

    @media (max-width: 1024px) {
      .mission-grid { grid-template-columns: 1fr; }
      .values-grid { grid-template-columns: 1fr; }
      .process-steps { flex-direction: column; gap: 2rem; }
      .process-steps::before { display: none; }
    }
    @media (max-width: 640px) {
      .value-card { padding: 1.5rem; }
      .value-card h3 { font-size: 1.1rem; }
      .value-card p { font-size: 0.85rem; }
      .value-num { font-size: 3.5rem; }
      .values-header { margin-bottom: 3rem; }
      .mission-card { padding: 2rem; }
      .mission-card h3 { font-size: 1.2rem; }
      .mission-card p { font-size: 0.88rem; }
      .promise-section { padding: 5rem 1.2rem; }
      .promise-text { font-size: 1rem; line-height: 2; }
      .promise-text br { display: none; }
      .process-step h3 { font-size: 1rem; }
      .process-step p { font-size: 0.8rem; }
    }
`

export function missionPage(): string {
  const body = `
  <div class="page-header">
    <div class="section-label reveal">Mission & Vision</div>
    <h1 class="page-header-title reveal reveal-delay-1">미션과 비전</h1>
    <p class="page-header-desc reveal reveal-delay-2">
      태평가이드치과가 추구하는 진료 방향과 핵심 가치를 소개합니다.
    </p>
  </div>

  <!-- MISSION / VISION -->
  <section class="mission-section" style="text-align:center;">
    <div class="section-label reveal" style="justify-content:center">Mission & Vision</div>
    <h2 class="section-title reveal reveal-delay-1">태평가이드치과의<br>진료 방향</h2>
    <p class="section-desc reveal reveal-delay-2" style="margin:0 auto">
      우리는 치과 치료를 권유의 영역이 아니라 이해와 선택의 영역으로 바꾸고자 합니다.
    </p>
    <div class="mission-grid">
      <div class="mission-card reveal reveal-delay-1">
        <div class="mission-card-label">Mission</div>
        <h3>믿을 수밖에 없는<br>진료 구조를 만듭니다</h3>
        <p>치료의 모든 과정에서 숨김없이 설명하고, 일관된 기준으로 진료하며, 치료 이후의 경과까지 끝까지 책임지는 시스템. 환자분이 억지로 믿어야 하는 병원이 아니라, 믿지 않을 이유가 없는 병원이 되는 것을 목표로 합니다.</p>
      </div>
      <div class="mission-card reveal reveal-delay-2">
        <div class="mission-card-label">Vision</div>
        <h3>설명만으로 선택에<br>충분한 치과가 됩니다</h3>
        <p>좋은 설명은 환자를 설득하지 않습니다. 대신 환자가 자신의 상태를 정확히 이해하고, 납득한 상태에서 결정할 수 있게 만듭니다. 설명을 듣는 순간, 다른 선택지를 굳이 더 찾아보지 않아도 될 만큼 충분한 확신을 드리는 것이 우리의 비전입니다.</p>
      </div>
    </div>
  </section>

  <!-- VALUES -->
  <section class="values-section" id="values">
    <div class="values-header">
      <div class="section-label reveal" style="justify-content:center">Core Values</div>
      <h2 class="section-title reveal reveal-delay-1" style="text-align:center;">4가지 핵심 가치</h2>
      <p class="section-desc reveal reveal-delay-2" style="text-align:center;">태평가이드치과의 모든 진료는 네 가지 핵심 가치를 기반으로 이루어집니다.</p>
    </div>
    <div class="values-grid">
      <div class="value-card reveal">
        <div class="value-num">01</div>
        <div class="value-icon"><i class="fas fa-eye"></i></div>
        <h3>투명성</h3>
        <div class="value-subtitle">Transparency</div>
        <p>진료 과정과 비용, 치료 계획을 감추지 않고 먼저 설명합니다. 어떤 검사를 왜 하는지, 왜 이 치료가 필요한지, 다른 대안은 무엇인지, 비용은 어떤 기준으로 산정되는지 명확하게 안내합니다.</p>
      </div>
      <div class="value-card reveal reveal-delay-1">
        <div class="value-num">02</div>
        <div class="value-icon"><i class="fas fa-link"></i></div>
        <h3>일관성</h3>
        <div class="value-subtitle">Consistency</div>
        <p>처음 상담부터 치료 계획 수립, 실제 치료, 이후 관리에 이르기까지 한 사람의 흐름으로 이해되는 진료를 중요하게 생각합니다.</p>
      </div>
      <div class="value-card reveal reveal-delay-2">
        <div class="value-num">03</div>
        <div class="value-icon"><i class="fas fa-handshake"></i></div>
        <h3>책임 명확성</h3>
        <div class="value-subtitle">Accountability</div>
        <p>진료는 치료를 시행하는 순간 끝나는 것이 아니라, 그 이후의 변화와 경과까지 포함하는 과정입니다. 치료 후에도 끝까지 책임집니다.</p>
      </div>
      <div class="value-card reveal reveal-delay-3">
        <div class="value-num">04</div>
        <div class="value-icon"><i class="fas fa-user-check"></i></div>
        <h3>환자 결정권 존중</h3>
        <div class="value-subtitle">Patient Autonomy</div>
        <p>치료는 의료진이 대신 결정하는 것이 아니라, 충분한 설명을 들은 환자분이 스스로 선택하는 것입니다. 충분히 듣고, 충분히 이해하고, 스스로 결정하실 수 있도록 여유를 드립니다.</p>
      </div>
    </div>
  </section>

  <!-- PROMISE -->
  <section class="promise-section">
    <p class="promise-text reveal">
      <span class="dim">치과 진료가 두렵지 않으려면,</span><br>
      먼저 <span class="highlight">이해</span>할 수 있어야 합니다.<br>
      이해할 수 있으려면, 충분한 <span class="highlight">설명</span>이 있어야 합니다.<br>
      <span class="dim">그리고 충분한 설명이 있을 때,</span><br>
      비로소 환자는 자신의 치료를<br>
      <span class="highlight">스스로 선택</span>할 수 있습니다.
    </p>
  </section>

  <!-- PROCESS -->
  <section class="process-section">
    <div class="process-header">
      <div class="section-label reveal" style="justify-content:center">Treatment Process</div>
      <h2 class="section-title reveal reveal-delay-1" style="text-align:center">진료 여정 안내</h2>
      <p class="section-desc reveal reveal-delay-2" style="margin:0 auto;text-align:center">
        처음 내원하시는 순간부터 치료가 끝난 뒤의 관리까지,<br>숨기지 않고 설명하며 끝까지 책임지겠습니다.
      </p>
    </div>
    <div class="process-steps">
      <div class="process-step reveal">
        <div class="process-step-num">STEP 01</div>
        <h3>충분한 상담</h3>
        <p>현재 상태를 정확히 파악하고, 환자분이 이해할 수 있는 언어로 설명합니다.</p>
      </div>
      <div class="process-step reveal reveal-delay-1">
        <div class="process-step-num">STEP 02</div>
        <h3>치료 계획 수립</h3>
        <p>가능한 치료 방법, 각 선택지의 장단점, 예상 기간과 비용을 안내합니다.</p>
      </div>
      <div class="process-step reveal reveal-delay-2">
        <div class="process-step-num">STEP 03</div>
        <h3>일관된 진료</h3>
        <p>처음 계획한 방향에서 흔들리지 않는 체계적이고 일관된 진료를 진행합니다.</p>
      </div>
      <div class="process-step reveal reveal-delay-3">
        <div class="process-step-num">STEP 04</div>
        <h3>사후 관리</h3>
        <p>치료 후 회복 과정을 함께 살피며, 끝까지 책임지는 후속 관리를 제공합니다.</p>
      </div>
    </div>
  </section>
  `

  return layout(body, {
    title: '미션과 비전 | 태평가이드치과',
    description: '태평가이드치과의 미션, 비전, 4가지 핵심 가치 - 투명성, 일관성, 책임 명확성, 환자 결정권 존중',
    activePage: 'mission',
    extraStyles: missionStyles,
  })
}
