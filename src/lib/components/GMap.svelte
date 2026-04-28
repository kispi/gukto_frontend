<script lang="ts">
	import { useNaverMap } from '$lib/hooks/useNaverMap.svelte'
	import { handleMapIdle } from '$lib/map/GMapHandlers'

	let mapElement: HTMLDivElement | null = $state(null)
	const naverMap = useNaverMap()

	$effect(() => {
		if (naverMap.isLoaded && mapElement && !naverMap.mapInstance) {
			naverMap.initMap(mapElement)
		}
	})

	// 지도 영역(bounds)이 변경될 때마다 실행될 비즈니스 로직
	$effect(() => {
		if (naverMap.bounds && naverMap.mapInstance) {
			handleMapIdle(naverMap.mapInstance)
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
