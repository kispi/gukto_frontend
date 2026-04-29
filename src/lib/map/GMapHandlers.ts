/// <reference types="navermaps" />

/**
 * 지도가 유휴(Idle) 상태일 때 현재 뷰포트 정보를 추출
 */
export const getMapState = (map: naver.maps.Map) => {
	const b = map.getBounds() as naver.maps.LatLngBounds
	const sw = b.getSW()
	const ne = b.getNE()

	return {
		swLat: sw.lat(),
		swLng: sw.lng(),
		neLat: ne.lat(),
		neLng: ne.lng(),
		zoom: map.getZoom(),
	}
}
