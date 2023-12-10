import P5 from "p5";
import downloadIcon from "./assets/download.svg?raw";

export function setupSaveImageButton({
  getP5Instance,
}: {
  getP5Instance: () => P5 | undefined;
}) {
  const buttonElement = document.getElementById("save-image-button")!;
  buttonElement.classList.add(
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
  const icon = document.createElement("div");
  icon.innerHTML = downloadIcon;
  icon.classList.add("w-8");
  buttonElement.appendChild(icon);
  buttonElement.onclick = () => {
    const p5Instance = getP5Instance();
    if (p5Instance === undefined) {
      return;
    }
    p5Instance.saveCanvas();
  };
}
