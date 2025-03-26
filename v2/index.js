
import { build } from "./game.js";
import { make } from "./make.js";

export const gen = () => {
  const { frames, state } = build()
  console.info(state === 0 ? "Win" : (state === 1 ? "Lose" : (state === 2 ? "Bad apple" : "Max frames")))
  return make(frames, state)
}