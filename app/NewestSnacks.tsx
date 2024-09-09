import prisma from "@/prisma/client";
import { Box, Grid, Text } from "@radix-ui/themes";
import React from "react";
import SnackBoxDashboard from "./components/SnackBoxDashboard";

const NewestSnacks = async () => {
  const newSnacks = await prisma.snack.findMany({
    orderBy: { addedOn: "desc" },
    take: 4,
  });
  return (
    <Box className="border-solid border-2 border-zinc-200 p-5 rounded-lg">
      <Box className="text-center mb-3">
        <Text weight="bold" size={{ initial: "5", sm: "8" }}>
          NEWEST SNACKS
        </Text>
      </Box>

      <Grid columns={{ initial: "2" }} gap="5">
        {newSnacks.map((snack) => (
          <SnackBoxDashboard key={snack.id} snack={snack} />
        ))}
      </Grid>
    </Box>
  );
};

export default NewestSnacks;
