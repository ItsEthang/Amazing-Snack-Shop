"use client";
import { Button, Card, Heading, Table, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Product } from "@/app/components/AddToCart";
import { useRouter } from "next/navigation";

interface CartItem {
  product: Product;
  quantity: number;
}

const SnackOrderPage = () => {
  const router = useRouter();
  // Check if running in the browser
  if (typeof window !== "undefined") {
    const cartString = sessionStorage.getItem("cart");
    if (!cartString) {
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
    const cart = JSON.parse(cartString);
    return (
      <>
        <Heading as="h1" className="mb-5">
          My Orders
        </Heading>
        <Card>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Item Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Quantity</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Item Price</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Total Price</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {cart.map((item: CartItem) => (
                <Table.Row>
                  <Table.RowHeaderCell>{item.product.name}</Table.RowHeaderCell>
                  <Table.Cell>{item.quantity}</Table.Cell>
                  <Table.Cell>$ {+item.product.price}</Table.Cell>
                  <Table.Cell>
                    $ {+item.product.price * item.quantity}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Card>
        <Button onClick={() => (sessionStorage.clear(), router.refresh())}>
          Clear Cart
        </Button>
      </>
    );
  }
  return <div>LoadingSnackPage...</div>;
};

export default SnackOrderPage;
