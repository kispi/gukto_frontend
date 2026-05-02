<script lang="ts">
	import { useNaverMap } from '$lib/hooks/useNaverMap.svelte'
	import { getMapState } from '$lib/map/GMapHandlers'
	import { useMapProperties } from '$lib/map/useMapProperties.svelte'
	import type { MapSearchParams } from '$lib/api/map'
	import { markerTooltip } from '$lib/ui'

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

	// 데이터 확인용 로그 및 마커 렌더링
	let markers: naver.maps.Marker[] = []
	let listeners: window.naver.maps.MapEventListener[] = []

	$effect(() => {
		if (!naverMap.mapInstance || !properties.data) return

		const map = naverMap.mapInstance

		// 기존 마커 및 이벤트 리스너 제거
		markers.forEach((marker) => marker.setMap(null))
		listeners.forEach((listener) => window.naver.maps.Event.removeListener(listener))
		markers = []
		listeners = []

		if (properties.data.mode === 'marker') {
			markers = properties.data.items.map((item) => {
				const contentString = `
					<div class="relative flex flex-col items-center justify-center -translate-x-1/2 -translate-y-full cursor-pointer">
						<div class="relative z-10 flex items-center gap-1 rounded-md bg-panel px-2 py-1 text-xs font-semibold text-main shadow-premium ring-1 ring-border">
							<span class="text-orange-500">${item.area}평</span>
							<span>${item.price}</span>
						</div>
						<div class="absolute -bottom-1.5 z-0 h-3 w-3 rotate-45 border-b border-r border-border bg-panel shadow-sm"></div>
					</div>
				`

				const marker = new window.naver.maps.Marker({
					position: new window.naver.maps.LatLng(item.lat, item.lng),
					map: map,
					icon: {
						content: contentString,
						anchor: new window.naver.maps.Point(0, 0), // offset is handled in css
					},
					zIndex: 10,
				})

				// 이벤트 리스너 등록
				listeners.push(
					window.naver.maps.Event.addListener(
						marker,
						'mouseover',
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						(e: any) => {
							markerTooltip.show({
								item,
								x: e.pointerEvent.clientX,
								y: e.pointerEvent.clientY,
							})
						},
					),
				)

				listeners.push(
					window.naver.maps.Event.addListener(marker, 'mouseout', () => {
						markerTooltip.hide()
					}),
				)

				return marker
			})
		} else if (properties.data.mode === 'cluster') {
			markers = properties.data.items.map((item) => {
				const contentString = `
					<div class="flex items-center justify-center w-12 h-12 rounded-full bg-panel text-main font-bold shadow-premium ring-2 ring-orange-500/80 hover:bg-sub cursor-pointer transition-colors -translate-x-1/2 -translate-y-1/2">
						${item.count}
					</div>
				`

				return new window.naver.maps.Marker({
					position: new window.naver.maps.LatLng(item.lat, item.lng),
					map: map,
					icon: {
						content: contentString,
						anchor: new window.naver.maps.Point(0, 0),
					},
					zIndex: 5,
				})
			})
		}

		return () => {
			markers.forEach((marker) => marker.setMap(null))
			listeners.forEach((listener) => window.naver.maps.Event.removeListener(listener))
			markerTooltip.hide()
		}
	})
</script>

<div class="g-map relative h-full w-full bg-slate-50">
	<div bind:this={mapElement} class="absolute inset-0 h-full w-full"></div>
	{#if !naverMap.isLoaded}
		<div class="absolute inset-0 flex items-center justify-center text-muted">
			지도를 불러오는 중...
		</div>
	{/if}
</div>
