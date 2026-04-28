/// <reference types="navermaps" />
import { env } from '$env/dynamic/public'
import { onMount } from 'svelte'

export const useNaverMap = () => {
	let isLoaded = $state(false)
	let mapInstance = $state<naver.maps.Map | null>(null)

	const loadScript = () => {
		const clientId = env.PUBLIC_NAVER_ID
		if (!clientId) {
			console.error('PUBLIC_NAVER_ID is missing')
			return
		}

		if (window.naver && window.naver.maps) {
			isLoaded = true
			return
		}

		const script = document.createElement('script')
		script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}`
		script.async = true
		script.onload = () => {
			isLoaded = true
		}
		document.head.appendChild(script)
		return script
	}

	const initMap = (element: HTMLElement, options: naver.maps.MapOptions = {}) => {
		if (!window.naver || !window.naver.maps) return

		mapInstance = new window.naver.maps.Map(element, {
			center: new window.naver.maps.LatLng(37.5666805, 126.9784147), // 일단은 서울시청, 나중에는 1. URL의 LatLng 2. 마지막으로 본 위치 3. 사용자의 위치 순으로 설정.
			zoom: 15,
			mapTypeControl: true,
			...options,
		})
	}

	onMount(() => {
		const script = loadScript()
		return () => {
			script?.remove()
		}
	})

	return {
		get isLoaded() {
			return isLoaded
		},
		get mapInstance() {
			return mapInstance
		},
		initMap,
	}
}
