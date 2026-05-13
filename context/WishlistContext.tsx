"use client";

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
} from "react";

const WISHLIST_KEY = "gamevault-wishlist";
const EMPTY_LIST: string[] = [];

const listeners = new Set<() => void>();
function emitChange() {
  for (const fn of listeners) fn();
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

let cachedRaw: string | null | undefined;
let cachedParsed: string[] = EMPTY_LIST;

function getSnapshot(): string[] {
  const raw = localStorage.getItem(WISHLIST_KEY);
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    if (raw) {
      try {
        cachedParsed = JSON.parse(raw);
      } catch {
        cachedParsed = EMPTY_LIST;
      }
    } else {
      cachedParsed = EMPTY_LIST;
    }
  }
  return cachedParsed;
}

function getServerSnapshot(): string[] {
  return EMPTY_LIST;
}

function writeWishlist(updater: (prev: string[]) => string[]) {
  const current = getSnapshot();
  const next = updater(current);
  const json = JSON.stringify(next);
  cachedRaw = json;
  cachedParsed = next;
  localStorage.setItem(WISHLIST_KEY, json);
  emitChange();
}

interface WishlistContextType {
  wishlist: string[];
  addToWishlist: (slug: string) => void;
  removeFromWishlist: (slug: string) => void;
  isInWishlist: (slug: string) => boolean;
  toggleWishlist: (slug: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const wishlist = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const addToWishlist = useCallback((slug: string) => {
    writeWishlist((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
  }, []);

  const removeFromWishlist = useCallback((slug: string) => {
    writeWishlist((prev) => prev.filter((s) => s !== slug));
  }, []);

  const isInWishlist = useCallback(
    (slug: string) => wishlist.includes(slug),
    [wishlist]
  );

  const toggleWishlist = useCallback((slug: string) => {
    writeWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
