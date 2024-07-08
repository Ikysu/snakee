import { cellToString, toStringArray } from "../utils.js";

export const compress = (frames) => {
    const pixels = []; /* "x,y", frame/delay, showFrames, color, x, y,  */

    // TODO: Змейка пропадает там, где уже была.
    const alreadyIn = (frame, cell) => {
        const pre = pixels.map(e => e[0]).indexOf(cell);
        if (pre === -1) return
        if (pre[1] <= frame && pre[1] + pre[2] >= frame) return true
    }

    frames.forEach((frame, i) => {
        for (let p = 0; p < frame.length; p++) {
            const pixel = frame[p];
            const cell = cellToString(pixel)
            if (alreadyIn(i, cell)) continue
            let time = 1;
            for (let s = i + 1; s < frames.length; s++) {
                if (toStringArray(frames[s]).indexOf(cell) === -1) break;
                time++;
            }
            pixels.push([cell, i, time, ...pixel])
        }
    })

    const out = pixels.map(e => e.slice(1))
    return out
}