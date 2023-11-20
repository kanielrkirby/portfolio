import Palette from './palette'
import { deconstructHex, random } from './utils'

function hslToHex(H: number, S: number, L: number) {
  // Must be fractions of 1
  let h = H
  let s = S
  let l = L
	if (H > 360) h = H - 360
	else if (H < 0) h = H + 360
	if (S > 1) s = 1
	else if (S < 0) s = 0
	if (L > 1) l = 1
	else if (L < 0) l = 0
	s = S * 100

	const a = (s * Math.min(l, 1 - l)) / 100
	const f: (n: number) => string = (n) => {
		const k = (n + h / 30) % 12
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0')
	}
	return `${f(0)}${f(8)}${f(4)}`
}

function randomize(palette: Palette) {
	if (palette.algorithm.details === 'slot') {
		const hex = []
		for (let i = 0; i < 6; i++) hex.push(Math.round(random(0, 15)).toString(16))
		return hex.join('')
	} else {
		for (const slot of palette.slots) {
			if (!slot.isLocked) {
				const hex = []
				for (let i = 0; i < 6; i++) hex.push(Math.round(random(0, 15)).toString(16))
				slot.hex = hex.join('')
				slot.sync()
			}
		}
	}
	return
}

function monochromatic(palette: Palette, index: number = 0) {
	if (palette.algorithm.details === 'slot') {
		if (Math.random() > 0.5) {
			// Increment
			let h = 0
      let s = 0
      let l = 0
      const prevPrevHSL = palette.slots[index - 2]
      const prevHSL = palette.slots[index - 1]
      const nextHSL = palette.slots[index]
      const nextNextHSL = palette.slots[index + 1]
			if (nextHSL) {
				const { h: nextH, s: nextS, l: nextL } = deconstructHex(nextHSL.hex)
				h = nextH
				if (prevHSL) {
					const { s: prevS, l: prevL } = deconstructHex(prevHSL.hex)
					s = nextS - (nextS - prevS) / 2
					l = nextL - (nextL - prevL) / 2
				} else if (nextNextHSL) {
					const { s: nextNextS, l: nextNextL } = deconstructHex(nextNextHSL.hex)
					s = nextS - (nextNextS - nextS) / 2
					l = nextL - (nextNextL - nextL) / 2
				} else {
					s = nextS * random(0.7, 1.3)
					l = nextL * random(0.7, 1.3)
				}
			} else if (prevHSL) {
				const { h: prevH, s: prevS, l: prevL } = deconstructHex(prevHSL.hex)
				h = prevH
				if (prevPrevHSL) {
					const { s: prevPrevS, l: prevPrevL } = deconstructHex(prevPrevHSL.hex)
					s = prevS + (prevS - prevPrevS) / 2
					l = prevL + (prevL - prevPrevL) / 2
				} else {
					s = prevS * random(0.7, 1.3)
					l = prevL * random(0.7, 1.3)
				}
			} else {
				s = random(0.2, 1)
				l = random(0.1, 0.9)
			}
			s *= random(0.95, 1.05)
			l *= random(0.95, 1.05)
			return hslToHex(h, s, l)
		} else {
			// Random
			let mainH!: number
      let minS!: number
      let maxS!: number
      let minL!: number
      let maxL!: number
			for (const { hex } of palette.slots) {
				const { h, s, l } = deconstructHex(hex)
				if (typeof mainH ==='number') mainH = h
				if (typeof maxS ==='number' || s > maxS) maxS = s
				if (typeof minS ==='number' || s < minS) minS = s
				if (typeof maxL ==='number' || l > maxL) maxL = l
				if (typeof minL ==='number' || l < minL) minL = l
			}
			const s = random(minS, maxS) * random(0.95, 1.05)
			const l = random(minL, maxL) * random(0.95, 1.05)
			return hslToHex(mainH, s, l)
		}
	} else {
		if (palette.algorithm.details === 'increment' || Math.random() > 0.5) {
			const slotArr = []
			const h = random(0, 360)
      let s = 0
      let l = 0
      let startS = 0
      let startL = 0
      let endS = 0
      let endL = 0
      let dS = 0
      let dL = 0
			for (const slot of palette.slots) if (!slot.isLocked) slotArr.push(slot)
			for (let i = 0; i < slotArr.length; i++) {
				if (i === 0) {
					const slot = palette.slots[0]
					s = random(0.1, 1)
					l = random(0.1, 0.9)
					slot.hex = hslToHex(h, s, l)
					slot.sync()

					startS = s
					startL = l

					if (startS < 0.4) endS = random(0.7, 1)
					else if (startS > 0.6) endS = random(0.1, 0.3)
					else if (startS > 0.5) endS = random(0.1, 0.2)
					else endS = random(0.8, 0.9)

					if (startL < 0.4) endL = random(0.7, 1)
					else if (startL > 0.6) endL = random(0.1, 0.3)
					else if (startL > 0.5) endL = random(0.1, 0.2)
					else endL = random(0.8, 0.9)

					dS = (endS - startS) / palette.slots.length
					dL = (endL - startL) / palette.slots.length
				} else {
					const slot = palette.slots[i]
					s = startS + dS * i
					l = startL + dL * i
					slot.hex = hslToHex(h, s, l)
					slot.sync()
				}
			}
		} else {
			let h = random(0, 360)
      let s
      let l
      let mainH
			for (const slot of palette.slots)
				if (!slot.isLocked) {
					s = random(0.2, 1)
					l = random(0.2, 0.8)
					if (typeof mainH ==='number') h = mainH = random(0, 360)
					slot.hex = hslToHex(h, s, l)
					slot.sync()
				}
		}
	}
	return
}

