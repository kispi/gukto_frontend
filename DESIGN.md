# Design System & Headless UI Guide

## 1. Core Philosophy: Headless UI

본 프로젝트는 비즈니스 로직 및 상태 관리와 시각적 표현을 완벽히 분리하는 **Headless UI** 패턴을 지향합니다.

- **Logic (Stores/Hooks)**: 데이터, 노출 여부, 상호작용 로직을 담당하며 `.svelte.ts` 파일에 위치합니다.
- **Styling (CSS Modules)**: 시맨틱 클래스를 통해 시각적 요소를 정의하며 `src/lib/assets/styles/`에 위치합니다.
- **Components**: 로직과 스타일을 연결하는 역할만 수행하며, 내부에 하드코딩된 디자인 토큰(색상, 간격 등)을 포함하지 않습니다.

## 2. Visual Standards (Minimalist Professional)

### Border Radius

전문화되고 미니멀한 미학을 유지하기 위해, 표준 `border-radius`는 **8px**(`rounded-lg`)로 제한합니다.

- 특별한 브랜딩 요구사항이 없는 한 `rounded-full`이나 `rounded-2xl` 등의 과도한 곡률은 지양합니다.

### Visual Symmetry & Alignment (대칭 및 정렬)

전문적인 UI를 위해 인접한 상호작용 요소 간의 **'키맞춤(Height Alignment)'**과 **대칭성**을 최우선으로 고려합니다.

- 동일 선상에 있는 컴포넌트(예: 검색바와 기능 버튼)는 물리적인 높이(`height`)가 완벽하게 일치해야 합니다.
- 유동적인 패딩보다는 고정 높이 유틸리티(`h-10`, `h-12` 등)를 사용하여 시각적 파편화를 방지하세요.

### Interactive Affordance

사용자 상호작용이 가능한 모든 요소(버튼, 링크, 토글 가능한 아이콘 등)는 반드시 **`cursor: pointer`** 속성을 가져야 합니다.

- Tailwind 클래스 `cursor-pointer`를 활용하거나 CSS 모듈에서 정의하세요.

### No Hardcoded Colors in Logic

컴포넌트 로직, 스토어, 템플릿 내에서 구체적인 '색상명'이 포함된 Tailwind 유틸리티 클래스(`bg-white`, `text-blue-500` 등)를 직접 사용하는 것을 금지합니다.

- ❌ `<div class="bg-white text-gray-900">`
- ✅ `<div class="modal-body text-main">`

## 3. Semantic Styling System

스타일은 `src/lib/assets/styles/` 폴더 내의 모듈로 관리됩니다.

- **base.css**: 공통 텍스트 색상(`text-main`, `text-sub`) 및 보더 스타일
- **buttons.css**: 액션 버튼 클래스(`btn-primary`, `btn-default`, `btn-icon`)
- **modals.css**: 전역 모달 시스템을 위한 레이아웃 컨테이너
- **toasts.css**: 알림 아이템의 상태별 시각적 표현

새로운 컴포넌트를 구현할 때 기존 시맨틱 클래스가 있는지 먼저 확인하고, 필요한 경우 개별 `.svelte` 파일에 스타일을 작성하는 대신 적절한 CSS 모듈에 추가하여 재사용성을 확보하세요.
