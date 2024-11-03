export function showMessage(element, message, className, duration = 5000) {
  if (!element) return;
  element.textContent = message;
  element.className = className;
  element.style.display = "block";
  setTimeout(() => {
    element.style.display = "none";
  }, duration);
}
