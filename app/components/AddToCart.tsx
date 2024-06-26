"use client";

import { Button, Flex, Select } from "@radix-ui/themes";
import { useState, useContext } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CartContext from "../context/CartContext";
import { Snack } from "@prisma/client";

interface Props {
  product: Snack;
}

const AddToCart = ({ product }: Props) => {
  const { addToCart } = useContext(CartContext);
  const quantities = Array.from({ length: product.quantity }, (_, i) => i + 1);

  const [selectQuantity, setSelectQuantity] = useState("0");

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
        disabled={+selectQuantity === 0}
        onClick={() => addToCart(product, +selectQuantity)}
      >
        <FaShoppingCart />
        Add to Cart
      </Button>
    </Flex>
  );
};

export default AddToCart;
