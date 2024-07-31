import { Flex, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

interface Props {
  description: string;
  price: number;
}

const SnackDetails = ({ description, price }: Props) => {
  return (
    <>
      <ReactMarkdown className="prose">{description}</ReactMarkdown>
      <Flex align="center" justify="between">
        <Text as="div">Price:&ensp;</Text>
        <Text as="div">${price}</Text>
      </Flex>
    </>
  );
};

export default SnackDetails;
