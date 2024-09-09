import prisma from "@/prisma/client";
import { Snack } from "@prisma/client";
import Pagination from "../components/Pagination";
import SnackGrid from "./SnackGrid";
import SnackToolBar from "./SnackToolBar";

export interface QueryType {
  category: string;
  sortBy: keyof Snack;
  order: string;
  page: string;
  pageSize: string;
}

interface Props {
  searchParams: QueryType;
}

const SnacksPage = async ({ searchParams }: Props) => {
  //Parameter validation
  const isValidCategory = (str: string): boolean => {
    return /^\d+$/.test(str);
  };

  const isValidOrder = (str: string): boolean => {
    return str === "asc" || str === "desc" ? true : false;
  };

  const order = isValidOrder(searchParams.order) ? searchParams.order : "asc";
  const sortBy = searchParams.sortBy
    ? { [searchParams.sortBy]: order }
    : undefined;

  const category = isValidCategory(searchParams.category)
    ? +searchParams.category
    : undefined;

  const pageSize = +searchParams.pageSize || 5;
  const currPage = +searchParams.page || 1;
  const itemCtn = await prisma.snack.count({
    where: {
      categoryId: category,
    },
  });
  const snacks = await prisma.snack.findMany({
    where: {
      categoryId: category,
    },
    orderBy: sortBy,
    skip: (currPage - 1) * pageSize,
    take: pageSize,
  });

  return (
    <div>
      <SnackToolBar query={searchParams} />
      <SnackGrid snacks={snacks} />
      <Pagination itemCtn={itemCtn} pageSize={pageSize} currPage={currPage} />
    </div>
  );
};

export const dynamic = "force-dynamic";

export default SnacksPage;
