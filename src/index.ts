import P5 from "p5";
import { sketches } from "./registerSketches";
import { setupPlayPauseButton } from "./player/playPauseButton";
import { setupRestartButton } from "./player/restartButton";
import { setupSketchSelect } from "./player/sketchSelect";
import { sketchCache as sketchCache } from "./player/sketchCache";
import { setupCopyToClipboardButton } from "./player/copyToClipboardButton";
import { setupSaveImageButton } from "./player/saveImageButton";
import "./index.css";

export type P5Closure = (p: P5) => void;

const root = document.getElementById("app")!;
let currentSketch: P5Closure | undefined =
  sketches[getInitiallySelectedSketch(sketches)];
let p5Instance: P5 | undefined =
  currentSketch === undefined ? undefined : new P5(currentSketch, root);

setupPlayPauseButton({ getP5Instance: () => p5Instance });
setupRestartButton({ onClick: () => switchSketch(currentSketch) });
setupSketchSelect({ sketches, switchSketch });
setupCopyToClipboardButton({ root });
setupSaveImageButton({ getP5Instance: () => p5Instance });

function switchSketch(sketch: P5Closure | undefined) {
  currentSketch = sketch;
  p5Instance?.remove();
  if (currentSketch !== undefined) {
    p5Instance = new P5(currentSketch, root);
  }
}

function getInitiallySelectedSketch(sketches: Record<string, P5Closure>) {
  const sketchName = sketchCache.get();
  if (sketchName !== null && sketchName in sketches) {
    return sketchName;
  }
  return Object.keys(sketches)[0];
}
