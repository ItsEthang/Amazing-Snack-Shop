import authOptions from "@/app/auth/AuthOptions";
import { AddToCart } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import DeleteSnackButton from "./DeleteSnackButton";
import EditSnackButton from "./EditSnackButton";
import SnackDetails from "./SnackDetails";
import SnackImage from "../../components/SnackImage";
import SnackTitle from "./SnackTitle";

interface Props {
  params: {
    id: string;
  };
}

const SnackDetailsPage = async ({ params }: Props) => {
  if (isNaN(Number(params.id))) notFound();
  const session = await getServerSession(authOptions);

  const snack = await prisma.snack.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!snack) notFound();

  return (
    <Box>
      <SnackTitle name={snack.name} quantity={snack.quantity} />
      <Grid
        columns={{ initial: "1", sm: "2", md: "3", lg: "4" }}
        className="mt-3"
      >
        <Box className="col-span-1">
          <Box
            className="mb-3"
            position="relative"
            width="100%"
            height={{ initial: "500px", lg: "350px" }}
          >
            <SnackImage url={snack.image} alt={snack.name} />
          </Box>
          {session && (
            <Flex justify="between">
              <EditSnackButton snackId={snack.id} />
              <DeleteSnackButton snackId={snack.id} />
            </Flex>
          )}
        </Box>
        <Flex
          direction="column"
          align="center"
          gap="3"
          justify="center"
          className="mt-3 md:m-0 lg:col-span-2 xl:col-span-3"
        >
          <SnackDetails description={snack.description} price={+snack.price} />
          <AddToCart product={snack} />
        </Flex>
      </Grid>
    </Box>
  );
};

export default SnackDetailsPage;
