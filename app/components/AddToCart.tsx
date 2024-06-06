"use client";

import { Button, Flex, Select } from "@radix-ui/themes";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: string;
}

const AddToCart = ({ id, name, quantity, price }: Product) => {
  const quantities = Array.from({ length: quantity }, (_, i) => i + 1);

  const [selectQuantity, setSelectQuantity] = useState("0");

  const addToCart = (product: Product, quantity: number) => {
    const cartString = sessionStorage.getItem("cart");
    const cart = cartString ? JSON.parse(cartString) : [];
    // Check if the product is already in the cart
    const foundIndex = cart.findIndex(
      (item: { product: Product; quantity: number }) =>
        item.product.id === product.id
    );

    if (foundIndex !== -1) {
      // If the product exists, update its quantity
      cart[foundIndex].quantity += quantity;
    } else {
      // If the product does not exist, add it to the cart
      cart.push({ product, quantity });
    }
    // Save the updated cart back to sessionStorage
    sessionStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <Flex
      justify={{ initial: "between", lg: "center" }}
      direction={{ lg: "column" }}
      gap={{ lg: "3" }}
    >
      <Select.Root onValueChange={setSelectQuantity}>
        <Select.Trigger placeholder="Quantity" />
        <Select.Content position="popper" className="max-h-10">
          {quantities.map((quantity) => (
            <Select.Item key={quantity} value={quantity.toString()}>
              {quantity}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Button
        onClick={() =>
          addToCart({ id, name, quantity, price }, +selectQuantity)
        }
      >
        <FaShoppingCart />
        Add to Cart
      </Button>
    </Flex>
  );
};

export default AddToCart;
