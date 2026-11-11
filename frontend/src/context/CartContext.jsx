import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);
const CART_KEY = "canteen_cart";

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
    catch { return []; }
  });
  useEffect(() => localStorage.setItem(CART_KEY, JSON.stringify(cart)), [cart]);

  const addToCart = (food) => setCart((prev) => {
    const existing = prev.find((item) => item.id === food.id);
    return existing
      ? prev.map((item) => item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item)
      : [...prev, { ...food, quantity: 1 }];
  });
  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return setCart((prev) => prev.filter((item) => item.id !== id));
    setCart((prev) => prev.map((item) => item.id === id ? { ...item, quantity } : item));
  };
  const removeFromCart = (id) => setCart((prev) => prev.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
};
