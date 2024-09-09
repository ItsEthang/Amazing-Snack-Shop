import { Snack } from "@prisma/client";
import { Grid } from "@radix-ui/themes";
import SnackBox from "./_components/SnackBox";

interface Props {
  snacks: Snack[];
}

const SnackGrid = ({ snacks }: Props) => {
  return (
    <Grid columns={{ initial: "1", xs: "2", md: "3", lg: "5" }} gap="5">
      {snacks.map((snack) => (
        <SnackBox snack={snack} key={snack.id} />
      ))}
    </Grid>
  );
};

export default SnackGrid;
