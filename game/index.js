import algo from './algo.js'
import { settings } from '../settings.js'
import { toStringArray, cellToString, rnd } from './utils.js'

export const getFreeCell = (cellsInUse) => {
	const free = []
	const used = toStringArray(cellsInUse)

	for (let x = 0; x < settings.width; x++) {
		for (let y = 0; y < settings.height; y++) {
			if (used.indexOf(`${x},${y}`) === -1) free.push([x, y])
		}
	}
	return free[rnd(0, free.length - 1)]
}

export const checkHead = (snake, apple) => {
	// Left Up Right Bottom
	const head = snake.body[0]
	const used = toStringArray(snake.body).slice(0, -1)

	return [
		head[0] - 1 < 0 || used.indexOf(`${head[0] - 1},${head[1]}`) !== -1 ? settings.lose : algo([head[0] - 1, head[1]], settings.width, settings.height, snake.body, apple),
		head[1] - 1 < 0 || used.indexOf(`${head[0]},${head[1] - 1}`) !== -1 ? settings.lose : algo([head[0], head[1] - 1], settings.width, settings.height, snake.body, apple),
		head[0] + 1 >= settings.width || used.indexOf(`${head[0] + 1},${head[1]}`) !== -1 ? settings.lose : algo([head[0] + 1, head[1]], settings.width, settings.height, snake.body, apple),
		head[1] + 1 >= settings.height || used.indexOf(`${head[0]},${head[1] + 1}`) !== -1 ? settings.lose : algo([head[0], head[1] + 1], settings.width, settings.height, snake.body, apple),
	]
}

export const move = (snake, sides, apple) => {
	const head = snake.body[0]
	const min = Math.min(...sides)
	const len = sides.filter(side => side === min).length - 1;

	switch (sides.indexOf(min, rnd(0, len))) {
		case 0: // Left
			snake.body.unshift([head[0] - 1, head[1]])
			break;
		case 1: // Up
			snake.body.unshift([head[0], head[1] - 1])
			break;
		case 2: // Right
			snake.body.unshift([head[0] + 1, head[1]])
			break;
		case 3: // Bottom
			snake.body.unshift([head[0], head[1] + 1])
			break;
		default:
			break;
	}
	if (cellToString(snake.body[0]) !== cellToString(apple)) snake.body.pop()
	return snake
}

export const build = () => {
	let snake = {
		body: [[rnd(1, settings.width - 2), rnd(1, settings.height - 2)]]
	};

	let apple = getFreeCell(snake.body);

	snake.body.push(...new Array(settings.defaultCells - 1).fill(snake.body[0]))

	let frames = [], c = 0, appleStandBy = 0;
	const getFrame = () => {
		const frame = [...new Set(snake.body)].map((cell, id) => ([0, ...cell, id]))
		frame[0][0] = 2
		if (cellToString(snake.body[0]) !== cellToString(apple)) frame.push([1, ...apple, 0])
		frames.push(frame)
	}

	const loop = () => {
		appleStandBy++;
		getFrame()

		const sides = checkHead(snake, apple)
		if (Math.min(...sides) === settings.lose) return 1
		snake = move(snake, sides, apple)
		if (snake.body.length === settings.size) {
			getFrame()
			return 0
		}

		if (cellToString(snake.body[0]) === cellToString(apple)) {
			apple = getFreeCell([...snake.body, apple])
			appleStandBy = 0
		}

		if (appleStandBy > settings.badApple) return 2
		if (c++ > settings.maxFrames) return 3

		return loop()
	}
	const state = loop()
	return { frames, state }
}