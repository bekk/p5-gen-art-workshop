import restartIcon from "./assets/restart.svg?raw";
import { setupIconButton } from "./createIconButton";

export function setupRestartButton({ onClick }: { onClick: () => void }) {
  const { button } = setupIconButton({
    id: "restart-button",
    svgString: restartIcon,
  });

  button.onclick = () => onClick();
}
