<script lang="ts">
	import './layout.css'
	import favicon from '$lib/assets/favicon.svg'
	import { env } from '$env/dynamic/public'
	import { onMount } from 'svelte'
	import GHeader from '$lib/components/GHeader.svelte'

	let { children } = $props()

	let mapElement: HTMLDivElement | null = $state(null)
	let mapInstance: any = $state(null)
	let isMapLoaded = $state(false)

	onMount(() => {
		const clientId = env.PUBLIC_NAVER_ID
		if (!clientId) {
			console.error('PUBLIC_NAVER_ID is missing in environment variables.')
			return
		}

		// 동적으로 네이버 지도 스크립트 로드
		const script = document.createElement('script')
		script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`
		script.async = true
		script.onload = () => {
			isMapLoaded = true
			if (mapElement && window.naver && window.naver.maps) {
				mapInstance = new window.naver.maps.Map(mapElement, {
					center: new window.naver.maps.LatLng(37.5666805, 126.9784147), // 서울시청 기본 좌표
					zoom: 15,
					mapTypeControl: true
				})
			}
		}
		document.head.appendChild(script)

		return () => {
			if (script && script.parentNode) {
				script.parentNode.removeChild(script)
			}
		}
	})
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>국토 - 대한민국 부동산 지도</title>
</svelte:head>

<!-- 지도 렌더링 컨테이너 -->
<div class="layout-root relative h-[100dvh] w-screen overflow-hidden">
	<div bind:this={mapElement} class="absolute inset-0 z-0 h-full w-full bg-slate-100">
		{#if !isMapLoaded}
			<div class="flex h-full w-full items-center justify-center text-slate-400">
				지도를 불러오는 중...
			</div>
		{/if}
	</div>

	<!-- 오버레이 UI -->
	<div class="pointer-events-none relative z-10 flex h-full w-full flex-col">
		<GHeader />
		<div class="pointer-events-auto flex-1 overflow-y-auto">
			{@render children()}
		</div>
	</div>
</div>
