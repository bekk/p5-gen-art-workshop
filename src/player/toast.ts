export function createToast() {
  const toast = document.createElement("div");
  toast.classList.add(
    "fixed",
    "bottom-0",
    "right-1/2",
    "p-4",
    "text-slate-950",
    "rounded-md",
    "shadow-lg",
    "text-lg",
    "font-medium",
    "flex",
    "items-center",
    "justify-between",
    "transition-transform",
    "transition-opacity",
    "transition-duration-100",
    "translate-x-1/2"
  );
  toast.id = "toast";
  const message = document.createElement("div");
  message.id = "toast-message";
  toast.appendChild(message);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("-translate-y-full");
  });

  setTimeout(() => {
    toast.classList.add("transition-ease-out");
    toast.classList.remove("-translate-y-96");
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 150);
  }, 1000);
  return toast;
}
