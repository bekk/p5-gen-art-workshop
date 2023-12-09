import P5 from "p5";
import { sketches } from "./sketches";
import { setupPlayPauseButton } from "./player/playPauseButton";

export type P5Closure = (p: P5) => void;

const root = document.getElementById("app")!;
let currentSketch: P5Closure | undefined = Object.values(sketches)[0];
let p5Instance: P5 | undefined =
  currentSketch === undefined ? undefined : new P5(currentSketch, root);

function getP5Instance() {
  return p5Instance;
}
setupPlayPauseButton({ getP5Instance });
const restartButton = document.getElementById("restart-button")!;
restartButton.onclick = () => {
  p5Instance?.remove();
  if (currentSketch !== undefined) {
    p5Instance = new P5(currentSketch, root);
  }
};

function switchSketch(sketch: P5Closure) {
  currentSketch = sketch;
  p5Instance?.remove();
  p5Instance = new P5(currentSketch, root);
}

const sketchSelect = document.getElementById("sketch-select")!;
Object.keys(sketches).forEach((sketchName) => {
  const option = document.createElement("option");
  option.value = sketchName;
  option.textContent = sketchName;
  sketchSelect.appendChild(option);
});
sketchSelect.onchange = (e: Event) => {
  const target = e.target as HTMLSelectElement;
  const sketchName = target.value;
  switchSketch(sketches[sketchName]);
};
