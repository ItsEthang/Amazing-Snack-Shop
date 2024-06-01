import prisma from "@/prisma/client";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import SnackFormLoading from "./loading";

const SnackForm = dynamic(() => import("@/app/snacks/_components/SnackForm"), {
  ssr: false,
  loading: () => <SnackFormLoading />,
});

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
