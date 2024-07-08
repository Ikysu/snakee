import { build } from './game/index.js'
import { compress } from './svgmake/compress.js'
import { make } from './svgmake/make.js'

export default {
	async fetch(request, env, ctx) {
		const { frames } = build()
		const keys = compress(frames)
		const svg = make(keys)
		return new Response(svg, {
			headers: {
				'Access-Control-Allow-Origin': "*",
				'Vary': "Origin",
				'Cache-Control': "max-age=0, no-cache, no-store, must-revalidate",
				'Content-Type': "image/svg+xml"
			}
		});
	},
};