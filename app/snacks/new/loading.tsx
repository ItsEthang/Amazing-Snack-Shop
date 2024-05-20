import { Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AddSnackLoading = () => {
  return (
    <div className="max-w-xl">
      <Box>
        <Box maxWidth="400px">
          <Skeleton height="3rem" />
        </Box>
        <Box>
          <Skeleton height="3rem" />
        </Box>
        <Box>
          <Skeleton height="20rem" />
        </Box>
        <Box maxWidth="200px">
          <Skeleton height="3rem" />
        </Box>
        <Skeleton height="3rem" width="3rem" />
      </Box>
    </div>
  );
};

export default AddSnackLoading;
