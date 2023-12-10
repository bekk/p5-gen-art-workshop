import copyToClipboardIcon from "./assets/clipboard.svg?raw";
import { createToast } from "./toast";

export function setupCopyToClipboardButton({ root }: { root: HTMLElement }) {
  const buttonElement = document.getElementById("copy-to-clipboard-button")!;
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
  icon.innerHTML = copyToClipboardIcon;
  icon.classList.add("w-8");
  buttonElement.appendChild(icon);
  buttonElement.onclick = () => {
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
