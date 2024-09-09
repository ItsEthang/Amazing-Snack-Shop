import { Box, Flex, Grid, Text } from "@radix-ui/themes";
import React from "react";
import { AddToCart, SnackStockBadge } from "../components";
import Link from "next/link";
import { Snack } from "@prisma/client";
import SnackImage from "../components/SnackImage";

interface Props {
  snacks: Snack[];
}

const SnackGrid = ({ snacks }: Props) => {
  return (
    <Grid columns={{ initial: "1", xs: "2", md: "3", lg: "5" }} gap="5">
      {snacks.map((snack) => (
        <Box
          key={snack.id}
          className="border-solid border-2 border-zinc-200 rounded-lg p-5 "
        >
          <Flex direction="column" gap="3">
            <SnackStockBadge quantity={snack.quantity} />
            <Link
              href={`/snacks/${snack.id}`}
              key={snack.id}
              className="hover:text-slate-400"
            >
              <Box
                position="relative"
                width="100%"
                height={{ initial: "300px", md: "250px", lg: "200px" }}
              >
                <SnackImage url={snack.image} alt={snack.name} />
              </Box>
              <Text
                as="div"
                align="center"
                className="overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {snack.name.toUpperCase()}
              </Text>
              <Flex justify="between">
                <Text as="div">Price: </Text>
                <Text as="div">${+snack.price}</Text>
              </Flex>
            </Link>

            <AddToCart product={snack} />
          </Flex>
        </Box>
      ))}
    </Grid>
  );
};

export default SnackGrid;
