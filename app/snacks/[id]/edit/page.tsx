import prisma from "@/prisma/client";
import SnackForm from "../../_components/SnackForm";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

const EditSnackPage = async ({ params }: Props) => {
  const snack = await prisma.snack.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!snack) notFound();
  return <SnackForm snack={snack} />;
};

export default EditSnackPage;
