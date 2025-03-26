import http from "http";
import { build } from "./game/index.js";
import { make } from "./svgmake2/index.js";

http.createServer((req, res) => {
  if (req.url.includes("favicon")) {
    res.end()
    return
  }
  res.setHeaders(new Headers({
    'Access-Control-Allow-Origin': "*",
    'Vary': "Origin",
    'Cache-Control': "max-age=0, no-cache, no-store, must-revalidate",
    'Content-Type': "image/svg+xml"
  }))
  const { frames, state } = build()
  console.info(state === 0 ? "Win" : (state === 1 ? "Lose" : (state === 2 ? "Bad apple" : "Max frames")))
  res.write(make(frames, state))
  res.end()
}).listen(8000)