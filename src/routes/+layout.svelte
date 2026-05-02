<script lang="ts">
	import '$lib/assets/styles/index.css'
	import favicon from '$lib/assets/favicon.svg'
	import SidePanel from '$lib/components/SidePanel.svelte'
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: true,
				retry: false,
			},
		},
	})
	import type { Snippet } from 'svelte'
	import ModalContainer from '$lib/components/app/modal/ModalContainer.svelte'
	import ToastContainer from '$lib/components/app/toast/ToastContainer.svelte'
	import MarkerTooltipContainer from '$lib/components/app/marker-tooltip/MarkerTooltipContainer.svelte'
	import { theme, type Theme } from '$lib/theme/theme.svelte'

	let { children, data } = $props<{ children: Snippet; data: { theme: Theme } }>()

	$effect(() => {
		theme.init(data.theme)
	})
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>국토 - 대한민국 부동산 지도</title>
</svelte:head>

<QueryClientProvider client={queryClient}>
	<div class="layout-root relative h-dvh w-screen overflow-hidden bg-main">
		<!-- 메인 콘텐츠 (지도 등) - 화면 전체를 채움 -->
		<main class="absolute inset-0 z-0">
			{@render children()}
		</main>

		<!-- 통합 사이드바 (검색 + 상세 정보) -->
		<SidePanel />

		<!-- 모달 시스템 -->
		<MarkerTooltipContainer />
		<ModalContainer />
		<ToastContainer />
	</div>
</QueryClientProvider>
