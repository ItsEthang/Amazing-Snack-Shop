import prisma from "@/prisma/client";
import { Select } from "@radix-ui/themes";

const SelectQuantity = async ({ snackId }: { snackId: number }) => {
  const snack = await prisma.snack.findUnique({
    where: {
      id: snackId,
    },
  });
  const quantities = Array.from({ length: snack!.quantity }, (_, i) => i + 1);
  return (
    <Select.Root>
      <Select.Trigger placeholder="Quantity" />
      <Select.Content position="popper" className="max-h-10">
        {quantities.map((quantity) => (
          <Select.Item key={quantity} value={quantity.toString()}>
            {quantity}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default SelectQuantity;
