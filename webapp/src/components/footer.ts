import { logoHtml } from './header'

export function footer(): string {
  return `
  <!-- CTA -->
  <section class="cta" id="contact" style="background:var(--bg-primary);text-align:center;padding:clamp(5rem,10vw,10rem) clamp(1.2rem,4vw,4rem);position:relative;overflow:hidden;">
    <div style="content:'';position:absolute;width:600px;height:600px;background:var(--accent);border-radius:50%;filter:blur(200px);opacity:0.07;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;"></div>
    <div style="position:relative;z-index:2;">
      <div class="section-label reveal" style="justify-content:center">Contact Us</div>
      <div class="reveal reveal-delay-1" style="font-size:clamp(1.5rem,4vw,3.2rem);font-weight:900;margin-bottom:1.5rem;letter-spacing:-0.02em;word-break:keep-all;">태평가이드치과와<br>함께 시작하세요</div>
      <p class="reveal reveal-delay-2" style="font-size:clamp(0.9rem,1.5vw,1.1rem);color:var(--text-secondary);line-height:1.8;max-width:600px;margin:0 auto 3rem;font-weight:300;word-break:keep-all;">
        환자분의 입장에서 이해하기 쉬운 진료, 납득할 수 있는 치료 계획,<br>
        그리고 끝까지 책임지는 태도로 오래 믿고 다닐 수 있는 치과가 되겠습니다.
      </p>
      <div class="reveal reveal-delay-3" style="display:flex;gap:1.5rem;justify-content:center;flex-wrap:wrap;">
        <a href="tel:031-751-7528" class="btn-primary">
          <i class="fas fa-phone"></i> 전화 상담
        </a>
        <a href="http://talk.naver.com/w4arrp?frm=mnmb&frm=nmb_detail" target="_blank" class="btn-ghost">
          <i class="fas fa-comment"></i> 네이버 톡톡
        </a>
        <a href="https://m.booking.naver.com/booking/13/bizes/634456?theme=place&lang=ko&area=ple" target="_blank" class="btn-naver">
          <i class="fas fa-calendar-check"></i> 네이버 예약
        </a>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="footer-top">
      <div class="footer-brand">
        <div style="margin-bottom:1rem">${logoHtml(26)}</div>
        <p>
          설명으로 신뢰를 만들고,<br>
          신뢰를 통해 선택의 확신을 드리는 치과.
        </p>
        <div style="margin-top:1.5rem;display:flex;gap:1rem">
          <a href="https://naver.me/5Jp92GAV" target="_blank" style="color:var(--naver);font-size:1.2rem"><i class="fas fa-map-marker-alt"></i></a>
          <a href="http://talk.naver.com/w4arrp?frm=mnmb&frm=nmb_detail" target="_blank" style="color:var(--naver);font-size:1.2rem"><i class="fas fa-comment"></i></a>
        </div>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">진료안내</div>
        <ul>
          <li><a href="/treatments/implant">임플란트</a></li>
          <li><a href="/treatments/cosmetic">심미보철</a></li>
          <li><a href="/treatments/cavity">충치치료</a></li>
          <li><a href="/treatments/pediatric">소아치과</a></li>
          <li><a href="/treatments/gum">잇몸치료</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">병원소개</div>
        <ul>
          <li><a href="/doctor">의료진 소개</a></li>
          <li><a href="/mission">미션과 비전</a></li>
          <li><a href="/mission#values">핵심가치</a></li>
          <li><a href="/info">병원안내</a></li>
          <li><a href="/info#location">오시는 길</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">고객지원</div>
        <ul>
          <li><a href="/info#consult">상담 신청</a></li>
          <li><a href="http://talk.naver.com/w4arrp?frm=mnmb&frm=nmb_detail" target="_blank">네이버 톡톡</a></li>
          <li><a href="https://m.booking.naver.com/booking/13/bizes/634456?theme=place&lang=ko&area=ple" target="_blank">네이버 예약</a></li>
          <li><a href="tel:031-751-7528">전화 문의</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; 2025 태평가이드치과. All rights reserved.</span>
      <span><a href="/privacy" style="color:var(--text-muted);text-decoration:none;">개인정보처리방침</a> | 경기 성남시 수정구 수정로118 5층 501호 | 031-751-7528</span>
    </div>
  </footer>

  <!-- MOBILE BOTTOM BAR -->
  <div class="mobile-bottom-bar">
    <div class="mobile-bottom-bar-inner">
      <a href="https://m.booking.naver.com/booking/13/bizes/634456?theme=place&lang=ko&area=ple" target="_blank" class="bar-naver">
        <i class="fas fa-calendar-check"></i>
        <span>네이버 예약</span>
      </a>
      <a href="/info#consult" class="bar-consult">
        <i class="fas fa-pen-to-square"></i>
        <span>상담 신청</span>
      </a>
      <a href="tel:031-751-7528" class="bar-call">
        <i class="fas fa-phone"></i>
        <span>전화하기</span>
      </a>
    </div>
  </div>
  `
}
