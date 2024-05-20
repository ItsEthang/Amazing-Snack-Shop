import { AddToCart, SnackStockBadge } from "@/app/components";
import prisma from "@/prisma/client";
import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

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
    <Grid gap="5" columns="1">
      <Flex align="center" justify="between">
        <Heading as="h1">{snack.name}</Heading>
        <SnackStockBadge quantity={snack.quantity} />
      </Flex>
      <Card>
        <img
          src={snack.image}
          alt={snack.name}
          className="object-cover rounded-lg"
        />
      </Card>
      <Flex align="center" justify="between">
        <Text as="div">$ {+snack.price}</Text>
        <AddToCart />
      </Flex>
      <ReactMarkdown className="prose">{snack.description}</ReactMarkdown>
    </Grid>
  );
};

export default SnackDetailsPage;
