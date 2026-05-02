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
			document.cookie = `theme=${newTheme}; max-age=31536000; path=/`
			apply(newTheme)
		}
	}

	return {
		get current() {
			return currentTheme
		},
		set,
		init: (initial: Theme) => {
			const initTheme = initial || 'light'
			currentTheme = initTheme
			apply(initTheme)
		},
		toggle: () => {
			const next: Theme = currentTheme === 'light' ? 'dark' : 'light'
			set(next)
		},
	}
}

export const theme = createThemeStore()
