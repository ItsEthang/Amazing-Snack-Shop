import { Heading } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import LoadingOrderPage from "./loading";

const OrderList = dynamic(() => import("./OrderList"), {
  ssr: false,
  loading: () => <LoadingOrderPage />,
});

const SnackOrderPage = () => {
  return (
    <>
      <Heading>My Orders</Heading>
      <OrderList />
    </>
  );
};

export default SnackOrderPage;
