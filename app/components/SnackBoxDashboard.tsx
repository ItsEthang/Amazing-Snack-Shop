import { Snack } from "@prisma/client";
import { Box, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import SnackImage from "./SnackImage";
import SnackStockBadge from "./SnackStockBadge";

const SnackBoxDashboard = ({ snack }: { snack: Snack }) => {
  return (
    <Box
      key={snack.id}
      className="border-solid border-2 border-zinc-200 rounded-lg p-5 "
    >
      <Flex direction="column" gap="5">
        <SnackStockBadge quantity={snack.quantity} />
        <Link
          href={`/snacks/${snack.id}`}
          key={snack.id}
          className="hover:text-slate-400"
        >
          <Box
            position="relative"
            width="100%"
            height={{ initial: "75px", md: "125px", lg: "175px" }}
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
        </Link>
      </Flex>
    </Box>
  );
};

export default SnackBoxDashboard;