function analogous(palette: Palette, index: number = 0) {
	if (palette.algorithm.details==='slot') {
		if (Math.random() > 0.5) {
			let h = 0
      let s = 0
      let l = 0
      const prevPrevHSL = palette.slots[index - 2]
      const prevHSL = palette.slots[index - 1]
      const nextHSL = palette.slots[index]
      const nextNextHSL = palette.slots[index + 1]
			if (nextHSL) {
				const { h: nextH, s: nextS, l: nextL } = deconstructHex(nextHSL.hex)
				if (prevHSL) {
					const { h: prevH, s: prevS, l: prevL } = deconstructHex(prevHSL.hex)
					let difH = nextH - prevH
					if (difH > 180) {
						difH = nextH - prevH - 360
					} else if (difH < -180) {
						difH = nextH - prevH + 360
					}
					h = nextH - difH / 2
					s = nextS - (nextS - prevS) / 2
					l = nextL - (nextL - prevL) / 2
				} else if (nextNextHSL) {
					const { h: nextNextH, s: nextNextS, l: nextNextL } = deconstructHex(nextNextHSL.hex)
					let difH = nextNextH - nextH
					if (difH > 180) {
						difH = nextNextH - nextH - 360
					} else if (difH < -180) {
						difH = nextNextH - nextH + 360
					}
					h = nextH - difH / 2
					s = nextS - (nextNextS - nextS) / 2
					l = nextL - (nextNextL - nextL) / 2
				} else {
					h = nextH * random(0.7, 1.3)
					s = nextS * random(0.7, 1.3)
					l = nextL * random(0.7, 1.3)
				}
			} else if (prevHSL) {
				const { h: prevH, s: prevS, l: prevL } = deconstructHex(prevHSL.hex)
				if (prevPrevHSL) {
					const { h: prevPrevH, s: prevPrevS, l: prevPrevL } = deconstructHex(prevPrevHSL.hex)
					let difH = prevH - prevPrevH
					if (difH > 180) {
						difH = prevH - prevPrevH - 360
					} else if (difH < -180) {
						difH = prevH - prevPrevH + 360
					}
					h = prevH + difH / 2
					s = prevS + (prevS - prevPrevS) / 2
					l = prevL + (prevL - prevPrevL) / 2
				} else {
					h = prevH * random(0.7, 1.3)
					s = prevS * random(0.7, 1.3)
					l = prevL * random(0.7, 1.3)
				}
			} else {
				h = random(0, 360)
				s = random(0.2, 1)
				l = random(0.1, 0.9)
			}
			h *= random(0.95, 1.05)
			s *= random(0.95, 1.05)
			l *= random(0.95, 1.05)
			return hslToHex(h, s, l)
		} else {
			let mainH!: number
      let secondaryH!: number
      let tertiaryH!: number
      let minS!: number
      let maxS!: number
      let minL!: number
      let maxL!: number
      let h!: number
      const n = Math.random()
			for (const { hex } of palette.slots) {
				const { h, s, l } = deconstructHex(hex)
				if (typeof mainH!=='number') mainH = h
				else if (typeof secondaryH!=='number') {
					let tMain = mainH
					let	d = tMain - h
					if (d > 180) tMain -= 360
					else if (d < -180) tMain += 360
					d = tMain - h
					if (d < -25 || d > 25) secondaryH = h
				} else if (typeof tertiaryH!=='number') {
					let tMain = mainH
          let tSecondary = secondaryH
          let d = tMain - h
          let d2 = tSecondary - h
					if (d > 180) tMain -= 360
					else if (d < -180) tMain += 360
					if (d2 > 180) tSecondary -= 360
					else if (d2 < -180) tSecondary += 360
					d = tMain - h
					d2 = tSecondary - h
					if ((d > 25 || d < -25) && (d2 > 25 || d2 < -25)) tertiaryH = h
				}
				if (typeof maxS!=='number' || s > maxS) maxS = s
				if (typeof minS!=='number' || s < minS) minS = s
				if (typeof maxL!=='number' || l > maxL) maxL = l
				if (typeof minL!=='number' || l < minL) minL = l
			}
			if (tertiaryH && n < 0.333) h = tertiaryH
			else if (secondaryH && n > 0.666) h = secondaryH
			else h = mainH
			const s = random(minS, maxS) * random(0.95, 1.05)
			const l = random(minL, maxL) * random(0.95, 1.05)
			return hslToHex(h, s, l)
		}
	} else if (palette.algorithm.details==='increment' || Math.random() > 0.5) {
		let h = 0
    let s = 0
    let l = 0
    let startH = 0
    let startS = 0
    let startL = 0
    let endH = 0
    let endS = 0
    let endL = 0
    let dH = 0
    let dS = 0
    let dL = 0
		for (let i = 0; i < palette.slots.length; i++) {
			const slot = palette.slots[i]
			if (!slot.isLocked) {
				if (!startH) {
					h = startH = random(0, 360)
					s = startS = random(0.1, 1)
					l = startL = random(0.1, 0.9)
					slot.hex = hslToHex(h, s, l)
					slot.sync()

					startH = h
					startS = s
					startL = l
					if (Math.random() > 0.5) endH = h + random(90, 120)
					else endH = h - random(75, 90)

					if (startS < 0.4) endS = random(0.7, 1)
					else if (startS > 0.6) endS = random(0.1, 0.3)
					else if (startS > 0.5) endS = random(0.1, 0.2)
					else endS = random(0.8, 0.9)

					if (startL < 0.4) endL = random(0.7, 1)
					else if (startL > 0.6) endL = random(0.1, 0.3)
					else if (startL > 0.5) endL = random(0.1, 0.2)
					else endL = random(0.8, 0.9)

					dH = (endH - startH) / palette.slots.length
					dS = (endS - startS) / palette.slots.length
					dL = (endL - startL) / palette.slots.length
				} else {
					const slot = palette.slots[i]
					h = startH + dH * i
					s = startS + dS * i
					l = startL + dL * i
					slot.hex = hslToHex(h, s, l)
					slot.sync()
				}
			}
		}
	} else {
		let h!: number
    let s
    let l
    let mainH
    let secondaryH
    let tertiaryH
		for (const slot of palette.slots)
			if (!slot.isLocked) {
				s = random(0.2, 1)
				l = random(0.2, 0.8)
				if (typeof mainH!=='number') h = mainH = random(0, 360)
				else if (typeof secondaryH!=='number') h = secondaryH = mainH + 30 * random(0.975, 1.025)
				else if (typeof tertiaryH!=='number') h = tertiaryH = mainH - 30 * random(0.975, 1.025)
				else {
					const n = Math.random()
					if (n < 0.333) h = mainH
					else if (n > 0.666) h = secondaryH
					else h = tertiaryH
				}
				slot.hex = hslToHex(h, s, l)
				slot.sync()
			}
	}
	return
}

