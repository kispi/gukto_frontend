<script lang="ts">
	import { toast } from '$lib/ui'
	import ToastItem from './ToastItem.svelte'

	const { items } = $derived(toast)
</script>

<div
	class="toast-container pointer-events-none fixed bottom-6 left-1/2 z-60 flex -translate-x-1/2 flex-col gap-2"
>
	{#each items as item (item.id)}
		<ToastItem {item} />
	{/each}
</div>
