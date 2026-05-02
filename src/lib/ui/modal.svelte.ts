import type { Component } from 'svelte'
import ModalBasic from '$lib/components/modals/ModalBasic.svelte'

export type ModalButton = {
	text: string
	class?: string
	value?: unknown
}

export type ModalOptions = {
	props?: Record<string, unknown>
	resolve?: (value: unknown) => void
}

const createModalStore = () => {
	let modals = $state<{ component: Component<Record<string, unknown>>; options: ModalOptions }[]>(
		[],
	)

	const custom = <T = unknown>(
		component: Component<Record<string, unknown>>,
		options: ModalOptions = {},
	): Promise<T> => {
		return new Promise((resolve) => {
			modals = [
				...modals,
				{ component, options: { ...options, resolve: resolve as (value: unknown) => void } },
			]
		})
	}

	return {
		get items() {
			return modals
		},

		custom,

		alert: (message: string, title = '알림'): Promise<void> => {
			return custom(ModalBasic, {
				props: {
					title,
					message,
					buttons: [{ text: '확인', value: true, class: 'btn-primary' }],
				},
			})
		},

		confirm: (message: string, title = '확인'): Promise<boolean> => {
			return custom(ModalBasic, {
				props: {
					title,
					message,
					buttons: [
						{ text: '취소', value: false, class: 'btn-default' },
						{ text: '확인', value: true, class: 'btn-primary' },
					],
				},
			})
		},

		close: (value?: unknown) => {
			if (modals.length === 0) return
			const lastModal = modals[modals.length - 1]
			if (lastModal.options.resolve) {
				lastModal.options.resolve(value)
			}
			modals = modals.slice(0, -1)
		},
	}
}

export const modal = createModalStore()
