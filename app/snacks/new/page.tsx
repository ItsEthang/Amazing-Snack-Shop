import dynamic from "next/dynamic";
import SnackFormLoading from "./loading";

const SnackForm = dynamic(() => import("@/app/snacks/_components/SnackForm"), {
  ssr: false,
  loading: () => <SnackFormLoading />,
});

const NewSnackPage = () => {
  return <SnackForm />;
};

export default NewSnackPage;
