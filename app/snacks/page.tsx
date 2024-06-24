import { AddToCart, SnackStockBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Flex, Grid, Text } from "@radix-ui/themes";
import Link from "next/link";
import SnackToolBar from "./SnackToolBar";

const SnacksPage = async () => {
  const snacks = await prisma.snack.findMany();

  return (
    <div>
      <SnackToolBar />
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
              </Link>

              <AddToCart
                product={{
                  ...snack,
                  price: snack.price.toString(),
                }}
              />
            </Flex>
          </Box>
        ))}
      </Grid>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default SnacksPage;
