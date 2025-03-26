import { gen } from "./v2/index.js";

export default {
	async fetch(request, env, ctx) {
		return new Response(gen(), {
			headers: {
				'Access-Control-Allow-Origin': "*",
				'Vary': "Origin",
				'Cache-Control': "max-age=0, no-cache, no-store, must-revalidate",
				'Content-Type': "image/svg+xml"
			}
		});
	},
};