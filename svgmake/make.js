import { settings } from "../settings.js";
import { fin } from './fin.js'

const header = `<svg xmlns="http://www.w3.org/2000/svg" width="${settings.width * settings.block.size +
	(settings.width * settings.block.padding + settings.block.padding)
	}" height="${settings.height * settings.block.size +
	(settings.height * settings.block.padding + settings.block.padding)
	}"
>`,
	footer = `<style>@keyframes show{0%,to{opacity:1}99%{opacity:1}100%{opacity:0}}path{opacity:0}@keyframes fin{0%,to{opacity:1}100%{opacity:1}}</style></svg>`;

const getBlock = (x, y, style) => {
	const PosX = x * settings.block.size + (x ? x * settings.block.padding : 0),
		PosY = y * settings.block.size + (y ? y * settings.block.padding : 0);
	return `<path d="M${PosX} ${PosY}H${settings.block.size + PosX}V${settings.block.size + PosY
		}H${PosX}Z" style="${style}"/>`;
}

const getStyle = (delay, time, color) => `animation:show ${(settings.speed) * (time) + 15}ms;animation-delay:${settings.speed * delay}ms;fill:${settings.colors[color]}`

export const make = (keys) => header + keys.map(([delay, time, color, x, y]) => getBlock(x, y, getStyle(delay, time, color))).join("") + fin(`animation:fin 777s;animation-delay:${keys.reduce((a, b) => a[0] + a[1] < b[0] + b[1] ? b : a, [0, 0]).reduce((a, b) => a + b, 0) * settings.speed}ms;opacity:0`) + footer;