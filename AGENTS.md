# Frontend Architecture & AI Coding Rules

## 0. Workflow

- 작업이 끝나면 conventional git commit을 **영어로 제안**합니다.
  - 커밋 메시지를 추천하기 전, 반드시 린트(`npm run lint`)를 실행하여 에러가 없는지 확인하고, 발견된 모든 문제를 수정한 뒤 사용자에게 완료 보고를 해야 합니다.
  - 커밋 메시지를 추천하기 전, 반드시 `git log`로 최근 히스토리를 확인하고 현재 스테이징된 파일(`git diff --cached`)을 점검하여 맥락에 맞는 메시지를 작성하세요.
  - 필요한 경우 타이틀 뿐 아니라 본문도 작성할 수 있습니다.

## 1. Tech Stack

- Framework: SvelteKit (SSR Enabled, `adapter-node` for production)
- Package Manager: npm (for dev, install, and tooling)
- State Management (Local): Svelte 5 Runes (`$state`, `$derived`, `$effect`)
- State Management (Server/Async): TanStack Query + native fetch wrapper
- Styling: Tailwind CSS (PostCSS)
- Testing: Playwright (E2E), Vitest (Unit)
- Tooling: Husky (pre-commit commitlint), ESLint, Prettier
  - **Commit Message Limit:** `commitlint` 규칙에 따라 커밋 메시지 헤더(첫 줄)는 **100자**를 초과할 수 없습니다.

## 2. Strict Coding Standards

- **NO `function` KEYWORD:** `function` 키워드 사용을 엄격히 금지합니다. 모든 함수(컴포넌트 로직, 유틸리티, API Fetcher 등)는 반드시 화살표 함수(Arrow Function)로 작성합니다.
  - ❌ `function loadData() {}`
  - ✅ `const loadData = async () => {}`
- **NO `class` KEYWORD:** Svelte 컴포넌트 로직이나 상태 관리(Store)를 구현할 때 `class` 키워드 사용을 엄격히 금지합니다. 커스텀 훅이나 전역 상태를 만들 때는 클로저(Closure) 기반의 팩토리 함수 패턴과 getter를 반환하는 방식을 사용하세요.
- **Type vs Interface:** 프론트엔드 프로젝트에서는 `interface` 사용을 금지하고 항상 `type`을 사용합니다. 전역 객체(`Window` 등)를 확장(Declaration Merging)해야 하는 특수한 경우(`app.d.ts` 등)에만 예외적으로 `interface`를 허용합니다.
- **Component Naming:**
  - 모든 컴포넌트 파일명은 최소 두 단어 이상의 `PascalCase`로 작성합니다. (예: `PriceChart.svelte`)
  - 적절한 두 단어가 없다면 Prefix `G` (Gukto)를 붙입니다. (예: `GDropdown.svelte`, `GButton.svelte`)
  - 모달 컴포넌트는 반드시 `Modal` prefix를 사용합니다. (예: `ModalBasic.svelte`, `ModalConfirm.svelte`)
- **Root Element Class Convention:**
  - 모든 컴포넌트의 루트 HTML 엘리먼트에는 컴포넌트명을 `dash-case(kebab-case)`로 변환하여 `class` 속성에 부여해야 합니다.
  - 예: `ModalBasic.svelte` -> `<div class="modal-basic bg-white ...">`
- **Linting & Formatting:** No semicolons (Prettier config: `semi: false`), use single quotes (`'`) for strings over double quotes.
- **Tailwind Anti-Patterns:** 가급적 대괄호를 사용하는 임의 값(`h-[100dvh]`, `w-[400px]` 등) 사용을 금지합니다. Tailwind 표준 유틸리티를 사용하거나, 필요한 경우 CSS 모듈(시맨틱 클래스)에 정의하여 사용하세요.

## 3. Svelte 5 Reactivity (Runes)

