import { AddToCart, SnackStockBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { LuPencilLine } from "react-icons/lu";
import Link from "next/link";
interface Props {
  params: {
    id: string;
  };
}

const SnackDetailsPage = async ({ params }: Props) => {
  if (isNaN(Number(params.id))) notFound();

  const snack = await prisma.snack.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!snack) notFound();

  return (
    <Flex gap="5" direction="column">
      <Flex align="center" gap="3">
        <Heading as="h1">{snack.name}</Heading>
        <SnackStockBadge quantity={snack.quantity} />
      </Flex>
      <Grid columns={{ initial: "1", sm: "2" }}>
        <Box>
          <img
            src={snack.image}
            alt={snack.name}
            className="object-cover rounded-lg"
          />
        </Box>
        <Flex direction="column" align="center" gap="3" justify="center">
          <ReactMarkdown className="prose">{snack.description}</ReactMarkdown>
          <Flex align="center" justify="between">
            <Text as="div">Price:</Text>
            <Text as="div">$ {+snack.price}</Text>
          </Flex>
          <AddToCart />
          <Button>
            <LuPencilLine />
            <Link href={`/snacks/${snack.id}/edit`}>Edit This Snack</Link>
          </Button>
        </Flex>
      </Grid>
    </Flex>
  );
};

export default SnackDetailsPage;
