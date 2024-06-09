import { Heading } from "@radix-ui/themes";
import dynamic from "next/dynamic";

const OrderList = dynamic(() => import("./OrderList"), { ssr: false });

const SnackOrderPage = () => {
  return (
    <>
      <Heading>My Orders</Heading>
      <OrderList />
    </>
  );
};

export default SnackOrderPage;
