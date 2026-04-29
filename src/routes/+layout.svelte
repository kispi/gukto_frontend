<script lang="ts">
	import './layout.css'
	import favicon from '$lib/assets/favicon.svg'
	import GHeader from '$lib/components/GHeader.svelte'
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'

	let { children } = $props()

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: true,
				retry: false,
			},
		},
	})
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>국토 - 대한민국 부동산 지도</title>
</svelte:head>

<QueryClientProvider client={queryClient}>
	<div class="layout-root relative h-dvh w-screen overflow-hidden">
		<!-- 헤더는 전역으로 노출 -->
		<div class="pointer-events-none relative z-10 flex h-full w-full flex-col">
			<GHeader />
			<main class="pointer-events-auto relative flex-1 overflow-hidden">
				{@render children()}
			</main>
		</div>
	</div>
</QueryClientProvider>
