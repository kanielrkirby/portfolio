import colorAlgorithms from './colorAlgorithms'
import { deconstructHex, local } from './utils'
import { v4 as uuidv4 } from 'uuid'
import Palette from './palette'

const pal = document.getElementById('palette') as HTMLElement

export type Slot = {
	palette: Palette
	hex: string
	isLocked: boolean
	id: string
	data: number
	index: number
	generate(): void
	sync(): void
}

export default class {
	slots: Slot[] = []

	plus = {
		palette: this,
		disabled: false,
		active: false,
		show(index: number) {
			if (!this.active) {
				const plusDiv = this.render(index.toString())
				let slot = this.palette.slots[index]
				if (!slot) {
					slot = this.palette.slots[index + 1]
					const contextDiv = document.getElementById(slot.id)
					contextDiv?.before(plusDiv)
				} else {
					const contextDiv = document.getElementById(slot.id) as HTMLElement
					contextDiv.after(plusDiv)
				}
				this.active = true
			}
		},
		hide(amount?: number) {
			if (this.active) {
				(((document.getElementById('plus-button') as HTMLElement)?.parentElement as HTMLElement)?.parentElement as HTMLElement)?.remove()
				this.active = false
				if (this.disabled) return
				this.disabled = true
				setTimeout(
					() => {
						this.disabled = false
					},
					typeof amount === 'number' ? amount : 300
				)
			}
		},
		render(data: string) {
			// invisible container
			const div = document.createElement('div')
			div.classList.add('plus-container')
			// circle
			const circle = document.createElement('div')
			circle.classList.add('circle')
			// svg
			const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
			svg.setAttribute('data-color-index', data)
			svg.setAttribute('viewBox', '0 0 100 100')
			svg.id = 'plus-button'
			// use
			const use = document.createElementNS('http://www.w3.org/2000/svg', 'use')
			use.setAttribute('href', '#icon-plus-button')
			use.setAttribute('viewBox', '0 0 100 100')

			svg.append(use)
			circle.append(svg)
			div.append(circle)
			return div
		},
	}

	algorithm = {
		list: colorAlgorithms,
		get(type?: string) {
			if (type === 'slot') this.details = 'slot'
			else this.details = ''
			const index = local.settings.algorithm
			return this.list[index]
		},
		details: '',
		direction: {
			h: 0,
			s: 0,
			l: 0,
		},
		preference: {
			h: <undefined | number>undefined,
			s: <undefined | number>undefined,
			l: <undefined | number>undefined,
		},
	}

	removeSlot(slot: Slot, options: { animations: boolean } = { animations: true }) {
		const startingIndex = slot.data + 1
		for (let i = startingIndex; i < this.slots.length; i++) this.slots[i].data--
		const slotDiv = document.getElementById(slot.id) as HTMLElement
		this.slots.splice(slot.data, 1)
		if (options.animations === true) {
			slotDiv.classList.add('deinit')
			function deInit() {
				slotDiv.remove()
				slotDiv.removeEventListener('animationend', deInit)
				slotDiv.removeEventListener('animationcancel', deInit)
			}
			slotDiv.addEventListener('animationend', deInit)
			slotDiv.addEventListener('animationcancel', deInit)
		} else slotDiv.remove()
		return slot
	}

	addSlot(
		slot: { hex?: string; id?: string; isLocked?: boolean; index?: number | undefined },
		options?: { animations?: boolean }
	) {
		const newSlot = {
			palette: this,
			hex: slot.hex as string,
			isLocked: typeof slot.isLocked === 'boolean' ? slot.isLocked : false,
			id: slot.id || btoa(parseInt(uuidv4(), 16).toString(36)).replaceAll('=', ''),
			index: typeof slot.index !== 'number' ? this.slots.length : slot.index,
			get data() {
				const d = parseInt(document.getElementById(this.id)?.getAttribute('data-color-index') as string)
				if (typeof d === 'number') return d
				this.data = this.index
        return this.index
			},
			set data(d: number) {
				document.getElementById(this.id)?.setAttribute('data-color-index', d.toString())
				this.index = d
			},
			generate() {
				this.hex = this.palette.algorithm.get('slot')(this.palette, this.index) as string
				this.sync()
			},
			sync() {
				const div = document.getElementById(this.id) as HTMLElement
				if (this.hex) {
					const { lum } = deconstructHex(this.hex)
					if (lum < 0.5) {
						div.classList.add('isLight')
					} else {
						div.classList.remove('isLight')
					}
					div.style.backgroundColor = `#${this.hex}`
					div.getElementsByClassName('hex')[0].innerHTML = `#${this.hex}`
				}
			},
		}
		if (!newSlot.hex) newSlot.hex = this.algorithm.get('slot')(this, newSlot.index) as string
		const div = this.createSwatch(newSlot, options)
		const prevDiv = document.getElementById(this.slots[newSlot.index - 1]?.id)
		if (!prevDiv) pal.prepend(div)
		else prevDiv.after(div)
		newSlot.data = newSlot.index
		this.slots.splice(newSlot.index, 0, newSlot)
		for (let i = newSlot.index + 1; i < this.slots.length; i++) this.slots[i].data++
		return newSlot
	}

