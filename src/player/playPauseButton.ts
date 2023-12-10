import type P5 from "p5";
import playIconUrl from "./assets/play.svg?raw";
import pauseIconUrl from "./assets/pause.svg?raw";
import { setupIconButton } from "./createIconButton";

export function setupPlayPauseButton({
  getP5Instance,
}: {
  getP5Instance: () => P5 | undefined;
}) {
  const { button, icon } = setupIconButton({
    id: "play-pause-button",
    svgString: playIconUrl,
  });
  setIcon();
  button.onclick = () => {
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
