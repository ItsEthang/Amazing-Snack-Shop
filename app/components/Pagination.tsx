"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCtn: number;
  pageSize: number;
  currPage: number;
}

const Pagination = ({ itemCtn, pageSize, currPage }: Props) => {
  const totalPages = Math.ceil(itemCtn / pageSize);
  //for updating current url
  const router = useRouter();
  //for getting existing query params ex: sort and category
  const searchParams = useSearchParams();

  const changePage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    router.push("?" + params.toString());
  };

  const changePageSize = (pageSize: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("pageSize", pageSize.toString());
    router.push("?" + params.toString());
  };

  const pageSizes = [5, 10, 20];

  return (
    <>
      <Flex align="center" justify="center" gap="3" mt="5">
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
          disabled={pageSize === 5}
          onClick={() => changePageSize(5)}
        >
          5
        </Button>
        <Button
          variant="ghost"
          color="gray"
          disabled={pageSize === 10}
          onClick={() => changePageSize(10)}
        >
          10
        </Button>
        <Button
          variant="ghost"
          color="gray"
          disabled={pageSize === 20}
          onClick={() => changePageSize(20)}
        >
          20
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
    </>
  );
};

export default Pagination;
