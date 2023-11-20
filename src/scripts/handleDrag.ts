import { palette, router } from './main'
import { session } from './utils'

export default function handleDrag() {
	window.addEventListener('scroll', stopMotion, false)
	window.addEventListener('touchmove', stopMotion, { passive: false })
	function stopMotion(e: Event) {
		if (router.deconstructURL(location.pathname).base === 'create') {
			e.preventDefault()
			e.stopPropagation()
		}
	}
	window.ontouchstart = (e: TouchEvent) => {
		//* If you click a swatch, add event listeners
		let swatch = (e.targetTouches[0].target as HTMLElement).closest('.create-page .swatch') as HTMLElement
		if (
			swatch &&
			!(e.targetTouches[0].target as HTMLElement).closest('.options div') &&
			!(e.targetTouches[0].target as HTMLElement).closest('.options svg')
		) {
			for (const { id } of palette.slots) if ((document.getElementById(id) as HTMLElement).classList.contains('is-dragging')) return
			let vertical = false
			if (document.body.classList.contains('vertical')) vertical = true
			palette.plus.disabled = true
			palette.plus.hide()
			swatch.classList.add('is-dragging')
			const startPos = vertical ? e.touches[0].clientY : e.touches[0].clientX
      let index = parseInt(swatch.getAttribute('data-color-index') as string)
      const slot = palette.slots[index]
      let prevAmount = 0
      let amount = 0
      const swatchSize = vertical ? swatch.clientHeight : swatch.clientWidth
      const translateNext = vertical ? `0 ${swatchSize}px` : `${swatchSize}px`
      const translatePrev = vertical ? `0 ${-swatchSize}px` : `${-swatchSize}px`
      const lowerLimit = -index * swatchSize
      const upperLimit = (palette.slots.length - index - 1) * swatchSize
		  const pos = vertical
					? (e: TouchEvent) => e.touches[0].clientY - startPos
					: (e: TouchEvent) => e.touches[0].clientX - startPos

			//* Mouse tracking
			window.addEventListener('touchmove', dragHandler, { passive: false })
			//* When you release the click button, remove event listeners and finalize
			window.addEventListener(
				'touchend',
				() => {
					swatch.classList.remove('is-dragging')
					swatch.classList.add('is-released')
					removeEventListener('touchmove', dragHandler)
					swatch.style.translate = `${vertical ? '0 ' : ''}${amount * 100}%`
					function setPalette() {
						swatch.removeEventListener('transitionend', setPalette)
						swatch.removeEventListener('transitioncancel', setPalette)
						swatch.classList.remove('is-released')
						let next = swatch
						for (let i = 0; i < amount; i++) {
							palette.slots.splice(slot.data, 1)
							palette.slots.splice(slot.data + 1, 0, slot)
							slot.data++
							next = next.nextElementSibling as HTMLElement
							palette.slots[slot.data - 1].data--
						}
						for (let i = 0; i > amount; i--) {
							palette.slots.splice(slot.data, 1)
							palette.slots.splice(slot.data - 1, 0, slot)
							slot.data--
							next = next.previousElementSibling as HTMLElement
							palette.slots[slot.data + 1].data++
						}

						let copy = swatch.cloneNode(true)

						if (amount > 0) {
							next.after(copy)
							swatch.remove()
						} else if (amount < 0) {
							next.before(copy)
							swatch.remove()
						}
						swatch.style.translate = ''
						const arr = []
						for (const slot of palette.slots) {
							const swatch = document.getElementById(slot.id) as HTMLElement
							swatch.style.transition = 'transform 0s'
							swatch.style.translate = ''
							setTimeout(() => {
								swatch.style.transition = ''
							}, 1)
							arr.push(slot.hex)
						}
						swatch = copy as HTMLElement
						history.replaceState('', '', arr.join('-'))
						palette.plus.disabled = false
						if (amount)
							session.create.push({
								undo() {
									palette.plus.hide()
									let next = document.getElementById(slot.id) as HTMLElement
                  swatch = next
									for (let i = 0; i < -amount; i++) {
										palette.slots.splice(slot.data, 1)
										palette.slots.splice(slot.data + 1, 0, slot)
										slot.data++
										next = next.nextElementSibling as HTMLElement
										const index = parseInt(next.getAttribute('data-color-index') as string)
										next.setAttribute('data-color-index', (index - 1).toString())
									}
									for (let i = 0; i > -amount; i--) {
										palette.slots.splice(slot.data, 1)
										palette.slots.splice(slot.data - 1, 0, slot)
										slot.data--
										next = next.previousElementSibling as HTMLElement
										const index = parseInt(next.getAttribute('data-color-index') as string)
										next.setAttribute('data-color-index', (index + 1).toString())
									}
									copy = swatch.cloneNode(true)
									if (-amount > 0) {
										next.after(copy)
										swatch.remove()
									} else if (-amount < 0) {
										next.before(copy)
										swatch.remove()
									}
									const arr = []
									for (const slot of palette.slots) arr.push(slot.hex)
									history.replaceState('', '', arr.join('-'))
								},
								redo() {
									palette.plus.hide()
									let next = document.getElementById(slot.id) as HTMLElement
                  swatch = next
									for (let i = 0; i < amount; i++) {
										palette.slots.splice(slot.data, 1)
										palette.slots.splice(slot.data + 1, 0, slot)
										slot.data++
										next = next.nextElementSibling as HTMLElement
										index = parseInt(next.getAttribute('data-color-index') as string)
										next.setAttribute('data-color-index', (index - 1).toString())
									}
									for (let i = 0; i > amount; i--) {
										palette.slots.splice(slot.data, 1)
										palette.slots.splice(slot.data - 1, 0, slot)
										slot.data--
										next = next.previousElementSibling as HTMLElement
										index = parseInt(next.getAttribute('data-color-index') as string)
										next.setAttribute('data-color-index', (index + 1).toString())
									}
									copy = swatch.cloneNode(true)
									if (amount > 0) {
										next.after(copy)
										swatch.remove()
									} else if (amount < 0) {
										next.before(copy)
										swatch.remove()
									}
									const arr = []
									for (const slot of palette.slots) arr.push(slot.hex)
									history.replaceState('', '', arr.join('-'))
								},
							})
					}
					swatch.addEventListener('transitionend', setPalette)
					swatch.addEventListener('transitioncancel', setPalette)
				},
				{ once: true }
			)
			function dragHandler(e: TouchEvent) {
				e.preventDefault()
				let t = pos(e)
				if (t < lowerLimit) t = lowerLimit
				else if (t > upperLimit) t = upperLimit
        swatch.style.translate = vertical ? `0 ${t}px` : `${t}px`
				amount = Math.round(t / swatchSize)
				if (amount !== prevAmount) {
					for (const slot of palette.slots) {
						const swatch2 = document.getElementById(slot.id) as HTMLElement
						if (swatch !== swatch2) {
							if (slot.index < index && index + amount <= slot.index) swatch2.style.translate = translateNext
							else if (slot.index > index && index + amount >= slot.index) swatch2.style.translate = translatePrev
							else swatch2.style.translate = '0 0'
						}
					}
					prevAmount = amount
				}
			}
		}
	}
	onmousedown = (e) => {
		//* If you click a swatch, add event listeners
		let swatch = (e.target as HTMLElement).closest('.create-page .swatch') as HTMLElement
		if (
			swatch &&
			!(e.target as HTMLElement).closest('.options div') &&
			!(e.target as HTMLElement).closest('.options svg')
		) {
			for (const { id } of palette.slots) if ((document.getElementById(id) as HTMLElement).classList.contains('is-dragging')) return
			let vertical = false
			if (document.body.classList.contains('vertical')) vertical = true
			palette.plus.disabled = true
			palette.plus.hide()
			swatch.classList.add('is-dragging')
			const startPos = vertical ? e.y : e.x
      let index = parseInt(swatch.getAttribute('data-color-index') as string)
      const slot = palette.slots[index]
      let prevAmount = 0
      let amount = 0
      const swatchSize = vertical ? swatch.clientHeight : swatch.clientWidth
      const translateNext = vertical ? `0 ${swatchSize}px` : `${swatchSize}px`
      const translatePrev = vertical ? `0 ${-swatchSize}px` : `${-swatchSize}px`
      const lowerLimit = -index * swatchSize
      const upperLimit = (palette.slots.length - index - 1) * swatchSize
      const pos = vertical ? (e: MouseEvent) => e.y - startPos : (e: MouseEvent) => e.x - startPos

			//* Mouse tracking
			addEventListener('mousemove', dragHandler)
			//* When you release the click button, remove event listeners and finalize
			addEventListener(
				'mouseup',
				() => {
					swatch.classList.remove('is-dragging')
					swatch.classList.add('is-released')
					removeEventListener('mousemove', dragHandler)
					swatch.style.translate = `${vertical ? '0 ' : ''}${amount * 100}%`
					function setPalette() {
						swatch.removeEventListener('transitionend', setPalette)
						swatch.removeEventListener('transitioncancel', setPalette)
						swatch.classList.remove('is-released')
						let next = swatch
						for (let i = 0; i < amount; i++) {
							palette.slots.splice(slot.data, 1)
							palette.slots.splice(slot.data + 1, 0, slot)
							slot.data++
							next = next.nextElementSibling as HTMLElement
							palette.slots[slot.data - 1].data--
						}
						for (let i = 0; i > amount; i--) {
							palette.slots.splice(slot.data, 1)
							palette.slots.splice(slot.data - 1, 0, slot)
							slot.data--
							next = next.previousElementSibling as HTMLElement
							palette.slots[slot.data + 1].data++
						}

						let copy = swatch.cloneNode(true)

						if (amount > 0) {
							next.after(copy)
							swatch.remove()
						} else if (amount < 0) {
							next.before(copy)
							swatch.remove()
						}
						swatch.style.translate = ''
						const arr = []
						for (const slot of palette.slots) {
							const swatch = document.getElementById(slot.id) as HTMLElement
							swatch.style.transition = 'transform 0s'
							swatch.style.translate = ''
							setTimeout(() => {
								swatch.style.transition = ''
							}, 1)
							arr.push(slot.hex)
						}
						swatch = copy as HTMLElement
						history.replaceState('', '', arr.join('-'))
						palette.plus.disabled = false
						if (amount)
							session.create.push({
								undo() {
									palette.plus.hide()
									let next = document.getElementById(slot.id) as HTMLElement
                  swatch = next
									for (let i = 0; i < -amount; i++) {
										palette.slots.splice(slot.data, 1)
										palette.slots.splice(slot.data + 1, 0, slot)
										slot.data++
										next = next.nextElementSibling as HTMLElement
										const index = parseInt(next.getAttribute('data-color-index') as string)
										next.setAttribute('data-color-index', (index - 1).toString())
									}
									for (let i = 0; i > -amount; i--) {
										palette.slots.splice(slot.data, 1)
										palette.slots.splice(slot.data - 1, 0, slot)
										slot.data--
										next = next.previousElementSibling as HTMLElement
										const index = parseInt(next.getAttribute('data-color-index') as string)
										next.setAttribute('data-color-index', (index + 1).toString())
									}
									copy = swatch.cloneNode(true)
									if (-amount > 0) {
										next.after(copy)
										swatch.remove()
									} else if (-amount < 0) {
										next.before(copy)
										swatch.remove()
									}
									const arr = []
									for (const slot of palette.slots) arr.push(slot.hex)
									history.replaceState('', '', arr.join('-'))
								},
								redo() {
									palette.plus.hide()
									let next = document.getElementById(slot.id) as HTMLElement
                  swatch = next
									for (let i = 0; i < amount; i++) {
										palette.slots.splice(slot.data, 1)
										palette.slots.splice(slot.data + 1, 0, slot)
										slot.data++
										next = next.nextElementSibling as HTMLElement
										index = parseInt(next.getAttribute('data-color-index') as string)
										next.setAttribute('data-color-index', (index - 1).toString())
									}
									for (let i = 0; i > amount; i--) {
										palette.slots.splice(slot.data, 1)
										palette.slots.splice(slot.data - 1, 0, slot)
										slot.data--
										next = next.previousElementSibling as HTMLElement
										index = parseInt(next.getAttribute('data-color-index') as string)
										next.setAttribute('data-color-index', (index + 1).toString())
									}
									copy = swatch.cloneNode(true)
									if (amount > 0) {
										next.after(copy)
										swatch.remove()
									} else if (amount < 0) {
										next.before(copy)
										swatch.remove()
									}
									const arr = []
									for (const slot of palette.slots) arr.push(slot.hex)
									history.replaceState('', '', arr.join('-'))
								},
							})
					}
					swatch.addEventListener('transitionend', setPalette)
					swatch.addEventListener('transitioncancel', setPalette)
				},
				{ once: true }
			)
			function dragHandler(e: MouseEvent) {
				e.preventDefault()
				let t = pos(e)
				if (t < lowerLimit) t = lowerLimit
				else if (t > upperLimit) t = upperLimit
        swatch.style.translate = vertical ? `0 ${t}px` : `${t}px`

				amount = Math.round(t / swatchSize)
				if (amount !== prevAmount) {
					for (const slot of palette.slots) {
						const swatch2 = document.getElementById(slot.id) as HTMLElement
						if (swatch !== swatch2) {
							if (slot.index < index && index + amount <= slot.index) swatch2.style.translate = translateNext
							else if (slot.index > index && index + amount >= slot.index) swatch2.style.translate = translatePrev
							else swatch2.style.translate = '0 0'
						}
					}
					prevAmount = amount
				}
			}
		}
		ondragstart = () => false
	}
}
