export interface ToastOptions {
	id: string
	message: string
	type: 'info' | 'success' | 'warning' | 'error'
	duration?: number
}

const createToastStore = () => {
	let toasts = $state<ToastOptions[]>([])

	const remove = (id: string) => {
		toasts = toasts.filter((t) => t.id !== id)
	}

	const add = (message: string, type: ToastOptions['type'] = 'info', duration = 3000) => {
		const id = Math.random().toString(36).substring(2, 9)
		const newToast: ToastOptions = { id, message, type, duration }
		toasts = [...toasts, newToast]

		if (duration > 0) {
			setTimeout(() => remove(id), duration)
		}
	}

	return {
		get items() {
			return toasts
		},
		info: (message: string, duration?: number) => add(message, 'info', duration),
		success: (message: string, duration?: number) => add(message, 'success', duration),
		warning: (message: string, duration?: number) => add(message, 'warning', duration),
		error: (message: string, duration?: number) => add(message, 'error', duration),
		remove,
	}
}

export const toast = createToastStore()
