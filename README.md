# Gukto Frontend

국토(Gukto) 프로젝트의 프론트엔드 저장소입니다. SvelteKit과 Svelte 5를 활용하여 강력한 지형 기반 부동산 정보 서비스를 제공합니다.

## 핵심 기술 스택 (Tech Stack)

- **Framework:** SvelteKit (SSR Enabled)
- **Production Runtime:** Node.js (`@sveltejs/adapter-node`)
- **State & Data Fetching:** Svelte 5 Runes + TanStack Query
- **Styling:** Tailwind CSS (Headless Custom UI)
- **Testing:** Playwright (E2E), Vitest (Unit)

## 시작하기 (Getting Started)

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

루트 디렉토리에 `.env` 파일을 생성하고 필요한 값을 설정합니다.

```env
# Naver Maps API V3 Client ID
NCP_API_ID=your_client_id_here

# Go Backend REST API Endpoint
PUBLIC_API_URL=http://localhost:8080
```

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 빌드 및 배포 (Node.js 어댑터)

```bash
npm run build
# 빌드된 결과물 실행
node build/index.js
```

## 개발 가이드라인

상세한 코딩 컨벤션 및 아키텍처 규칙은 [AGENTS.md](./AGENTS.md)를 참조하세요!
