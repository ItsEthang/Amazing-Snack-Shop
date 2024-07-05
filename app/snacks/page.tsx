import { AddToCart, SnackStockBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Flex, Grid, Text } from "@radix-ui/themes";
import Link from "next/link";
import SnackImage from "../components/SnackImage";
import SnackToolBar from "./SnackToolBar";

interface Props {
  searchParams: {
    category: string;
  };
}

const SnacksPage = async ({ searchParams }: Props) => {
  const isValidCategory = (str: string): boolean => {
    return /^\d+$/.test(str);
  };

  const category = isValidCategory(searchParams.category)
    ? +searchParams.category
    : undefined;
  const snacks = await prisma.snack.findMany({
    where: {
      categoryId: category,
    },
  });

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
    </div>
  );
};

export const dynamic = "force-dynamic";

export default SnacksPage;
