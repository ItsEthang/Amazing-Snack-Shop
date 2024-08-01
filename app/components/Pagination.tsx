"use client";
import { Button, Flex, Text } from "@radix-ui/themes";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCtn: number;
  pageSize: number;
  currPage: number;
}

const Pagination = ({ itemCtn, pageSize, currPage }: Props) => {
  const totalPages = Math.ceil(itemCtn / pageSize);
  if (totalPages <= 1) return null;
  //for updating current url
  const router = useRouter();
  //for getting existing query params ex: sort and category
  const searchParams = useSearchParams();
  const changePage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currPage} of {totalPages}
      </Text>
      <Button
        variant="ghost"
        color="gray"
        disabled={currPage === 1}
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        variant="ghost"
        color="gray"
        disabled={currPage === 1}
        onClick={() => changePage(currPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="ghost"
        color="gray"
        disabled={currPage === totalPages}
        onClick={() => changePage(currPage + 1)}
      >
        <ChevronRightIcon />
      </Button>
      <Button
        variant="ghost"
        color="gray"
        disabled={currPage === totalPages}
        onClick={() => changePage(totalPages)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
