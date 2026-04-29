import { createQuery } from '@tanstack/svelte-query'
import { fetchMapProperties, type MapSearchParams } from '$lib/api/map'

/**
 * 좌표 소수점 반올림 (캐시 히트율 향상용)
 * 약 11m 오차범위 내에서는 동일한 좌표로 인식하여 불필요한 재요청 방지
 */
const roundCoordinate = (n: number) => Math.round(n * 10000) / 10000

export const useMapProperties = (getParams: () => MapSearchParams | null) => {
	// 반응형 파라미터 생성
	const params = $derived.by(() => {
		const p = getParams()
		if (!p) return null

		return {
			swLat: roundCoordinate(p.swLat),
			swLng: roundCoordinate(p.swLng),
			neLat: roundCoordinate(p.neLat),
			neLng: roundCoordinate(p.neLng),
			zoom: p.zoom,
			type: p.type,
		}
	})

	const query = createQuery(() => ({
		queryKey: ['map', 'properties', params],
		queryFn: () => fetchMapProperties(params!),
		enabled: !!params,
		staleTime: 1000 * 30, // 30초간 신선한 상태 유지
		gcTime: 1000 * 60 * 5, // 5분간 캐시 유지 (화면 전환 시 재사용)
	}))

	return {
		get data() {
			return query.data
		},
		get isLoading() {
			return query.isLoading
		},
		get isError() {
			return query.isError
		},
		get error() {
			return query.error
		},
		get isFetching() {
			return query.isFetching
		},
	}
}
