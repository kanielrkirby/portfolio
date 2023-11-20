export default class {
	constructor(views: [string, (ids?: string[]) => void][]) {
		this.routes = new Map(views)
	}

	routes: Map<string, (ids?: string[]) => void>

	loadContent = (url?: { base: string; ids?: string[], site: string }) => {
		if (url) {
			let { base, ids } = url
			if (typeof base !== 'string') base = ''
			const route = this.routes.get(base) as (ids?: string[]) => void
			if (ids) route(ids)
			else route()
		} else (this.routes.get('404') as (ids?: string[]) => void)()
	}

	routeToURL = (url: string) => {
		const deconURL = this.deconstructURL(url)
		const { base, ids } = deconURL
		if (this.routes.has(base)) {
			if (base === 'create') {
				if (ids) {
					if (this.idsAreValid(ids)) this.loadContent(deconURL)
					else this.loadContent()
				} else this.loadContent(deconURL)
			} else this.loadContent(deconURL)
		} else this.loadContent()
	}

	navigateTo = (url: string, replace = false) => {
		if (replace) history.replaceState('', '', url)
		else history.pushState('', '', `/polychrome${url}`)
		this.routeToURL(url)
	}

	deconstructURL(url: string) {
		const array = url.replace(/^\//, '').replace(/\/$/, '').split('/')
		if (array[0] === 'polychrome')
			return {
				site: 'polychrome',
				base: array[1] || '',
				ids: array[2] ? array[2].split('-') : undefined,
			}
		return {
			site: 'polychrome',
			base: array[0],
			ids: array[1] ? array[1].split('-') : undefined,
		}
	}

	idsAreValid(ids: string[]) {
		for (const id of ids) if (!/^[a-f0-9]{6}$/.test(id) || ids.length > 10) return false
		return true
	}
}
