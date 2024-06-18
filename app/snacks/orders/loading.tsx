import { Card, Table, Flex } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingOrderPage = () => {
  const skeletonCount = 5;
  return (
    <>
      <Card className="my-5">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>
                <Skeleton height="1rem" />
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>
                <Skeleton height="1rem" />
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>
                <Skeleton height="1rem" />
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>
                <Skeleton height="1rem" />
              </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <Table.Row key={index} align="center">
                <Table.RowHeaderCell>
                  <Skeleton height="1rem" />
                </Table.RowHeaderCell>
                <Table.Cell>
                  <Skeleton height="1rem" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton height="1rem" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton height="1rem" />
                </Table.Cell>
                <Table.Cell>
                  <Skeleton height="1.5rem" width="5rem" />
                </Table.Cell>
              </Table.Row>
            ))}
            <Table.Row>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell></Table.Cell>
              <Table.Cell>
                <Skeleton height="1rem" />
              </Table.Cell>
              <Table.Cell>
                <Skeleton height="1rem" width="2rem" />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Card>
      <Flex justify="between">
        <Skeleton height="1.5rem" width="5rem" />
        <Skeleton height="1.5rem" width="5rem" />
      </Flex>
    </>
  );
};

export default LoadingOrderPage;
