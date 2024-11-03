export async function saveKey(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export async function getKey(key) {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null; // Return `null` if the item doesn't exist
}
