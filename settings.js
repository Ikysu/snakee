export const settings = {
	width: 16,
	height: 6,
	lose: 0,
	size: 0,
	maxFrames: 3000, // 3000
	badApple: 3,
	block: {
		size: 30,
		padding: 4,
	},
	speed: 100,
	defaultCells: 4,
	colors: ["#029c14", "#f01c05", "#00db1a"]
}

settings.lose = settings.width * settings.height * 2;
settings.size = settings.width * settings.height
settings.badApple = settings.badApple * settings.size