function complementary(palette: Palette) {
	if (palette.algorithm.details==='slot') {
		let mainH!: number
    let secondaryH!: number
    let minS!: number
    let maxS!: number
    let minL!: number
    let maxL!: number
    let h!: number
    const n = Math.random()
		for (const { hex } of palette.slots) {
			const { h, s, l } = deconstructHex(hex)
			if (typeof mainH!=='number') mainH = h
			else if (typeof secondaryH!=='number') {
				let tMain = mainH
        let d = tMain - h
				if (d > 180) tMain -= 360
				else if (d < -180) tMain += 360
				d = tMain - h
				if (d < -90 || d > 90) secondaryH = h
			}
			if (typeof maxS!=='number' || s > maxS) maxS = s
			if (typeof minS!=='number' || s < minS) minS = s
			if (typeof maxL!=='number' || l > maxL) maxL = l
			if (typeof minL!=='number' || l < minL) minL = l
		}
		if (n > 0.5 && secondaryH) h = secondaryH * random(0.925, 1.025)
		else h = mainH * random(0.925, 1.025)
		const s = random(minS, maxS) * random(0.95, 1.05)
		const l = random(minL, maxL) * random(0.95, 1.05)
		return hslToHex(h, s, l)
	} else {
		let h!: number
    let s
    let l
    let mainH
    let secondaryH
		for (const slot of palette.slots)
			if (!slot.isLocked) {
				s = random(0.2, 1)
				l = random(0.2, 0.8)
				if (typeof mainH!=='number') h = mainH = random(0, 360)
				else if (typeof secondaryH!=='number') h = secondaryH = mainH + 150 * random(0.975, 1.025)
				else if (Math.random() < 0.5) h = mainH * random(0.975, 1.025)
				else h = secondaryH * random(0.975, 1.025)
				slot.hex = hslToHex(h, s, l)
				slot.sync()
			}
	}
	return
}

