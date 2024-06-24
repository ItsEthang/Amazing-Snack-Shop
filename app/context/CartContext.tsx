"use client";
import { createContext, PropsWithChildren, useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
}
const CartContext = createContext<CartContextValue>({
  cartItems: [],
  addToCart: () => {},
});

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItemsState();
  }, []);

  const setCartItemsState = () => {
    const cartString = sessionStorage.getItem("cart");
    setCartItems(cartString ? JSON.parse(cartString) : []);
  };

  const addToCart = (product: Product, quantity: number) => {
    // Check if the product is already in the cart
    const foundIndex = cartItems.findIndex(
      (item: { product: Product; quantity: number }) =>
        item.product.id === product.id
    );
    let updatedCartItems = [];

    if (foundIndex !== -1) {
      // Update the cartItems state by replacing the existing item with the updated one
      updatedCartItems = cartItems.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // Update the cartItems state by adding the new item
      updatedCartItems = [...cartItems, { product, quantity }];
    }
    // Save the updated cart back to sessionStorage
    sessionStorage.setItem("cart", JSON.stringify(updatedCartItems));
    setCartItemsState();
    console.log("adding stuff");
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

// const addToCart = (product: Product, quantity: number) => {
//   const cartString = sessionStorage.getItem("cart");
//   const cart = cartString ? JSON.parse(cartString) : [];
//   // Check if the product is already in the cart
//   const foundIndex = cart.findIndex(
//     (item: { product: Product; quantity: number }) =>
//       item.product.id === product.id
//   );
//   let updatedCartItems;

//   if (foundIndex !== -1) {
//     // If the product exists, update its quantity
//     cart[foundIndex].quantity += quantity;
//     // Update the cartItems state by replacing the existing item with the updated one
//     updatedCartItems = cartItems.map((item) =>
//       item.product.id === product.id
//         ? { ...item, quantity: item.quantity + quantity }
//         : item
//     );
//   } else {
//     // If the product does not exist, add it to the cart
//     cart.push({ product, quantity });
//     // Update the cartItems state by adding the new item
//     updatedCartItems = [...cartItems, { product, quantity }];
//   }
//   // Save the updated cart back to sessionStorage
//   sessionStorage.setItem("cart", JSON.stringify(cart));
//   setCartItems(updatedCartItems);
// };
