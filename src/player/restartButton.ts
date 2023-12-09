import restartIcon from "./assets/restart.svg?raw";

export function setupRestartButton({ onClick }: { onClick: () => void }) {
  const buttonElement = document.getElementById("restart-button")!;
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
  icon.innerHTML = restartIcon;
  icon.classList.add("w-8");
  buttonElement.appendChild(icon);

  buttonElement.onclick = () => onClick();
}
