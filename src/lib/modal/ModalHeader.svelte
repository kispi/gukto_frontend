<script lang="ts">
	import { X } from 'lucide-svelte'
	import { modal } from './modal.svelte'

	let { title, onClose } = $props<{
		title: string
		onClose?: () => void
	}>()

	const handleClose = () => {
		if (onClose) onClose()
		else modal.close()
	}
</script>

<div class="modal-header modal-header-container">
	<h3 class="text-lg leading-tight font-bold text-main">
		{title}
	</h3>
	<button
		type="button"
		class="-mr-2 rounded-full p-2 text-muted transition-colors hover:bg-gray-50 hover:text-gray-600"
		onclick={handleClose}
	>
		<X size={20} />
	</button>
</div>
