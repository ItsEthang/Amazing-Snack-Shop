import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import React, { useState } from "react";
import { GiPayMoney } from "react-icons/gi";

const PayButton = ({ totalPrice }: { totalPrice: number }) => {
  const [isPaying, setPaying] = useState(false);
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
            <Button
              variant="solid"
              color="amber"
              onClick={() => setPaying(true)}
            >
              💸 Take my money!
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default PayButton;
