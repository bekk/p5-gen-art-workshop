import P5 from "p5";
import { sketches } from "./sketches";
import { setupPlayPauseButton } from "./player/playPauseButton";
import { setupRestartButton } from "./player/restartButton";
import { setupSketchSelect } from "./player/sketchSelect";

export type P5Closure = (p: P5) => void;

const root = document.getElementById("app")!;
let currentSketch: P5Closure | undefined = Object.values(sketches)[0];
let p5Instance: P5 | undefined =
  currentSketch === undefined ? undefined : new P5(currentSketch, root);

setupPlayPauseButton({ getP5Instance: () => p5Instance });
setupRestartButton({ onClick: () => switchSketch(currentSketch) });
setupSketchSelect({ sketches, switchSketch });

function switchSketch(sketch: P5Closure | undefined) {
  currentSketch = sketch;
  p5Instance?.remove();
  if (currentSketch !== undefined) {
    p5Instance = new P5(currentSketch, root);
  }
}