	createSwatch(slot: Slot, options: { animations?: boolean } = { animations: true }): HTMLElement {
		// Div Element
		const div = document.createElement('div')
		div.classList.add('swatch')
		div.setAttribute('data-color-index', slot.data.toString())
		div.id = slot.id
		if (slot.hex) {
			div.style.backgroundColor = `#${slot.hex}`
			const { lum } = deconstructHex(slot.hex)
			if (lum < 0.5) {
				div.classList.add('isLight')
			} else {
				div.classList.remove('isLight')
			}
		}

		if (options.animations === true) {
			function init() {
				div.classList.remove('init')
				div.removeEventListener('animationend', init)
				div.removeEventListener('animationcancel', init)
			}
			div.classList.add('init')
			div.addEventListener('animationend', init)
			div.addEventListener('animationcancel', init)
		}

		// Center
		const center = document.createElement('div')
		center.classList.add('options')

		// X SVG
		const x = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		x.classList.add('icon', 'x')
		x.setAttribute('viewBox', '0 0 100 100')
		const xUse = document.createElementNS('http://www.w3.org/2000/svg', 'use')
		xUse.setAttribute('href', '#icon-x')

		// Lock SVG
		const lockBody = document.createElementNS('http://www.w3.org/2000/svg', 'use')
		lockBody.setAttribute('viewBox', '0 0 100 100')
		lockBody.setAttribute('href', '#icon-lock-body')
		const lockArm = document.createElementNS('http://www.w3.org/2000/svg', 'use')
		lockArm.setAttribute('viewBox', '0 0 100 100')
		lockArm.setAttribute('href', '#icon-lock-arm')
		const lock = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		lock.setAttribute('viewBox', '0 0 100 100')
		lock.classList.add('icon', 'lock')
		if (slot.isLocked) lock.classList.add('locked')

		// Info
		let infoContainer = document.createElement('div')
		infoContainer.classList.add('info-container')
		let info = document.createElement('div')
		info.classList.add('info')
		let hex = document.createElement('h2')
		hex.classList.add('hex')
		hex.innerHTML = '#' + slot.hex
		let copy = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		copy.classList.add('icon')
		copy.setAttribute('viewBox', '0 0 100 100')
		let copyUse = document.createElementNS('http://www.w3.org/2000/svg', 'use')
		copyUse.setAttribute('href', '#icon-copy')

		// Plus Detectors
		let leftDetect = document.createElement('div')
		leftDetect.classList.add('detector', 'left')
		let rightDetect = document.createElement('div')
		rightDetect.classList.add('detector')

		x.append(xUse)
		lock.append(lockArm, lockBody)
		copy.append(copyUse)
		info.append(hex, copy)
		infoContainer.append(info)
		center.append(x, lock, infoContainer)
		div.append(center, leftDetect, rightDetect)

		return div
	}

	generate(hexes?: string[]) {
		let options = { animations: false }
		if (hexes) {
			if (hexes.length == this.slots.length) {
				for (let i = 0; i < hexes.length; i++) {
					this.slots[i].hex = hexes[i]
					this.slots[i].sync()
				}
			} else {
				for (let slot of this.slots) document.getElementById(slot.id)!.remove()
				this.slots = []
				for (let i = 0; i < hexes.length; i++) this.addSlot({ index: i, hex: hexes[i] }, options)
			}
		} else if (this.slots.length > 0) {
			this.algorithm.get()(this)
		} else {
			for (let i = 0; i < 5; i++) this.addSlot({}, options)
			this.algorithm.get()(this)
		}
		return this.slots
	}
}
