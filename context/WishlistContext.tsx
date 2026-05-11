"use client";

import { createContext, useContext, useState, useCallback } from "react";

interface WishlistContextType {
  wishlist: string[];
  addToWishlist: (slug: string) => void;
  removeFromWishlist: (slug: string) => void;
  isInWishlist: (slug: string) => boolean;
  toggleWishlist: (slug: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

function getStoredWishlist(): string[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("gamevault-wishlist");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }
  return [];
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>(() => getStoredWishlist());

  // Keep localStorage in sync when wishlist changes
  const updateWishlist = useCallback((updater: (prev: string[]) => string[]) => {
    setWishlist((prev) => {
      const next = updater(prev);
      localStorage.setItem("gamevault-wishlist", JSON.stringify(next));
      return next;
    });
  }, []);

  const addToWishlist = useCallback((slug: string) => {
    updateWishlist((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
  }, [updateWishlist]);

  const removeFromWishlist = useCallback((slug: string) => {
    updateWishlist((prev) => prev.filter((s) => s !== slug));
  }, [updateWishlist]);

  const isInWishlist = useCallback(
    (slug: string) => wishlist.includes(slug),
    [wishlist]
  );

  const toggleWishlist = useCallback((slug: string) => {
    updateWishlist((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }, [updateWishlist]);

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}
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
