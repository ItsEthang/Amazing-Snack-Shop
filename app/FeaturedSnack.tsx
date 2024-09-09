import { Box, Button, Grid, Text } from "@radix-ui/themes";
import SnackBoxDashboard from "./components/SnackBoxDashboard";
import prisma from "@/prisma/client";
import Link from "next/link";

interface Props {
  categoryId: string;
  categoryName: string;
}

const FeaturedSnack = async ({ categoryId, categoryName }: Props) => {
  const featuredSnacks = await prisma.snack.findMany({
    where: {
      categoryId: +categoryId,
    },
    orderBy: { addedOn: "desc" },
    take: 2,
  });

  return (
    <Box className="border-solid border-2 border-zinc-200 p-5 rounded-lg">
      <Box className="text-center mb-3">
        <Text weight="bold" size={{ initial: "5", sm: "8" }}>
          FEATURED {categoryName.toUpperCase()}
        </Text>
      </Box>

      <Grid columns={{ initial: "1" }} gap="5">
        {featuredSnacks.map((snack) => (
          <SnackBoxDashboard key={snack.id} snack={snack} />
        ))}
      </Grid>
      <Box className="text-center mt-3">
        <Button>
          <Link href={`/snacks?category=${categoryId}`}>Shop Featured</Link>
        </Button>
      </Box>
    </Box>
  );
};

export default FeaturedSnack;
