<script lang="ts">
	import { fade, scale } from 'svelte/transition'
	import { modal } from './modal.svelte'

	let { children, onClose } = $props<{
		children: import('svelte').Snippet
		onClose?: () => void
	}>()

	const handleBackdropClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			if (onClose) onClose()
			else modal.close()
		}
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="modal-wrapper modal-backdrop"
	transition:fade={{ duration: 200 }}
	onclick={handleBackdropClick}
>
	<div class="modal-content-wrapper modal-body" transition:scale={{ duration: 200, start: 0.95 }}>
		{@render children()}
	</div>
</div>

<style>
	.modal-wrapper {
		/* Add any custom styles if needed */
	}
</style>
