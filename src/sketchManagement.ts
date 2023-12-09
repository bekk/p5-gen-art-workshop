import P5 from "p5";
import { sketches } from "./sketches";

export type P5Closure = (p: P5) => void;

const root = document.getElementById("app")!;
let currentSketch: P5Closure | undefined = Object.values(sketches)[0];
let p5Instance: P5 | undefined =
  currentSketch === undefined ? undefined : new P5(currentSketch, root);

const playButton = document.getElementById("play-pause-button")!;
playButton.onclick = () => {
  if (p5Instance === undefined) {
    return;
  }
  if (p5Instance.isLooping()) {
    p5Instance.noLoop();
    playButton.textContent = "Play";
  } else {
    p5Instance.loop();
    playButton.textContent = "Pause";
  }
};

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
