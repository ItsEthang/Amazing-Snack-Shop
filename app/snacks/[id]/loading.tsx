import { Card, Flex, Grid } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SnackDetailsLoading = () => {
  return (
    <Grid gap="5" columns="1">
      <Flex align="center" justify="between">
        <Skeleton height="2rem" width="10rem" />
        <Skeleton width="5rem" />
      </Flex>
      <Card>
        <Skeleton height="30rem" width="0" />
      </Card>
      <Flex align="center" justify="between">
        <Skeleton width="5rem" />
        <Skeleton width="5rem" />
      </Flex>
      <Skeleton count={6} />
    </Grid>
  );
};

export default SnackDetailsLoading;
