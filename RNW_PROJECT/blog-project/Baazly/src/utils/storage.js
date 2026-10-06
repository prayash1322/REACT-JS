export const fallbackImg =
  "https://dummyimage.com/700x500/f1f1f1/555555&text=Product+Image";

export function loadFromStorage(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null || raw === "") return fallback;
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Storage: Failed to read key "${key}":`, err);
    return fallback;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Storage: Failed to save key "${key}":`, err);
  }
}

export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(`Storage: Failed to remove key "${key}":`, err);
  }
}

export default {
  fallbackImg,
  loadFromStorage,
  saveToStorage,
  removeFromStorage
};
