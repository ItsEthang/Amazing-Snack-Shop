import { AddToCart, SnackStockBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Flex, Grid, Text } from "@radix-ui/themes";
import Link from "next/link";
import SnackImage from "../components/SnackImage";
import SnackToolBar from "./SnackToolBar";
import { Snack } from "@prisma/client";
import Pagination from "../components/Pagination";

export interface QueryType {
  category: string;
  sortBy: keyof Snack;
  order: string;
  page: string;
}

interface Props {
  searchParams: QueryType;
}

const SnacksPage = async ({ searchParams }: Props) => {
  const isValidCategory = (str: string): boolean => {
    return /^\d+$/.test(str);
  };

  const isValidOrder = (str: string): boolean => {
    return str === "asc" || str === "desc" ? true : false;
  };

  const order = isValidOrder(searchParams.order) ? searchParams.order : "asc";
  const sortBy = searchParams.sortBy
    ? { [searchParams.sortBy]: order }
    : undefined;

  const category = isValidCategory(searchParams.category)
    ? +searchParams.category
    : undefined;

  const pageSize = 5;
  const currPage = +searchParams.page || 1;
  const itemCtn = await prisma.snack.count({
    where: {
      categoryId: category,
    },
  });
  const snacks = await prisma.snack.findMany({
    where: {
      categoryId: category,
    },
    orderBy: sortBy,
    skip: (currPage - 1) * pageSize,
    take: pageSize,
  });

  return (
    <div>
      <SnackToolBar query={searchParams} />
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
      <Pagination itemCtn={itemCtn} pageSize={pageSize} currPage={currPage} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default SnacksPage;
