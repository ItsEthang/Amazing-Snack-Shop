import { Button, Flex, Text } from "@radix-ui/themes";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";

interface Props {
  itemCtn: number;
  pageSize: number;
  currPage: number;
}

const Pagination = ({ itemCtn, pageSize, currPage }: Props) => {
  const totalPages = Math.ceil(itemCtn / pageSize);
  if (totalPages <= 1) return null;
  return (
    <Flex align="center" gap="2">
      <Text size="2">
        Page {currPage} of {totalPages}
      </Text>
      <Button variant="ghost" color="gray" disabled={currPage === 1}>
        <DoubleArrowLeftIcon />
      </Button>
      <Button variant="ghost" color="gray" disabled={currPage === 1}>
        <ChevronLeftIcon />
      </Button>
      <Button variant="ghost" color="gray" disabled={currPage === totalPages}>
        <ChevronRightIcon />
      </Button>
      <Button variant="ghost" color="gray" disabled={currPage === totalPages}>
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
