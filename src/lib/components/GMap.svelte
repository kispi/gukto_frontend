<script lang="ts">
	import { useNaverMap } from '$lib/hooks/useNaverMap.svelte'
	import { getMapState } from '$lib/map/GMapHandlers'
	import { useMapProperties } from '$lib/map/useMapProperties.svelte'
	import type { MapSearchParams } from '$lib/api/map'

	let mapElement: HTMLDivElement | null = $state(null)
	const naverMap = useNaverMap()

	// 지도 파라미터 상태 관리
	let mapParams = $state<MapSearchParams | null>(null)

	// 매물 데이터 페칭 훅
	const properties = useMapProperties(() => mapParams)

	$effect(() => {
		if (naverMap.isLoaded && mapElement && !naverMap.mapInstance) {
			naverMap.initMap(mapElement)
		}
	})

	// 지도 영역(bounds)이 변경될 때마다 파라미터 업데이트
	$effect(() => {
		if (naverMap.bounds && naverMap.mapInstance) {
			mapParams = getMapState(naverMap.mapInstance)
		}
	})

	// 데이터 확인용 로그 (개발 모드)
	$effect(() => {
		if (properties.data) {
			console.log('[GMap] Properties loaded:', properties.data.items.length)
		}
	})
</script>

<div class="g-map relative h-full w-full bg-slate-100">
	<div bind:this={mapElement} class="absolute inset-0 h-full w-full"></div>
	{#if !naverMap.isLoaded}
		<div class="absolute inset-0 flex items-center justify-center text-slate-400">
			지도를 불러오는 중...
		</div>
	{/if}
</div>