function splitComplementary(palette: Palette) {
	if (palette.algorithm.details==='slot') {
		let mainH!: number
    let secondaryH!: number
    let tertiaryH!: number
    let minS!: number
    let maxS!: number
    let minL!: number
    let maxL!: number
    let h!: number
    const n = Math.random()
		for (const { hex } of palette.slots) {
			const { h, s, l } = deconstructHex(hex)
			if (typeof mainH!=='number') mainH = h
			else if (typeof secondaryH!=='number') {
				let tMain = mainH
			  let	d = tMain - h
				if (d > 180) tMain -= 360
				else if (d < -180) tMain += 360
				d = tMain - h
				if (d < -30 || d > 30) secondaryH = h
			} else if (typeof tertiaryH!=='number') {
				let tMain = mainH
        let tSecondary = secondaryH
        let d = tMain - h
        let d2 = tSecondary - h
				if (d > 180) tMain -= 360
				else if (d < -180) tMain += 360
				if (d2 > 180) tSecondary -= 360
				else if (d2 < -180) tSecondary += 360
				d = tMain - h
				d2 = tSecondary - h
				if ((d > 30 || d < -30) && (d2 > 30 || d2 < -30)) tertiaryH = h
			}
			if (typeof maxS!=='number' || s > maxS) maxS = s
			if (typeof minS!=='number' || s < minS) minS = s
			if (typeof maxL!=='number' || l > maxL) maxL = l
			if (typeof minL!=='number' || l < minL) minL = l
		}
		if (n < 0.333 && tertiaryH) h = tertiaryH
		else if (n > 0.666 && secondaryH) h = secondaryH
		else h = mainH
		const s = random(minS, maxS) * random(0.95, 1.05)
		const l = random(minL, maxL) * random(0.95, 1.05)
		return hslToHex(h, s, l)
	} else {
		let h!: number
    let s
    let l
    let mainH
    let secondaryH
    let tertiaryH
		for (const slot of palette.slots)
			if (!slot.isLocked) {
				s = random(0.2, 1)
				l = random(0.2, 0.8)
				if (typeof mainH!=='number') h = mainH = random(0, 360)
				else if (typeof secondaryH!=='number') h = secondaryH = mainH + 150 * random(0.975, 1.025)
				else if (typeof tertiaryH!=='number') h = tertiaryH = mainH - 150 * random(0.975, 1.025)
				else {
					const n = Math.random()
					if (n < 0.333) h = mainH * random(0.975, 1.025)
					else if (n > 0.666) h = secondaryH * random(0.975, 1.025)
					else h = tertiaryH * random(0.975, 1.025)
				}
				slot.hex = hslToHex(h, s, l)
				slot.sync()
			}
	}
	return
}

