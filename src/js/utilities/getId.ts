export function getId() {
  return Number(new URLSearchParams(window.location.search).get("id"));
}
