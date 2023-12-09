import { P5Closure } from "..";

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
  Object.keys(sketches).forEach((sketchName) => {
    const option = document.createElement("option");
    option.value = sketchName;
    option.textContent = sketchName;
    selectElement.appendChild(option);
  });
  selectElement.onchange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    const sketchName = target.value;
    switchSketch(sketches[sketchName]);
  };
}
