import type { MarkerItem } from '$lib/api/map'

export type MarkerTooltipOptions = {
	item: MarkerItem
	x: number
	y: number
}

const createMarkerTooltipStore = () => {
	let tooltipData = $state<MarkerTooltipOptions | null>(null)

	return {
		get data() {
			return tooltipData
		},
		show: (options: MarkerTooltipOptions) => {
			tooltipData = options
		},
		hide: () => {
			tooltipData = null
		},
	}
}

export const markerTooltip = createMarkerTooltipStore()
