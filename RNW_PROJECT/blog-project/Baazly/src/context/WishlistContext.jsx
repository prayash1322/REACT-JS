import React, { createContext, useState, useEffect, useCallback } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";

export const WishlistContext = createContext(null);

const STORAGE_KEY = "baazly_wishlist";

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const stored = loadFromStorage(STORAGE_KEY) || loadFromStorage("wishlist");
    return Array.isArray(stored) ? stored.map(String) : [];
  });

  useEffect(() => {
    saveToStorage(STORAGE_KEY, wishlist);
  }, [wishlist]);

  useEffect(() => {
    function handleStorageChange(e) {
      if (e.key === STORAGE_KEY || e.key === "wishlist") {
        try {
          const parsed = JSON.parse(e.newValue || "[]");
          if (Array.isArray(parsed)) {
            setWishlist(parsed.map(String));
          }
        } catch {
        }
      }
    }
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const isWishlisted = useCallback(
    (productId) => wishlist.includes(String(productId)),
    [wishlist]
  );

  const addToWishlist = useCallback((productId) => {
    const idStr = String(productId);
    setWishlist((prev) => (prev.includes(idStr) ? prev : [...prev, idStr]));
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    const idStr = String(productId);
    setWishlist((prev) => prev.filter((id) => id !== idStr));
  }, []);

  const toggleWishlist = useCallback((productId) => {
    const idStr = String(productId);
    let added = false;
    setWishlist((prev) => {
      if (prev.includes(idStr)) {
        added = false;
        return prev.filter((id) => id !== idStr);
      }
      added = true;
      return [...prev, idStr];
    });
    return added;
  }, []);

  const value = {
    wishlist,
    wishlistCount: wishlist.length,
    isWishlisted,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistContext;
