import { createContext, useState, ReactNode, useContext } from 'react';
import { Product } from '../lib/data';

export type CartValue = {
  cart: Product[];
  addToCart: (product: Product) => void;
};

const defaultCartValue: CartValue = {
  cart: [],
  addToCart: () => undefined,
};

export const CartContext = createContext<CartValue>(defaultCartValue);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
