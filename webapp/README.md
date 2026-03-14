# 태평가이드치과 (tpguide.com)

## URLs
- **Production**: https://tpguide.com
- **Cloudflare Pages**: https://tpguide.pages.dev
- **Cloudflare Project Name**: tpguide

## Tech Stack
- Hono + TypeScript + Vite
- Cloudflare Pages (Workers)
- Cloudflare KV (MEMBERS, IMAGES)
- Solapi SMS API, Kakao/Naver OAuth

## API Tokens & Secrets (Cloudflare Pages)
| Secret | 용도 |
|---|---|
| SOLAPI_API_KEY | Solapi SMS API |
| SOLAPI_API_SECRET | Solapi SMS API |
| SOLAPI_SENDER | 발신번호 031-751-7528 |
| SMS_RECEIVER | 수신번호 010-4202-2685 |
| KAKAO_REST_API_KEY | 카카오 로그인 |
| NAVER_CLIENT_ID | 네이버 로그인 (18FY168RObVO7OvJFcvw) |
| NAVER_CLIENT_SECRET | 네이버 로그인 |
| AUTH_SECRET | 인증 시크릿 |
| ADMIN_PASSWORD | 관리자 비밀번호 (getsomedw!12) |

## KV Namespaces
| Binding | ID | 용도 |
|---|---|---|
| MEMBERS | dcd931ed1753489eb78a773e3f15fa4d | 회원 데이터 |
| IMAGES | c5e636adcf6540029dec31a23537228b | Before/After 이미지 |

## Cloudflare API Token
- Token: w9u2qZHUWvN0pY6IDegr9DwCLHVa4ze1K0tgkjxJ
- Account: drdwyoon@gmail.com (44db8e3a4222eb6a153c5d8b2fb711e7)

## SEO & 검색엔진 등록
- **Google Search Console**: 등록 완료, sitemap 제출 완료
- **네이버 Search Advisor**: 등록 완료 (meta 인증: 5cfd3fa8b484b29d18ebc4575160ca368de4f2bf)
- **sitemap.xml**: /sitemap.xml (src/index.tsx에서 동적 생성)
- **robots.txt**: /robots.txt (src/index.tsx에서 동적 생성)
- **숨김 H1**: "성남 수정구 태평가이드치과 - 통합치의학과 전문의의 믿을 수 있는 진료" (sr-only)
- **네이버 인증 메타태그**: layout.ts의 `<head>`에 삽입

## 진료시간 (상단 배지 로직에 사용)
| 요일 | 시간 |
|---|---|
| 월 | 09:30 - 18:30 |
| 화 | 09:30 - 20:30 (야간진료) |
| 수 | 09:30 - 18:30 |
| 목 | 09:30 - 18:30 |
| 금 | 휴진 |
| 토 | 09:30 - 13:30 |
| 일/공휴일 | 휴진 |
| 점심 | 13:00 - 14:00 (토요일 제외) |

## Pages & Routes

### Page Routes
| Path | 설명 |
|---|---|
| / | 홈 (히어로, 철학, 퀵링크) |
| /treatments | 진료안내 목록 |
| /treatments/:id | 진료 상세 (implant, cosmetic, cavity, pediatric, gum) |
| /doctor | 의료진 소개 |
| /mission | 미션과 비전 |
| /content | 콘텐츠 |
| /content/before-after | 치료 전후 사진 (회원 전용) |
| /info | 병원안내 (오시는 길, 상담신청) |
| /mypage | 마이페이지 (전화번호, SMS 동의) |
| /admin | 관리자 (Before/After 업로드/관리) |
| /privacy | 개인정보처리방침 |
| /robots.txt | 크롤러 안내 |
| /sitemap.xml | 사이트맵 (12개 URL) |

