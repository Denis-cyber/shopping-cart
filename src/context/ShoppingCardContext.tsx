import React from "react";
import { useContext, createContext, useState } from "react";
import { RightSidebar } from "../components/RightSidebar";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCardProviderProps = {
  children: React.ReactNode;
};

export type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCardContextProps = {
  getItemQuantity: (id: number) => number;
  increaseCardQuantity: (id: number) => void;
  decreaseCardQuantity: (id: number) => void;
  removeFromCard: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
  isOpen: boolean;
};

const ShoppingCardContext = createContext({} as ShoppingCardContextProps);

export const useShoppingCard = () => {
  return useContext(ShoppingCardContext);
};

export const ShoppingCardProvider = ({ children }: ShoppingCardProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);

  const getItemQuantity = (id: number) => cartItems.find((item) => item.id === id)?.quantity || 0;
  const increaseCardQuantity = (id: number) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const decreaseCardQuantity = (id: number) => {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.quantity === 1) {
        return currentItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const removeFromCard = (id: number) => {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  };

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <ShoppingCardContext.Provider
      value={{
        getItemQuantity,
        increaseCardQuantity,
        decreaseCardQuantity,
        removeFromCard,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        isOpen,
      }}
    >
      {children}
      <RightSidebar />
    </ShoppingCardContext.Provider>
  );
};
