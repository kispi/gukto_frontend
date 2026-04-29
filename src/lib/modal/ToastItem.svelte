<script lang="ts">
	import { fly } from 'svelte/transition'
	import { type ToastOptions } from './toast.svelte'
	import { Info, CircleCheck, TriangleAlert, CircleX, X } from 'lucide-svelte'
	import { toast } from './toast.svelte'

	let { item } = $props<{ item: ToastOptions }>()

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const icons: Record<ToastOptions['type'], any> = {
		info: Info,
		success: CircleCheck,
		warning: TriangleAlert,
		error: CircleX,
	}

	const Icon = $derived(icons[item.type as ToastOptions['type']])

	const colorClasses: Record<ToastOptions['type'], string> = {
		info: 'toast-info',
		success: 'toast-success',
		warning: 'toast-warning',
		error: 'toast-error',
	}
</script>

<div
	class="toast-item toast-item-base pointer-events-auto {colorClasses[
		item.type as ToastOptions['type']
	]}"
	transition:fly={{ y: 20, duration: 300 }}
>
	<Icon size={20} class="flex-shrink-0" />
	<span class="flex-1 text-sm font-medium text-sub">{item.message}</span>
	<button
		type="button"
		class="-mr-1 p-1 text-muted transition-colors hover:text-gray-600"
		onclick={() => toast.remove(item.id)}
	>
		<X size={16} />
	</button>
</div>
