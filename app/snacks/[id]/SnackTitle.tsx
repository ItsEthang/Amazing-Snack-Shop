import { SnackStockBadge } from "@/app/components";
import { Flex, Heading } from "@radix-ui/themes";
import React from "react";

interface Props {
  name: string;
  quantity: number;
}

const SnackTitle = ({ name, quantity }: Props) => {
  return (
    <Flex align="center" gap="3">
      <Heading as="h1">{name}</Heading>
      <SnackStockBadge quantity={quantity} />
    </Flex>
  );
};

export default SnackTitle;
