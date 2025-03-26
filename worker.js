import { build } from './game/index.js'
import { make } from './svgmake2/index.js'

export default {
	async fetch(request, env, ctx) {
		const { frames, state } = build()
		const svg = make(keys, state)
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