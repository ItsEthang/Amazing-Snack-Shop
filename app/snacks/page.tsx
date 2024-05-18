import React from "react";
import { Button, Flex, Grid, Text } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "@/prisma/client";
import SnackStockBadge from "../components/SnackStockBadge";

const SnacksPage = async () => {
  const snacks = await prisma.snack.findMany();

  return (
    <>
      <Button>
        <Link href="/snacks/new">Add Snack</Link>
      </Button>
      <Grid columns={{ initial: "1", md: "3", lg: "5" }} gap="5">
        {snacks.map((snack) => (
          <Flex
            key={snack.id}
            direction="column"
            gap="3"
            className="border-solid border-2 border-zinc-200 rounded-lg p-5"
          >
            <SnackStockBadge quantity={snack.quantity} />
            <img
              src={snack.image}
              alt={snack.name}
              className="object-cover rounded-lg"
            />
            <Text as="div" align="center">
              {snack.name.toUpperCase()}
            </Text>
            <Flex justify="between">
              <Text as="div">Price: </Text>
              <Text as="div">${+snack.price}</Text>
            </Flex>
          </Flex>
        ))}
      </Grid>
    </>
  );
};

export default SnacksPage;
