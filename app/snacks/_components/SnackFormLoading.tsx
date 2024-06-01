import { Skeleton } from "@/app/components";
import { Box } from "@radix-ui/themes";

const SnackFormLoading = () => {
  return (
    <div className="max-w-xl">
      <Box>
        <Box maxWidth="400px">
          <Skeleton height="2rem" />
        </Box>
        <Box>
          <Skeleton height="2rem" />
        </Box>
        <Box>
          <Skeleton height="20rem" />
        </Box>
        <Box maxWidth="200px">
          <Skeleton height="2rem" />
        </Box>
        <Skeleton height="2rem" width="3rem" />
      </Box>
    </div>
  );
};

export default SnackFormLoading;
