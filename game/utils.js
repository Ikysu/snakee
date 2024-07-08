import { settings } from '../settings.js'
export const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

export * from '../utils.js'

export const draw = (snake, apple) => {
	const used = toStringArray(snake.body)
	const a = `${apple[0]},${apple[1]}`
	let out = " "
	for (let y = 0; y < settings.height; y++) {
		for (let x = 0; x < settings.width; x++) {
			const n = `${x},${y}`
			out += (used.indexOf(n) === 0 ? "+" : (a === n ? "@" : (used.indexOf(n) !== -1 ? "#" : "."))) + " "
		}
		out += "\n "
	}
	out += "=".repeat(settings.width * 2 - 1)
	console.info(out)
}

