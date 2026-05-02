<script lang="ts">
	import { modal } from '$lib/ui'

	const { items } = $derived(modal)
</script>

<div class="modal-container">
	{#each items as item (item)}
		<item.component {...item.options.props} />
	{/each}
</div>
