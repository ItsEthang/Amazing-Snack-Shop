"use client";

import prisma from "@/prisma/client";
import { Box, Grid, Text } from "@radix-ui/themes";
import React from "react";
import SnackBoxDashboard from "./components/SnackBoxDashboard";
import { useNewestSnack } from "./hooks/useNewestSnack";
import { Skeleton } from "@/app/components";

const NewestSnacks = () => {
  const { data: snacks, error, isLoading } = useNewestSnack();
  if (isLoading) return <LoadingSnacks />;
  if (error) return null;
  return (
    <Box className="border-solid border-2 border-zinc-200 p-5 rounded-lg">
      <Box className="text-center mb-3">
        <Text weight="bold" size={{ initial: "5", sm: "8" }}>
          NEWEST SNACKS
        </Text>
      </Box>

      {error && (
        <Text>
          Sorry, but we cannot find the newest snacks at the moment. :(
        </Text>
      )}

      <Grid columns={{ initial: "2" }} gap="5">
        {snacks?.map((snack) => (
          <SnackBoxDashboard key={snack.id} snack={snack} />
        ))}
      </Grid>
    </Box>
  );
};

const LoadingSnacks = () => {
  return (
    <Box className="border-solid border-2 border-zinc-200 p-5 rounded-lg">
      <Box className="text-center mb-3">
        <Text weight="bold" size={{ initial: "5", sm: "8" }}>
          NEWEST SNACKS
        </Text>
      </Box>
      <Grid columns={{ initial: "2" }} gap="5">
        {Array.from({ length: 4 }, (_, index: number) => (
          <div key={index}>
            <Skeleton width="100%" height="12rem" />
          </div>
        ))}
      </Grid>
    </Box>
  );
};

export default NewestSnacks;
