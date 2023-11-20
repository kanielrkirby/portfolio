import { local, deconstructHex } from './utils'

const wrapper = document.querySelector('.saved-palettes-wrapper') as HTMLElement

export default class SavedPalettes {
	constructor() {
		this.items = local.savedPalettes.items
	}
	items: string[][] = []
	draw(palettes?: string[][]) {
		while (wrapper.childElementCount > 0) wrapper.lastChild?.remove()
		if (palettes) {
			for (let i = 0; i < palettes.length; i++) {
				const palette = palettes[i]
				const container = document.createElement('div')
				container.setAttribute('data-palette-index', i.toString())
				container.classList.add('palette-container')
				const pal = document.createElement('div')
				pal.classList.add('palette')
				const options = document.createElement('div')
				options.classList.add('options')
				const more = document.createElement('div')
				more.classList.add('more')
				const moreSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
				moreSvg.setAttribute('viewBox', '0 0 100 100')
				const moreUse = document.createElementNS('http://www.w3.org/2000/svg', 'use')
				moreUse.setAttribute('href', '#icon-more-horizontal')
				for (let j = 0; j < palette.length; j++) {
					const hex = palette[j]
					const { lum } = deconstructHex(hex)
					const swatch = document.createElement('div')
					swatch.setAttribute('data-color-index', j.toString())
					swatch.classList.add('swatch')
					swatch.style.backgroundColor = `#${hex}`
					if (lum < 0.5) swatch.classList.add('isLight')
					const text = document.createElement('h2')
					text.innerHTML = `#${hex}`
					text.classList.add('text')

					swatch.append(text)
					pal.append(swatch)
				}
				moreSvg.append(moreUse)
				more.append(moreSvg)
				options.append(more)
				container.append(pal, options)
				wrapper.append(container)
			}
		}
		const emptyState = document.querySelector('.palettes-page .when-empty') as HTMLElement
		if (wrapper.childElementCount === 0) emptyState.classList.remove('hidden')
		else emptyState.classList.add('hidden')
	}
	addItem(palette: string[], index?: number) {
		if (typeof index === 'number') this.items.splice(index, 0, palette)
		else this.items.push(palette)
		local.savedPalettes.items = this.items
		this.draw(this.items)
	}
	removeItem(index: number) {
		this.items.splice(index, 1)
		local.savedPalettes.items = this.items
		this.draw(this.items)
	}
}
