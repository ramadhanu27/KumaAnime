import { writable } from "svelte/store";
import { browser } from "$app/environment";

export interface WatchHistoryItem {
  slug: string;
  title: string;
  seriesName: string;
  episode: number;
  thumbnail: string;
  watchedAt: string; // ISO timestamp
}

function createWatchHistoryStore() {
  // Load from localStorage or empty array
  const stored = browser ? localStorage.getItem("watchHistory") : null;
  const initial: WatchHistoryItem[] = stored ? JSON.parse(stored) : [];

  const { subscribe, set, update } = writable<WatchHistoryItem[]>(initial);

  return {
    subscribe,

    // Add or update an item in history
    add: (item: Omit<WatchHistoryItem, "watchedAt">) => {
      update((history) => {
        // Remove existing entry for this slug (if any)
        const filtered = history.filter((h) => h.slug !== item.slug);

        // Add new entry at the beginning with current timestamp
        const newHistory = [
          {
            ...item,
            watchedAt: new Date().toISOString(),
          },
          ...filtered,
        ].slice(0, 50); // Keep max 50 items

        // Save to localStorage
        if (browser) {
          localStorage.setItem("watchHistory", JSON.stringify(newHistory));
        }

        return newHistory;
      });
    },

    // Remove an item from history
    remove: (slug: string) => {
      update((history) => {
        const filtered = history.filter((h) => h.slug !== slug);

        if (browser) {
          localStorage.setItem("watchHistory", JSON.stringify(filtered));
        }

        return filtered;
      });
    },

    // Clear all history
    clear: () => {
      if (browser) {
        localStorage.removeItem("watchHistory");
      }
      set([]);
    },

    // Get recent history (limited)
    getRecent: (limit: number = 10) => {
      const stored = browser ? localStorage.getItem("watchHistory") : null;
      const history: WatchHistoryItem[] = stored ? JSON.parse(stored) : [];
      return history.slice(0, limit);
    },
  };
}

export const watchHistory = createWatchHistoryStore();
