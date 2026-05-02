<script lang="ts">
	import { modal, type ModalButton } from '$lib/ui/modal.svelte'
	import ModalWrapper from '$lib/components/app/modal/ModalWrapper.svelte'
	import ModalHeader from '$lib/components/app/modal/ModalHeader.svelte'

	let {
		title = '',
		message = '',
		buttons = [],
	} = $props<{
		title?: string
		message?: string
		buttons?: ModalButton[]
	}>()

	const handleClick = (value: unknown) => {
		modal.close(value)
	}
</script>

<ModalWrapper onClose={() => modal.close()}>
	<div class="modal-basic flex flex-col">
		<ModalHeader {title} />

		<!-- Body -->
		<div class="p-4">
			<p class="leading-relaxed whitespace-pre-wrap text-sub">
				{message}
			</p>
		</div>

		<!-- Footer -->
		{#if buttons.length > 0}
			<div class="modal-footer modal-footer-container">
				{#each buttons as btn (btn.text)}
					<button
						type="button"
						class="rounded-lg px-5 py-2.5 text-sm font-semibold transition-all active:scale-95 {btn.class}"
						onclick={() => handleClick(btn.value)}
					>
						{btn.text}
					</button>
				{/each}
			</div>
		{/if}
	</div>
</ModalWrapper>
