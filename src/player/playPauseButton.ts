import type P5 from "p5";
import playIconUrl from "./assets/play.svg?raw";
import pauseIconUrl from "./assets/pause.svg?raw";

export function setupPlayPauseButton({
  getP5Instance,
}: {
  getP5Instance: () => P5 | undefined;
}) {
  const buttonElement = document.getElementById("play-pause-button")!;
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
  icon.classList.add("w-8");
  buttonElement.appendChild(icon);
  setIcon();
  buttonElement.onclick = () => {
    const p5Instance = getP5Instance();
    if (p5Instance === undefined) {
      return;
    }
    if (p5Instance.isLooping()) {
      p5Instance.noLoop();
    } else {
      p5Instance.loop();
    }
    setIcon();
  };

  function setIcon() {
    if (getP5Instance()?.isLooping()) {
      icon.innerHTML = pauseIconUrl;
    } else {
      icon.innerHTML = playIconUrl;
    }
  }
}
