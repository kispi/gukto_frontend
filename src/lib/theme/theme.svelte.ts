import Cookies from 'js-cookie'
import { browser } from '$app/environment'

export type Theme = 'light' | 'dark'

const createThemeStore = () => {
	let currentTheme = $state<Theme>('light')

	const apply = (theme: Theme) => {
		if (!browser) return
		const isDark = theme === 'dark'
		document.documentElement.classList.toggle('dark', isDark)
	}

	const set = (newTheme: Theme) => {
		currentTheme = newTheme
		if (browser) {
			Cookies.set('theme', newTheme, { expires: 365, path: '/' })
			apply(newTheme)
		}
	}

	return {
		get current() {
			return currentTheme
		},
		set,
		init: (initial: Theme) => {
			currentTheme = initial || 'light'
			apply(currentTheme)
		},
		toggle: () => {
			const next: Theme = currentTheme === 'light' ? 'dark' : 'light'
			set(next)
		},
	}
}

export const theme = createThemeStore()
