# Frontend Scaffolding & Map Layout

## 문제의 배경

- 국토(Gukto) 프론트엔드 프로젝트의 초기 환경을 구축하고, 주요 기능을 담당할 지도를 전역 레이아웃(`+layout.svelte`)에 마운트하여 기본 뼈대를 잡는 작업이 필요했습니다.

## 해결 방법

1. **스캐폴딩 및 패키지 설치**: `npx sv create` 명령어를 통해 SvelteKit (Svelte 5 Runes 기반) + TailwindCSS 프로젝트를 생성하고, 요구사항에 맞춰 `@tanstack/svelte-query`, `lucide-svelte` 등의 필수 패키지를 추가 설치했습니다.
2. **코드 컨벤션 적용**: `AGENTS.md`의 규칙을 준수하기 위해 Prettier 세미콜론 제거 및 ESLint에서 `function` 키워드 사용을 막는 룰(`func-style`, `prefer-arrow-callback`)을 적용했습니다.
3. **네이버 지도 연동**: 환경변수에 `PUBLIC_NAVER_ID`를 등록하고, `+layout.svelte` 내에서 클라이언트 사이드 마운트(`onMount`) 시점에 네이버 지도 API 스크립트를 동적 로드하여 브라우저 풀스크린으로 렌더링되도록 구현했습니다.
4. **오버레이 UI**: 지도 위에 뜰 검색 및 메뉴 바(`GHeader.svelte`)를 작성하여 `+layout.svelte`에 포함시켰습니다.

## 수정된 파일 목록

- `package.json`: 의존성 패키지 추가
- `.prettierrc`: `semi: false` 적용
- `eslint.config.js`: `function` 키워드 사용 금지 룰 추가
- `.env`, `.env.sample`: `PUBLIC_NAVER_ID` 추가
- `src/app.html`: 전체화면(`100dvh`, `overflow-hidden`) 레이아웃 스타일 적용
- `src/app.d.ts`: TypeScript 컴파일 에러 방지를 위해 `Window` 인터페이스에 `naver` 추가
- `src/routes/+layout.svelte` (수정): 네이버 맵 렌더링 로직 추가
- `src/lib/components/GHeader.svelte` (신규): 상단 헤더 컴포넌트 추가
- `src/routes/+page.svelte` (수정): 기본 텍스트 제거 및 클린업

## 검증(테스트) 과정

- `npm run check` 명령어를 통해 TypeScript 및 Svelte 문법 에러가 발생하지 않음을 확인했습니다.
- `app.d.ts`를 확장하여 전역 객체인 `window.naver`에 대한 컴파일 타임 타입 검사 오류를 해결했습니다.