- **Maintaining Prop Reactivity:** `$props()`로 전달받은 값을 스크립트 최상위(Top-level)에서 지역 변수에 할당하거나 초기화 함수에 직접 전달하는 것을 금지합니다. 이는 초기값만 캡처(`state_referenced_locally`)하여 반응성이 소실되는 원인이 됩니다.
- **Use `$derived` for values:** 다른 상태나 prop으로부터 파생되는 값은 반드시 `$derived`를 사용합니다.
  - ❌ `const user = data.user`
  - ✅ `const user = $derived(data.user)`
- **Use `$effect` for side effects:** prop 변경에 따라 사이드 이펙트(함수 호출, 외부 상태 동기화 등)를 실행해야 할 경우 반드시 `$effect`로 감싸야 합니다.
  - ❌ `theme.init(data.theme)`
  - ✅ `$effect(() => { theme.init(data.theme) })`
- **Hook Return Pattern:** Svelte 5 커스텀 훅(Runes 기반)에서 상태를 반환할 때, primitive 값의 반응성을 유지하면서 중첩 없이(`hook.isLoaded`) 접근하기 위해 **getter 패턴**을 사용하는 것을 권장합니다.
  - ✅ `return { get count() { return count }, inc() { ... } };` (중첩 없이 반응성 유지)
  - ❌ `let count = $state(0); return { count };` (반응성 소실)
  - 만약 상태가 많고 구조가 복잡하다면 하나의 `$state` 객체에 담아 반환할 수도 있으나, 사용 편의성을 위해 가급적 flat한 구조를 유지합니다.

## 4. UI/UX Rules

- **Design Standard:** 디자인 철학 및 시각적 표준(Border Radius, Semantic Colors 등)에 대해서는 반드시 **[DESIGN.md](./DESIGN.md)**를 참고하여 구현해야 합니다.
- **UI Implementation:** Tailwind CSS를 사용하되, 산발적으로 utility class를 남발하지 말고 적절한 커스텀 컴포넌트나 시맨틱 클래스로 캡슐화합니다. 특히 컴포넌트 로직이나 스토어 내에 구체적인 색상 utility class를 직접 입력하는 것을 지양합니다.
- **Allowed Third-Party Libs:** 날짜 처리는 `dayjs`만 허용하며, 비슷한 기능이라면 항상 번들 사이즈가 작은 패키지를 선택합니다.
- **No Native Alerts:** 브라우저 내장 `alert()`, `confirm()`, `prompt()` 사용을 금지합니다.
- **Custom Modal System:** 전역 모달 시스템은 스토어(Runes) 기반으로 구성하며, 호출 시 `modal.custom({ component, props })` 패턴을 사용합니다.

## 5. API & Data Fetching Architecture

- 프론트엔드에서 DB에 직접 접근하는 것은 금지되어 있습니다.
- SSR이 필요한 페이지(SEO 대상, 예: 아파트 상세정보)는 `+page.server.ts`의 `load` 함수 내에서 Go 백엔드 REST API를 호출하여 데이터를 렌더링합니다.
- CSR이 필요한 상호작용(지도 드래그, 무한 스크롤 피드 등)은 TanStack Query를 사용합니다.
- 모든 API 호출은 커스텀 `fetch` 래퍼를 사용하며, 향후 JWT Bearer Token을 쿠키에서 추출해 헤더에 주입하기 쉽도록 설계되어야 합니다.

## 6. File Structure & Clean Code

- 코드가 길어지거나 하위 컴포넌트가 파생될 경우, 즉시 폴더를 생성하여 관련된 코드(컴포넌트, 타입, 유틸)를 Co-location(밀집) 시킵니다.
- 비즈니스 로직(데이터 파싱, 계산 로직 등)은 Svelte 컴포넌트 내부에 두지 않고 외부 `.ts` 파일로 분리하여 테스트 가능하게 작성합니다.
- **Formatting:** No semicolons, use single quotes, and **always use trailing commas** (Prettier config: `trailingComma: 'all'`).
