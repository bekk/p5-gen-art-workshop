import copyToClipboardIcon from "./assets/clipboard.svg?raw";
import { setupIconButton } from "./createIconButton";
import { createToast } from "./toast";

export function setupCopyToClipboardButton({ root }: { root: HTMLElement }) {
  const { button } = setupIconButton({
    id: "copy-to-clipboard-button",
    svgString: copyToClipboardIcon,
  });
  button.onclick = () => {
    const canvas = root.getElementsByTagName("canvas")[0];
    if (canvas === undefined) {
      return;
    }
    canvas.toBlob((blob) => {
      if (blob === null) {
        return;
      }
      const item = new ClipboardItem({ "image/png": blob });
      navigator.clipboard.write([item]);
    });
    createToast().textContent = "Copied to clipboard!";
  };
}