### API Routes
| Method | Path | 인증 | 설명 |
|---|---|---|---|
| POST | /api/consultation | - | 상담 접수 + SMS |
| GET | /api/auth/kakao | - | 카카오 로그인 |
| GET | /api/auth/kakao/callback | - | 카카오 콜백 |
| GET | /api/auth/naver | - | 네이버 로그인 |
| GET | /api/auth/naver/callback | - | 네이버 콜백 |
| GET | /api/auth/logout | - | 로그아웃 |
| GET | /api/auth/me | - | 로그인 확인 |
| GET | /api/member/me | cookie | 회원 정보 |
| POST | /api/member/update | cookie | 회원 정보 수정 |
| POST | /api/admin/login | password | 관리자 로그인 |
| POST | /api/admin/ba/upload | X-Admin-Token | 사진 업로드 |
| GET | /api/admin/ba/list | X-Admin-Token | 사진 목록 (관리자) |
| POST | /api/admin/ba/delete | X-Admin-Token | 사진 삭제 |
| GET | /api/ba/list | - | 사진 목록 (공개) |
| GET | /api/ba/image/:id/:type | - | 이미지 서빙 |

## Project Structure
```
src/
  index.tsx          # 메인 앱 (라우트, API, sitemap, robots.txt)
  pages/
    home.ts, treatments.ts, doctor.ts, mission.ts
    content.ts, info.ts, mypage.ts, admin.ts, privacy.ts
  components/
    layout.ts         # 공통 레이아웃 (head, nav, footer, 네이버 인증 메타태그)
    header.ts         # 상단 네비바 (로고 + 진료상태 배지 + 메뉴)
    footer.ts         # 하단 푸터
    styles.ts         # 전역 CSS (sr-only, 진료상태 배지, 반응형)
public/static/       # 정적 파일 (로고, 이미지 - JPG + WebP)
```

## Git
- Rollback point: `git checkout rollback-point-v1` (관리자 기능 추가 전)

## Completed Features
- 전 페이지 반응형 (PC/모바일)
- 카카오/네이버 소셜 로그인
- 상담 접수 + SMS 알림 (Solapi)
- 마이페이지 (전화번호, SMS 마케팅 동의)
- 관리자 페이지 (Before/After 사진 업로드/삭제)
- 회원 전용 Before/After 갤러리 + 이미지 뷰어
- SEO 헤딩 구조 최적화 (H1>H2>H3)
- SEO용 숨김 H1 (성남 수정구 태평가이드치과 키워드)
- 이미지 WebP 변환 + lazy loading (consult1, consult2, doctor)
- 상단 실시간 진료 상태 배지 (진료중/점심/휴진/종료 + 다음 오픈 시간)
- 네비바 메뉴 중앙 정렬, 폰트 크기/굵기 개선
- sitemap.xml + robots.txt
- Google Search Console 등록 완료
- 네이버 Search Advisor 등록 완료
- 카카오 Redirect URI에 tpguide.com 추가
- SMS 마케팅 발송 기능
- tpguide.com 커스텀 도메인 연결

## TODO
- Google 로그인 연동
- 네이버 로그인 검수 통과
- 콘텐츠 페이지 실제 글 작성
- 병원안내 - 주차 안내 추가
- Open Graph 태그 추가 (SNS 공유 미리보기)
- 구조화 데이터(Schema.org) 추가

## 개발 규칙
- **새 페이지 추가 시 반드시 `src/index.tsx`의 sitemap 라우트에도 URL 추가할 것**
- **배포 시 항상 `npm run build` 후 `wrangler pages deploy dist --project-name tpguide`**
- **이미지 추가 시 WebP 변환 + `<picture>` 태그 + `loading="lazy"` 적용**

## Commands
```bash
npm run build                    # 빌드
npm run dev:sandbox              # 로컬 실행
CLOUDFLARE_API_TOKEN=w9u2qZHUWvN0pY6IDegr9DwCLHVa4ze1K0tgkjxJ npx wrangler pages deploy dist --project-name tpguide  # 배포
```
