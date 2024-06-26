import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import React, { useContext, useState } from "react";
import { GiPayMoney } from "react-icons/gi";
import CartContext from "@/app/context/CartContext";

const PayButton = ({ totalPrice }: { totalPrice: number }) => {
  const { cartItems, deleteFromCart, clearCart } = useContext(CartContext);
  const [isPaying, setPaying] = useState(false);
  const PayOrder = () => {
    console.log("Processing payment");
    console.log("Items of the order: " + JSON.stringify(cartItems));
    clearCart();
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="amber" disabled={isPaying}>
          <Spinner loading={isPaying}>
            <GiPayMoney />
          </Spinner>
          Pay Now
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Payment Confirmation</AlertDialog.Title>
        <AlertDialog.Description size="2">
          The total price of this order is: ${totalPrice}. Pay now?
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              🛒 Go Back
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="amber" onClick={() => PayOrder()}>
              💸 Take my money!
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default PayButton;
