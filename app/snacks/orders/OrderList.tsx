"use client";

import { Product } from "@/app/components/AddToCart";
import { Card, Table, Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import React, { useState } from "react";

export interface CartItem {
  product: Product;
  quantity: number;
}

const OrderList = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const cartString = sessionStorage.getItem("cart");
    return cartString ? JSON.parse(cartString) : [];
  });
  if (cartItems.length === 0) {
    return (
      <Text as="div">
        You don't have any products in the cart at the moment.{" "}
        <Link href="/snacks" className="hover:underline underline-offset-6">
          Continue browsing
        </Link>
        ?
      </Text>
    );
  }

  const onDelete = (productId: number) => {
    const updatedCart = cartItems.filter(
      (item) => item.product.id !== productId
    );
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const onClear = () => {
    setCartItems([]);
    sessionStorage.clear();
  };
  const totalPrice = cartItems.reduce(
    (total, item) => total + +item.product.price * item.quantity,
    0
  );

  return (
    <>
      <Card className="my-5">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Item Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Item Price</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Total Price</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {cartItems.map((item: CartItem) => (
              <Table.Row key={item.product.id} align="center">
                <Table.RowHeaderCell>{item.product.name}</Table.RowHeaderCell>
                <Table.Cell>{item.quantity}</Table.Cell>
                <Table.Cell>$ {+item.product.price}</Table.Cell>
                <Table.Cell>$ {+item.product.price * item.quantity}</Table.Cell>
                <Table.Cell>
                  <Button
                    color="gray"
                    onClick={() => onDelete(item.product.id)}
                  >
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>
                <Text weight="bold">Total Price: </Text>
              </Table.Cell>
              <Table.Cell>$ {totalPrice}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Card>
      <Button onClick={() => onClear()}>Clear Cart</Button>
    </>
  );
};

export default OrderList;
