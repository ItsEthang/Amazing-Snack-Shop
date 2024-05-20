import prisma from "@/prisma/client";
import { Flex, Grid, Text } from "@radix-ui/themes";
import SnackStockBadge from "../components/SnackStockBadge";
import SnackToolBar from "./SnackToolBar";
import Link from "next/link";
import AddToCart from "../components/AddToCart";

const SnacksPage = async () => {
  const snacks = await prisma.snack.findMany();

  return (
    <div>
      <SnackToolBar />
      <Grid columns={{ initial: "1", md: "3", lg: "5" }} gap="5">
        {snacks.map((snack) => (
          <Link href={`/snacks/${snack.id}`} key={snack.id}>
            <Flex
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
              <AddToCart />
            </Flex>
          </Link>
        ))}
      </Grid>
    </div>
  );
};

export default SnacksPage;
