import { Snack } from "@prisma/client";
import { Box, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import AddToCart from "../../components/AddToCart";
import SnackImage from "../../components/SnackImage";
import SnackStockBadge from "../../components/SnackStockBadge";

const SnackBox = ({ snack }: { snack: Snack }) => {
  return (
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
  );
};

export default SnackBox;
