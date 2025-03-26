import http from "http";
import { gen } from "./v2/index.js";

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
  res.write(gen())
  res.end()
}).listen(8000)