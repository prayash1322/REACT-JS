import type { ProfileEntry } from "@/types/profile";

const storageKey = "profile-card-entries";

export function getEntries(): ProfileEntry[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const entries = JSON.parse(localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(entries) ? entries : [];
  } catch {
    return [];
  }
}

export function saveEntry(entry: ProfileEntry): void {
  const entries = getEntries();
  const existingIndex = entries.findIndex(({ id }) => id === entry.id);

  if (existingIndex >= 0) {
    entries[existingIndex] = entry;
  } else {
    entries.unshift(entry);
  }

  localStorage.setItem(storageKey, JSON.stringify(entries));
}

export function deleteEntry(id: string): void {
  const entries = getEntries().filter((entry) => entry.id !== id);
  localStorage.setItem(storageKey, JSON.stringify(entries));
}
