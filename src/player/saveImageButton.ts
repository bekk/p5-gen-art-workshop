import P5 from "p5";
import downloadIcon from "./assets/download.svg?raw";
import { setupIconButton } from "./createIconButton";

export function setupSaveImageButton({
  getP5Instance,
}: {
  getP5Instance: () => P5 | undefined;
}) {
  const { button } = setupIconButton({
    id: "save-image-button",
    svgString: downloadIcon,
  });

  button.onclick = () => {
    const p5Instance = getP5Instance();
    if (p5Instance === undefined) {
      return;
    }
    p5Instance.saveCanvas();
  };
}
