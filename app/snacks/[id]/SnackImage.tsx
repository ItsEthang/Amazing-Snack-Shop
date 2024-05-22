import { Box } from "@radix-ui/themes";
import React from "react";

interface Props {
  url: string;
  alt: string;
}

const SnackImage = ({ url, alt }: Props) => {
  return (
    <Box>
      <img src={url} alt={alt} className="object-cover rounded-lg" />
    </Box>
  );
};

export default SnackImage;
