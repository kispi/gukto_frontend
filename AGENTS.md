# Frontend Architecture & AI Coding Rules

## 0. Workflow

- 작업이 끝나면 conventional git commit을 **영어로 제안**합니다. 필요한 경우 타이틀 뿐 아니라 본문도 작성할 수 있습니다.
- **작업 내역 문서화 (Walkthrough):** 중요한 작업을 완료한 후에는 작업 내용을 `docs/walkthrough/` 디렉터리에 마크다운(markdown) 파일로 정리해야 합니다.
  - 파일 이름 형식은 **반드시** 영어 소문자 중심의 `YYMMDDHHMMSS-taskname.md` 형식을 따라야 합니다. (예: `260324194715-rent-data-modeling.md`).
  - 가독성을 위해 날짜와 태스크 이름 사이에 하이픈(`-`)을 사용하는 것을 권장합니다.
  - 문서 내용에는 문제의 배경, 해결 방법, 수정된 파일 목록 및 검증(테스트) 과정을 포함하며 **모두 한국어로 작성**해야 합니다.

## 1. Tech Stack

- Framework: SvelteKit (SSR Enabled, `adapter-node` for production)
- Package Manager: npm (for dev, install, and tooling)
- State Management (Local): Svelte 5 Runes (`$state`, `$derived`, `$effect`)
- State Management (Server/Async): TanStack Query + native fetch wrapper
- Styling: Tailwind CSS (PostCSS)
- Testing: Playwright (E2E), Vitest (Unit)
- Tooling: Husky (pre-commit commitlint), ESLint, Prettier

## 2. Strict Coding Standards

- **NO `function` KEYWORD:** `function` 키워드 사용을 엄격히 금지합니다. 모든 함수(컴포넌트 로직, 유틸리티, API Fetcher 등)는 반드시 화살표 함수(Arrow Function)로 작성합니다.
  - ❌ `function loadData() {}`
  - ✅ `const loadData = async () => {}`
- **Component Naming:**
  - 모든 컴포넌트 파일명은 최소 두 단어 이상의 `PascalCase`로 작성합니다. (예: `PriceChart.svelte`)
  - 적절한 두 단어가 없다면 Prefix `G` (Gukto)를 붙입니다. (예: `GDropdown.svelte`, `GButton.svelte`)
  - 모달 컴포넌트는 반드시 `Modal` prefix를 사용합니다. (예: `ModalBasic.svelte`, `ModalConfirm.svelte`)
- **Root Element Class Convention:**
  - 모든 컴포넌트의 루트 HTML 엘리먼트에는 컴포넌트명을 `dash-case(kebab-case)`로 변환하여 `class` 속성에 부여해야 합니다.
  - 예: `ModalBasic.svelte` -> `<div class="modal-basic bg-white ...">`
- **Linting & Formatting:** No semicolons (Prettier config: `semi: false`), use single quotes (`'`) for strings over double quotes.

## 3. UI/UX Rules

- **UI Lib:** Tailwind CSS로 직접 구현합니다. 또한, 산발적으로 utility class를 남발하여 readability를 해치지 말고, 적절한 커스텀 컴포넌트 또는 커스텀 클래스(ex: `btn-primary`, `btn-default`...)로 캡슐화하세요. **프로젝트 전체를 통틀어 최소한의 utility class가 사용되고도 동일한 효과를 거둘 수 있어야 합니다.**
- **Allowed Third-Party Libs:** 날짜 처리는 `dayjs`만 허용합니다. 비슷한 기능이라면 항상 번들 사이즈가 작은 패키지를 선택해야 합니다.
- **No Native Alerts:** 브라우저 내장 `alert()`, `confirm()`, `prompt()` 사용을 금지합니다.
- **Custom Modal System:** 전역 모달 시스템은 스토어(Runes) 기반으로 구성하며, 호출 시 다음과 같은 패턴을 사용해야 합니다.
  - ✅ `modal.custom({ component: ModalBasic, props: { title: '알림' } })`
  - 위 `custom` 메소드를 이용해 `modal.alert(...)` 또는 `modal.confirm(...)` 형태로 쓸 수 있는 sugar를 구현합니다.

## 4. API & Data Fetching Architecture

- 프론트엔드에서 DB에 직접 접근하는 것은 금지되어 있습니다.
- SSR이 필요한 페이지(SEO 대상, 예: 아파트 상세정보)는 `+page.server.ts`의 `load` 함수 내에서 Go 백엔드 REST API를 호출하여 데이터를 렌더링합니다.
- CSR이 필요한 상호작용(지도 드래그, 무한 스크롤 피드 등)은 TanStack Query를 사용합니다.
- 모든 API 호출은 커스텀 `fetch` 래퍼를 사용하며, 향후 JWT Bearer Token을 쿠키에서 추출해 헤더에 주입하기 쉽도록 설계되어야 합니다.

## 5. File Structure & Clean Code

- 코드가 길어지거나 하위 컴포넌트가 파생될 경우, 즉시 폴더를 생성하여 관련된 코드(컴포넌트, 타입, 유틸)를 Co-location(밀집) 시킵니다.
- 비즈니스 로직(데이터 파싱, 계산 로직 등)은 Svelte 컴포넌트 내부에 두지 않고 외부 `.ts` 파일로 분리하여 테스트 가능하게 작성합니다.
