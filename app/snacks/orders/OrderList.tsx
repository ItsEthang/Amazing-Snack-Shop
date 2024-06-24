"use client";

import { Product } from "@/app/components/AddToCart";
import CartContext from "@/app/context/CartContext";
import { Button, Card, Flex, Heading, Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useContext } from "react";
import ClearCartButton from "./ClearCartButton";
import PayButton from "./PayButton";

export interface CartItem {
  product: Product;
  quantity: number;
}

const OrderList = () => {
  const { cartItems, deleteFromCart, clearCart } = useContext(CartContext);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <Text as="div">
        You don't have any products in the cart at the moment.{" "}
        <Link href="/snacks" className="hover:underline underline-offset-6">
          <Text weight="bold">Continue browsing ?</Text>
        </Link>
      </Text>
    );
  }

  const totalPrice = cartItems.reduce(
    (total, item) => total + +item.product.price * item.quantity,
    0
  );

  return (
    <>
      <Heading as="h4" weight="medium" size="3">
        You have {itemCount} {itemCount > 1 ? "items" : "item"} in cart
      </Heading>
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
                <Table.Cell>${+item.product.price}</Table.Cell>
                <Table.Cell>${+item.product.price * item.quantity}</Table.Cell>
                <Table.Cell>
                  <Button
                    color="gray"
                    onClick={() => deleteFromCart(item.product.id)}
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
              <Table.Cell>${totalPrice}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Card>
      <Flex justify="between">
        <ClearCartButton onClear={clearCart} />
        <PayButton totalPrice={totalPrice} />
      </Flex>
    </>
  );
};

export default OrderList;