function triadic(palette: Palette) {
	if (palette.algorithm.details==='slot') {
		let mainH!: number
    let secondaryH!: number
    let tertiaryH!: number
    let minS!: number
    let maxS!: number
    let minL!: number
    let maxL!: number
    let h!: number
    const n = Math.random()
		for (const { hex } of palette.slots) {
			const { h, s, l } = deconstructHex(hex)
			if (typeof mainH!=='number') mainH = h
			else if (typeof secondaryH!=='number') {
				let tMain = mainH
        let d = tMain - h
				if (d > 180) tMain -= 360
				else if (d < -180) tMain += 360
				d = tMain - h
				if (d < -90 || d > 90) secondaryH = h
			} else if (typeof tertiaryH!=='number') {
				let tMain = mainH
        let tSecondary = secondaryH
        let d = tMain - h
        let d2 = tSecondary - h
				if (d > 180) tMain -= 360
				else if (d < -180) tMain += 360
				if (d2 > 180) tSecondary -= 360
				else if (d2 < -180) tSecondary += 360
				d = tMain - h
				d2 = tSecondary - h
				if ((d > 90 || d < -90) && (d2 > 90 || d2 < -90)) tertiaryH = h
			}
			if (typeof maxS!=='number' || s > maxS) maxS = s
			if (typeof minS!=='number' || s < minS) minS = s
			if (typeof maxL!=='number' || l > maxL) maxL = l
			if (typeof minL!=='number' || l < minL) minL = l
		}
		if (n < 0.333) h = mainH
		else if (n > 0.666) h = secondaryH
		else h = tertiaryH
		const s = random(minS, maxS) * random(0.95, 1.05)
		const l = random(minL, maxL) * random(0.95, 1.05)
		return hslToHex(h, s, l)
	} else {
		let h!: number
    let s
    let l
    let mainH
    let secondaryH
    let tertiaryH
		for (const slot of palette.slots)
			if (!slot.isLocked) {
				s = random(0.2, 1)
				l = random(0.2, 0.8)
				if (typeof mainH!=='number') h = mainH = random(0, 360)
				else if (typeof secondaryH!=='number') h = secondaryH = mainH + 120
				else if (typeof tertiaryH!=='number') h = tertiaryH = mainH - 120
				else {
					const n = Math.random()
					if (n < 0.333) h = mainH
					else if (n < 0.666) h = secondaryH
					else h = tertiaryH
				}
				slot.hex = hslToHex(h, s, l)
				slot.sync()
			}
	}
	return
}

