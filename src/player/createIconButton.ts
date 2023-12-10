export function setupIconButton({
  id,
  svgString,
}: {
  id: string;
  svgString: string;
}) {
  const button = document.getElementById(id)!;
  button.classList.add(
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
  icon.innerHTML = svgString;
  button.appendChild(icon);
  return { button, icon };
}
