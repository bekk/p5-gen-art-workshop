import { P5Closure } from "..";
import { sketchCache } from "./sketchCache";

export function setupSketchSelect({
  sketches,
  switchSketch,
}: {
  sketches: Record<string, P5Closure>;
  switchSketch: (sketch: P5Closure | undefined) => void;
}) {
  const selectElement = document.getElementById("sketch-select")!;
  selectElement.classList.add(
    "px-3",
    "py-1",
    "border-2",
    "border-slate-700",
    "text-slate-950",
    "hover:bg-slate-200",
    "flex",
    "items-center",
    "justify-center",
    "rounded-md",
    "hover:shadow-md"
  );
  const initiallySelectedSketch = sketchCache.get();
  Object.keys(sketches).forEach((sketchName) => {
    const option = document.createElement("option");
    option.value = sketchName;
    option.textContent = sketchName;
    if (sketchName === initiallySelectedSketch) {
      option.selected = true;
    }
    selectElement.appendChild(option);
  });
  selectElement.onchange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    const sketchName = target.value;
    sketchCache.set(sketchName);
    switchSketch(sketches[sketchName]);
  };
}
