# Gukto Frontend Tasks & VIP

> **UX/UI Architecture:**
> 맵(지도)은 `+layout.svelte`에 전역으로 깔리며 일반적으로는 언마운트되지 않습니다. 사용자가 매물을 클릭하면 `/property/[id]`로 라우팅되지만, 이는 화면 전체가 넘어가는 것이 아니라 좌측 패널(사이드바) 컴포넌트가 마운트되고 맵의 중심 좌표가 이동하는 형태로 동작합니다. 모든 상태는 URL(Query Parameter 및 Path)과 동기화되어 완벽한 공유(Share) 경험을 제공합니다.

**아래의 태스크들은 대략적인 로드맵이며, 프로젝트 진행 상황에 따라 꾸준히 업데이트되고 변경될 수 있습니다.**

## Phase 1: Foundation & Base UI (환경 및 기반 컴포넌트) - ✅ 완료

- [x] build: SvelteKit, Tailwind 스캐폴딩 및 `adapter-node` 설정
- [x] config: ESLint, Prettier, Husky(commitlint) 룰 세팅 (No `function`, No Semicolon 등)
- [x] feat: 커스텀 Fetch 래퍼(`apiClient.ts`) 구현 (Base URL 및 에러 핸들링)
- [x] feat: Svelte 5 Runes(`$state`) 기반 전역 Modal, Toast 스토어 및 렌더러 구현
- [ ] feat: 기본 헤드리스 UI 컴포넌트(`GButton`, `GInput`, `GDropdown`) 뼈대 작성

## Phase 2: Core Map Layout & Search (VIP 1 - 지도 및 검색) - 🚧 진행 중

- [x] feat: `+layout.svelte`에 Naver Maps API V3 스크립트 로드 및 전체 화면 맵 마운트 로직 추가
- [x] feat: 지도 `idle` 이벤트(드래그/줌) 발생 시 Debounce 처리하여 백엔드에 클러스터 API 호출 연동
- [ ] feat: 백엔드 응답(Mode: marker/cluster)을 받아 지도 위에 마커 렌더링 로직 구현 (현재 진행 중)
- [ ] feat: 맵 상태(위경도, 줌레벨)를 URL Query Param과 동기화하는 로직 구현
- [ ] feat: 상단 헤더 및 검색창(`GSearchBox`) 레이아웃 추가 (자동완성 UI 틀)
- [ ] feat: 상단 검색창 자동완성 API 연동 및 클릭 시 해당 지역/매물로 지도 이동

## Phase 3: Property Detail Panel (VIP 2 - 매물 상세 좌측 패널)

- [ ] feat: `/property/[id]/+page.svelte` 라우트 생성 및 좌측 슬라이딩 패널 UI 레이아웃 구현
- [ ] feat: SSR(`+page.server.ts`)을 이용한 매물 기본 메타 정보 Fetching 및 OpenGraph 메타태그 동적 생성
- [ ] feat: 좌측 패널 진입 시 맵의 중심(Center)을 해당 매물 좌표로 부드럽게 이동(Panning)시키는 로직
- [ ] feat: 평형(면적) 선택 탭 UI 및 평형 변경 시 TanStack Query로 실거래가 API 재호출
- [ ] feat: 매매/전세 실거래가 시계열 차트 렌더링 (Chart.js 또는 경량 차트 라이브러리 연동)
- [ ] feat: 매매가-전세가 갭(Gap 투자) 바 차트 컴포넌트 구현

## Phase 4: Community Threads (VIP 3 - 매물 의견 피드)

- [ ] feat: 좌측 패널 내 '매물 의견(커뮤니티)' 탭 레이아웃 구현
- [ ] feat: 특정 매물에 태그된 스레드 리스트 무한 스크롤(Infinite Query) 조회 연동

---

## 💡 Additional / Low Priority Tasks

- [ ] feat(chart): 실거래가 차트에 과거 시점 비트코인 종가 기준 환산가(`Price in BTC`) 오버레이 렌더링
- [ ] feat(auth): 이메일 로그인/회원가입 모달 및 API 연동
- [ ] feat(seo): `sitemap.xml` 동적 생성 엔드포인트 구현 (주요 대형 단지 아파트 인덱싱)
