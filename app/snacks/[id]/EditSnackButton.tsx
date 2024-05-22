import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { LuPencilLine } from "react-icons/lu";

const EditSnackButton = ({ snackId }: { snackId: number }) => {
  return (
    <Button>
      <LuPencilLine />
      <Link href={`/snacks/${snackId}/edit`}>Edit This Snack</Link>
    </Button>
  );
};

export default EditSnackButton;
