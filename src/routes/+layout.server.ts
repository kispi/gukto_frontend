import type { LayoutServerLoad } from './$types'
import type { Theme } from '$lib/theme/theme.svelte'

export const load: LayoutServerLoad = ({ cookies }) => {
	const theme = (cookies.get('theme') as Theme) || 'light'

	return {
		theme,
	}
}
