"use client";
import { Button, Card, Heading, Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Product } from "@/app/components/AddToCart";
import { useState } from "react";

interface CartItem {
  product: Product;
  quantity: number;
}

const SnackOrderPage = () => {
  // Check if running in the browser
  if (typeof window !== "undefined") {
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
    return (
      <>
        <Heading>My Orders</Heading>
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
                <Table.Row key={item.product.id}>
                  <Table.RowHeaderCell className="align-middle">
                    {item.product.name}
                  </Table.RowHeaderCell>
                  <Table.Cell className="align-middle">
                    {item.quantity}
                  </Table.Cell>
                  <Table.Cell className="align-middle">
                    $ {+item.product.price}
                  </Table.Cell>
                  <Table.Cell className="align-middle">
                    $ {+item.product.price * item.quantity}
                  </Table.Cell>
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
            </Table.Body>
          </Table.Root>
        </Card>
        <Button onClick={() => onClear()}>Clear Cart</Button>
      </>
    );
  }
  return <div>LoadingSnackPage...</div>;
};

export default SnackOrderPage;
