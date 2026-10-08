export const loadStorageItem = (key, fallback = null) => {
  try {
    const serialized = localStorage.getItem(key);
    if (!serialized) return fallback;
    return JSON.parse(serialized);
  } catch {
    return fallback;
  }
};

export const saveStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving key ${key} to storage`, err);
  }
};

export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.error(`Error removing key ${key} from storage`, err);
  }
};