function tetradic(palette: Palette) {
	if (palette.algorithm.details==='slot') {
		let mainH!: number
    let secondaryH!: number
    let tertiaryH!: number
    let quaternaryH!: number
    let minS!: number
    let maxS!: number
    let minL!: number
    let maxL!: number
    let h!: number
    const n = Math.random()
		for (const { hex } of palette.slots) {
			const { h, s, l } = deconstructHex(hex)
			if (typeof mainH!=='number') mainH = h
			else if (typeof secondaryH!=='number') {
				let tMain = mainH
        let d = tMain - h
				if (d > 180) tMain -= 360
				else if (d < -180) tMain += 360
				d = tMain - h
				if (d < -45 || d > 45) secondaryH = h
			} else if (typeof tertiaryH!=='number') {
				let tMain = mainH
        let tSecondary = secondaryH
        let d = tMain - h
        let d2 = tSecondary - h
				if (d > 180) tMain -= 360
				else if (d < -180) tMain += 360
				if (d2 > 180) tSecondary -= 360
				else if (d2 < -180) tSecondary += 360
				d = tMain - h
				d2 = tSecondary - h
				if ((d > 45 || d < -45) && (d2 > 45 || d2 < -45)) tertiaryH = h
			} else if (typeof quaternaryH!=='number') {
				let tMain = mainH
        let tSecondary = secondaryH
        let tTertiary = tertiaryH
        let d = tMain - h
        let d2 = tSecondary - h
        let d3 = tTertiary - h
				if (d > 180) tMain -= 360
				else if (d < -180) tMain += 360
				if (d2 > 180) tSecondary -= 360
				else if (d2 < -180) tSecondary += 360
				if (d3 > 180) tTertiary -= 360
				else if (d3 < -180) tTertiary += 360
				d = tMain - h
				d2 = tSecondary - h
				d3 = tTertiary - h
				if ((d > 45 || d < -45) && (d2 > 45 || d2 < -45) && (d3 > 45 || d3 < -45)) quaternaryH = h
			}
			if (typeof maxS!=='number' || s > maxS) maxS = s
			if (typeof minS!=='number' || s < minS) minS = s
			if (typeof maxL!=='number' || l > maxL) maxL = l
			if (typeof minL!=='number' || l < minL) minL = l
		}
		if (typeof quaternaryH==='number' && n < 0.25) h = quaternaryH
		else if (typeof tertiaryH==='number' && n < 0.5) h = tertiaryH
		else if (typeof secondaryH==='number' && n < 0.75) h = secondaryH
		else h = mainH
		const s = random(minS, maxS) * random(0.95, 1.05)
		const l = random(minL, maxL) * random(0.95, 1.05)
		return hslToHex(h, s, l)
	} else {
		let h: number
    let s
    let l
    let mainH
    let secondaryH
    let tertiaryH
    let quaternaryH
		for (const slot of palette.slots)
			if (!slot.isLocked) {
				s = random(0.2, 1)
				l = random(0.2, 0.8)
				if (typeof mainH!=='number') h = mainH = random(0, 360)
				else if (typeof secondaryH!=='number') h = secondaryH = mainH + 60
				else if (typeof tertiaryH!=='number') h = tertiaryH = mainH - 120
				else if (typeof quaternaryH!=='number') h = quaternaryH = mainH + 180
				else {
					const n = Math.random()
					if (n < 0.25) h = mainH
					else if (n > 0.5) h = secondaryH
					else if (n > 0.75) h = tertiaryH
					else h = quaternaryH
				}
				slot.hex = hslToHex(h, s, l)
				slot.sync()
			}
	}
	return
}

