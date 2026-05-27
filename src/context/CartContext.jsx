import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const totalQuantity = Object.values(cart).reduce((sum, q) => sum + q, 0);

  const addToCart = (id, quantity) => {
    if (quantity <= 0) return; // block adding 0
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + quantity }));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, totalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
