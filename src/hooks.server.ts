import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const theme = event.cookies.get('theme') || 'light'

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			const isDark = theme === 'dark'
			return html.replace('%theme_class%', isDark ? 'dark' : '')
		},
	})

	return response
}