function square(palette: Palette) {
	if (palette.algorithm.details==='slot') {
		let mainH!: number
    let secondaryH!: number
    let tertiaryH!: number
    let quaternaryH!: number
    let minS!: number
    let maxS!: number
    let minL!: number
    let maxL!: number
    let h!: number
    const n = Math.random()
		for (const { hex } of palette.slots) {
			const { h, s, l } = deconstructHex(hex)
			if (typeof mainH!=='number') mainH = h
			else if (typeof secondaryH!=='number') {
				let tMain = mainH
        let d = tMain - h
				if (d > 180) tMain -= 360
				else if (d < -180) tMain += 360
				d = tMain - h
				if (d < -85 || d > 85) secondaryH = h
			} else if (typeof tertiaryH!=='number') {
				let tMain = mainH
        let tSecondary = secondaryH
        let d = tMain - h
        let d2 = tSecondary - h
				if (d > 180) tMain -= 360
				else if (d < -180) tMain += 360
				if (d2 > 180) tSecondary -= 360
				else if (d2 < -180) tSecondary += 360
				d = tMain - h
				d2 = tSecondary - h
				if ((d < -85 || d > 85) && (d2 < -85 || d2 > 85)) tertiaryH = h
			} else if (typeof quaternaryH!=='number') {
				let tMain = mainH
        let tSecondary = secondaryH
        let tTertiary = tertiaryH
        let d = tMain - h
        let d2 = tSecondary - h
        let d3 = tTertiary - h
				if (d > 180) tMain -= 360
				else if (d < -180) tMain += 360
				if (d2 > 180) tSecondary -= 360
				else if (d2 < -180) tSecondary += 360
				if (d3 > 180) tTertiary -= 360
				else if (d3 < -180) tTertiary += 360
				d = tMain - h
				d2 = tSecondary - h
				d3 = tTertiary - h
				if (d < -85 || (d > 85 && d2 < -85) || (d2 > 85 && (d3 < -85 || d3 > 85))) quaternaryH = h
			}
			if (typeof maxS!=='number' || s > maxS) maxS = s
			if (typeof minS!=='number' || s < minS) minS = s
			if (typeof maxL!=='number' || l > maxL) maxL = l
			if (typeof minL!=='number' || l < minL) minL = l
		}
		if (typeof quaternaryH==='number' && n < 0.25) h = quaternaryH
		else if (typeof tertiaryH==='number' && n < 0.5) h = tertiaryH
		else if (typeof secondaryH==='number' && n < 0.75) h = secondaryH
		else h = mainH
		const s = random(minS, maxS) * random(0.95, 1.05)
		const l = random(minL, maxL) * random(0.95, 1.05)
		return hslToHex(h, s, l)
	} else {
		let h: number
    let s
    let l
    let mainH
    let secondaryH
    let tertiaryH
    let quaternaryH
		for (const slot of palette.slots)
			if (!slot.isLocked) {
				s = random(0.2, 1)
				l = random(0.2, 0.8)
				if (typeof mainH!=='number') h = mainH = random(0, 360)
				else if (typeof secondaryH!=='number') h = secondaryH = mainH + 60
				else if (typeof tertiaryH!=='number') h = tertiaryH = mainH - 120
				else if (typeof quaternaryH!=='number') h = quaternaryH = mainH + 180
				else {
					const n = Math.random()
					if (n < 0.25) h = mainH
					else if (n > 0.5) h = secondaryH
					else if (n > 0.75) h = tertiaryH
					else h = quaternaryH
				}
				slot.hex = hslToHex(h, s, l)
				slot.sync()
			}
	}
	return
}

function chooseRandom(palette: Palette, index: number = 0) {
	const n = Math.round(random(0, 7))
	switch (n) {
		case 0:
			return randomize(palette)
		case 1:
			return monochromatic(palette, index)
		case 3:
			return complementary(palette)
		case 4:
			return splitComplementary(palette)
		case 5:
			return triadic(palette)
		case 6:
			return tetradic(palette)
		case 7:
			return square(palette)
    default:
      return analogous(palette, index)
	}
}

export default [
	randomize,
	monochromatic,
	analogous,
	complementary,
	splitComplementary,
	triadic,
	tetradic,
	square,
	chooseRandom,
]
