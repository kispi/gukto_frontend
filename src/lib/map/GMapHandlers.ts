/// <reference types="navermaps" />

/**
 * 지도가 유휴(Idle) 상태일 때 실행할 비즈니스 로직 핸들러
 */
export const handleMapIdle = (map: naver.maps.Map) => {
	const b = map.getBounds() as naver.maps.LatLngBounds
	const sw = b.getSW()
	const ne = b.getNE()

	const payload = {
		minLat: sw.lat(),
		minLng: sw.lng(),
		maxLat: ne.lat(),
		maxLng: ne.lng(),
		zoom: map.getZoom(),
	}

	console.log('[GMapHandlers] Map Idle - Payload for API:', payload)

	// TODO: 실제 API 호출 서비스(TanStack Query 등) 연동
	// fetchProperties(payload);
}
