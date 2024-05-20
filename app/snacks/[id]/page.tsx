import SnackStockBadge from "@/app/components/SnackStockBadge";
import prisma from "@/prisma/client";
import { Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const SnackDetailsPage = async ({ params }: Props) => {
  if (typeof params.id !== "number") notFound();

  const snack = await prisma.snack.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!snack) notFound();

  return (
    <div>
      <img
        src={snack.image}
        alt={snack.name}
        className="object-cover rounded-lg"
      />
      <SnackStockBadge quantity={snack.quantity} />
      <Heading as="h1">{snack.name}</Heading>
      <Text as="div">$ {+snack.price}</Text>
      <Text as="p">{snack.description}</Text>
    </div>
  );
};

export default SnackDetailsPage;
