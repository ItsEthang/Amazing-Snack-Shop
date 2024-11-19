import { Button, Flex } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import Link from "next/link";
import authOptions from "../auth/AuthOptions";
import CategoryFilter from "./CategoryFilter";
import SortBy from "./SortBy";
import { QueryType } from "./page";

const SnackToolBar = async ({ query }: { query: QueryType }) => {
  const session = await getServerSession(authOptions);
  return (
    <Flex justify="between" mb="5">
      <CategoryFilter />
      <SortBy />
      {session && session.user.isAdmin && (
        <Button>
          <Link href="/snacks/new">Add Snack</Link>
        </Button>
      )}
    </Flex>
  );
};

export default SnackToolBar;
