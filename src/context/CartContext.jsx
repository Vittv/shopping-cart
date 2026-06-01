import { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({});
  const totalQuantity = Object.values(cart).reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
  const addToCart = (product, quantity) => {
    if (quantity <= 0) return;
    setCart((prev) => ({
      ...prev,
      [product.id]: {
        product,
        quantity: (prev[product.id]?.quantity || 0) + quantity,
      },
    }));
  };
  const removeFromCart = (id) => {
    setCart((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return;
    setCart((prev) => ({
      ...prev,
      [id]: { ...prev[id], quantity },
    }));
  };
  const totalPrice = Object.values(cart).reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0,
  );
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalQuantity,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
