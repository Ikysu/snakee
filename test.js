import fs from "fs";
import { build } from "./game/index.js";
import { make } from "./svgmake2/index.js";

const { frames } = build();

fs.writeFileSync("snake.svg", make(frames));
