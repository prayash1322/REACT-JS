import React, { createContext, useState, useEffect, useMemo, useCallback } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";

export const CartContext = createContext(null);

const STORAGE_KEY = "baazly_cart";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const stored = loadFromStorage(STORAGE_KEY) ?? loadFromStorage("cart");
    return Array.isArray(stored) ? stored : [];
  });

  useEffect(() => {
    saveToStorage(STORAGE_KEY, cartItems);
  }, [cartItems]);

  useEffect(() => {
    function handleStorageChange(e) {
      if (e.key === STORAGE_KEY || e.key === "cart") {
        try {
          const parsed = JSON.parse(e.newValue || "[]");
          if (Array.isArray(parsed)) {
            setCartItems(parsed);
          }
        } catch {
        }
      }
    }
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + (Number(item.qty) || 0), 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (Number(item.qty) || 0),
      0
    );
  }, [cartItems]);

  const addToCart = useCallback((product, qty = 1) => {
    const parsedQty = Number(qty);
    if (isNaN(parsedQty) || parsedQty <= 0) {
      return { success: false, message: "Invalid quantity", status: "error" };
    }

    const productId = String(product.id || product.productId);
    const stock = Number(product.stock) || 0;

    if (stock <= 0) {
      return { success: false, message: "Out of Stock", status: "out_of_stock" };
    }

    let result = { success: true, message: "✓ Added to Cart", status: "added" };

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => String(item.productId || item.id) === productId
      );

      if (existingIndex > -1) {
        const existing = prevItems[existingIndex];
        const newQty = Number(existing.qty) + parsedQty;

        if (newQty > stock) {
          result = { success: false, message: "Max Stock reached", status: "max_stock" };
          return prevItems;
        }

        const updated = [...prevItems];
        updated[existingIndex] = {
          ...existing,
          qty: newQty,
          price: product.price ?? existing.price,
          name: product.name ?? existing.name,
          image: product.image ?? existing.image,
          stock: stock
        };
        return updated;
      }

      if (parsedQty > stock) {
        result = { success: false, message: "Max Stock reached", status: "max_stock" };
        return prevItems;
      }

      return [
        ...prevItems,
        {
          id: productId,
          productId: productId,
          name: product.name,
          price: Number(product.price),
          image: product.image,
          stock: stock,
          brand: product.brand,
          category: product.category,
          qty: parsedQty
        }
      ];
    });

    return result;
  }, []);

  const removeFromCart = useCallback((productId) => {
    const idStr = String(productId);
    setCartItems((prev) =>
      prev.filter((item) => String(item.productId || item.id) !== idStr)
    );
  }, []);

  const updateQuantity = useCallback((productId, newQty) => {
    const idStr = String(productId);
    const qty = Number(newQty);

    if (isNaN(qty) || qty <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => {
        if (String(item.productId || item.id) === idStr) {
          const maxStock = Number(item.stock) || Infinity;
          const cappedQty = Math.min(qty, maxStock);
          return { ...item, qty: cappedQty };
        }
        return item;
      })
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartContext;
