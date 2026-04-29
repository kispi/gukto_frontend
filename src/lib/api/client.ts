import { env } from '$env/dynamic/public'

export const apiClient = {
	get: async <T>(path: string, params: Record<string, unknown> = {}): Promise<T> => {
		const baseUrl = env.PUBLIC_BASE_URL || 'http://localhost:3001'
		const url = new URL(`${baseUrl}${path}`)

		Object.entries(params).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				url.searchParams.append(key, String(value))
			}
		})

		const response = await fetch(url.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}))
			throw new Error(errorData.error || 'API Request Failed')
		}

		return response.json()
	},
}
