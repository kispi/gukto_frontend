<script lang="ts">
	import { markerTooltip } from '$lib/ui'
	import { fade } from 'svelte/transition'

	const data = $derived(markerTooltip.data)
</script>

{#if data}
	<div
		transition:fade={{ duration: 150 }}
		class="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-[calc(100%+16px)]"
		style="left: {data.x}px; top: {data.y}px;"
	>
		<!-- Tooltip Body -->
		<div class="flex flex-col gap-1 rounded-lg bg-panel px-4 py-3 shadow-premium ring-1 ring-line">
			<!-- Name -->
			<div class="flex items-center gap-2">
				<div class="h-2 w-2 rounded-full bg-orange-500"></div>
				<span class="text-sm font-bold text-main">{data.item.name}</span>
			</div>
			<!-- Address -->
			<span class="pl-4 text-xs text-muted">{data.item.address}</span>
		</div>
		<!-- Tooltip Arrow -->
		<div
			class="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-r border-b border-line bg-panel shadow-sm"
		></div>
	</div>
{/if}
