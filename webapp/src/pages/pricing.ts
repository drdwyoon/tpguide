import { layout } from '../components/layout'

const pricingStyles = `
    .pricing-hero { text-align: center; padding: 8rem 2rem 4rem; }
    .pricing-hero h2 { font-family: 'Playfair Display', serif; font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; }
    .pricing-hero p { color: var(--text-secondary); font-size: 1rem; max-width: 600px; margin: 0 auto; line-height: 1.8; }

    .pricing-section { max-width: 800px; margin: 0 auto; padding: 0 2rem 4rem; }

    .pricing-category { margin-bottom: 3rem; }
    .pricing-category-title {
      font-size: 1.1rem; font-weight: 700; color: var(--accent);
      padding-bottom: 0.8rem; border-bottom: 2px solid var(--accent);
      margin-bottom: 0; display: flex; align-items: center; gap: 0.5rem;
    }
    .pricing-category-title i { font-size: 0.95rem; }

    .pricing-table { width: 100%; border-collapse: collapse; }
    .pricing-table tr { border-bottom: 1px solid var(--border); transition: background 0.2s; }
    .pricing-table tr:hover { background: var(--bg-card); }
    .pricing-table td { padding: 1rem 0.5rem; font-size: 0.95rem; }
    .pricing-table td:first-child { color: var(--text-primary); font-weight: 400; }
    .pricing-table td:last-child { text-align: right; color: var(--accent); font-weight: 600; white-space: nowrap; }

    .pricing-note {
      margin-top: 3rem; padding: 2rem; background: var(--bg-card);
      border: 1px solid var(--border); border-radius: 8px;
      font-size: 0.85rem; color: var(--text-secondary); line-height: 1.8;
    }
    .pricing-note-title { font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem; font-size: 0.9rem; }
    .pricing-note ul { list-style: none; padding: 0; margin: 0; }
    .pricing-note li { padding: 0.2rem 0; }
    .pricing-note li::before { content: '·'; margin-right: 0.5rem; color: var(--accent); font-weight: 700; }

    .pricing-cta { text-align: center; margin-top: 3rem; }
    .pricing-cta a {
      display: inline-block; padding: 1rem 3rem;
      background: var(--accent); color: #fff; text-decoration: none;
      font-size: 0.95rem; font-weight: 600; transition: opacity 0.3s;
    }
    .pricing-cta a:hover { opacity: 0.85; }

    @media (max-width: 640px) {
      .pricing-hero { padding: 7rem 1.5rem 3rem; }
      .pricing-hero h2 { font-size: 1.8rem; }
      .pricing-section { padding: 0 1.5rem 3rem; }
      .pricing-table td { padding: 0.8rem 0.3rem; font-size: 0.88rem; }
    }
`

interface PriceItem {
  name: string
  price: string
}

interface PriceCategory {
  icon: string
  title: string
  items: PriceItem[]
}

const priceData: PriceCategory[] = [
  {
    icon: 'fas fa-tooth',
    title: '임플란트',
    items: [
      { name: '오스템 (국산)', price: '99만원' },
      { name: '덴티스 (국산)', price: '89만원' },
      { name: '스트라우만 (해외)', price: '150만원' },
      { name: '뼈이식 (치아당)', price: '20만원' },
      { name: '상악동거상술 (단순)', price: '50만원' },
      { name: '상악동거상술 (복잡)', price: '100만원' },
    ],
  },
  {
    icon: 'fas fa-fill-drip',
    title: '보존치료',
    items: [
      { name: '레진 (일반)', price: '10만원' },
      { name: '레진 (Diastema)', price: '15만원' },
      { name: '레진 (치경부)', price: '6만원' },
      { name: '라바인레이', price: '30만원' },
      { name: '골드인레이', price: '시세적용' },
    ],
  },
  {
    icon: 'fas fa-crown',
    title: '보철치료',
    items: [
      { name: '지르코니아크라운 (구치부)', price: '45만원' },
      { name: '지르코니아크라운 (전치부)', price: '50만원' },
      { name: '심미보철 (전치부 PFZ)', price: '55만원' },
      { name: '골드크라운', price: '시세적용' },
      { name: 'PFM크라운 (도자기)', price: '40만원' },
      { name: '메탈크라운', price: '30만원' },
      { name: '포스트코어', price: '14만원' },
    ],
  },
  {
    icon: 'fas fa-teeth',
    title: '틀니치료',
    items: [
      { name: '틀니 (악당)', price: '150만원' },
      { name: '임시틀니', price: '20만원' },
      { name: '플리퍼 (4치 이하)', price: '10만원' },
    ],
  },
  {
    icon: 'fas fa-sparkles',
    title: '심미치료',
    items: [
      { name: '스케일링 + 치아미백 (1 visit, 2회)', price: '19만원' },
      { name: '스케일링 + 치아미백 (2 visit, 4회)', price: '37만원' },
    ],
  },
  {
    icon: 'fas fa-child',
    title: '소아치료',
    items: [
      { name: '불소', price: '3만원' },
      { name: 'SS크라운', price: '20만원' },
      { name: '소아레진', price: '8만원' },
    ],
  },
  {
    icon: 'fas fa-notes-medical',
    title: '기타',
    items: [
      { name: '스케일링 (비급여)', price: '6만원' },
      { name: '신경치료 (비급여)', price: '19만원' },
      { name: '발치 (비급여)', price: '9만원' },
    ],
  },
]

export function pricingPage(): string {
  const categoriesHtml = priceData.map(cat => `
    <div class="pricing-category reveal">
      <div class="pricing-category-title"><i class="${cat.icon}"></i> ${cat.title}</div>
      <table class="pricing-table">
        <tbody>
          ${cat.items.map(item => `
          <tr>
            <td>${item.name}</td>
            <td>${item.price}</td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  `).join('')

  const body = `
    <main>
      <div class="pricing-hero">
        <h2>진료 수가표</h2>
        <p>태평가이드치과의 투명한 진료비 안내입니다.<br>모든 치료는 충분한 상담 후 진행됩니다.</p>
      </div>

      <section class="pricing-section">
        ${categoriesHtml}

        <div class="pricing-note reveal">
          <div class="pricing-note-title">안내사항</div>
          <ul>
            <li>상기 금액은 비급여 항목이며, 부가세가 포함된 금액입니다.</li>
            <li>환자의 구강 상태에 따라 치료비가 달라질 수 있습니다.</li>
            <li>골드 관련 항목은 금 시세에 따라 변동됩니다.</li>
            <li>건강보험 적용 항목은 별도로 안내해 드립니다.</li>
            <li>자세한 상담은 내원 또는 전화로 문의해 주세요.</li>
          </ul>
        </div>

        <div class="pricing-cta reveal">
          <a href="/info#consult"><i class="fas fa-comment-medical"></i>&nbsp; 상담 신청하기</a>
        </div>
      </section>
    </main>
  `

  return layout(body, {
    title: '진료 수가표 | 태평가이드치과',
    description: '태평가이드치과의 임플란트, 보철, 심미치료 등 진료비 안내입니다. 투명한 가격으로 신뢰를 드립니다.',
    activePage: 'pricing',
    extraStyles: pricingStyles,
  })
}
