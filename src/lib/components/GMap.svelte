<script lang="ts">
	import { useNaverMap } from '$lib/hooks/useNaverMap.svelte'

	let mapElement: HTMLDivElement | null = $state(null)
	const naverMap = useNaverMap()

	$effect(() => {
		if (naverMap.isLoaded && mapElement && !naverMap.mapInstance) {
			naverMap.initMap(mapElement)
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
