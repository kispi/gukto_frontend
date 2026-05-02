import { apiClient } from './client'

export type MapSearchParams = {
	swLat: number
	swLng: number
	neLat: number
	neLng: number
	zoom: number
	type?: string // comma-separated: 'APT,OFFI'
}

export type MarkerItem = {
	type: 'marker'
	id: string
	name: string
	propertyType: string
	lat: number
	lng: number
	buildYear: number
	address: string
	price: string
	area: number
}

export type MapResponse = {
	mode: 'marker' | 'cluster'
	items: MarkerItem[]
	total: number
}

export const fetchMapProperties = async (params: MapSearchParams): Promise<MapResponse> => {
	return apiClient.get<MapResponse>('/api/v1/map/properties', params)
}
