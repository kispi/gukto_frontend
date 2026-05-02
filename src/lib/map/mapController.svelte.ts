/// <reference types="navermaps" />

let mapInstance = $state<naver.maps.Map | null>(null)

export const mapController = {
	get map() {
		return mapInstance
	},
	setMap: (map: naver.maps.Map | null) => {
		mapInstance = map
	},
	moveTo: (lat: number, lng: number, zoom: number = 15) => {
		if (!mapInstance) return
		mapInstance.setCenter(new window.naver.maps.LatLng(lat, lng))
		mapInstance.setZoom(zoom, true) // 두 번째 인자는 애니메이션 유무 (true = 부드럽게)
	},
}
