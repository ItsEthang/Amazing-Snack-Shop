import { Button } from "@radix-ui/themes";
import React from "react";
import { FaTrashCan } from "react-icons/fa6";

const DeleteSnackButton = ({ snackId }: { snackId: number }) => {
  return (
    <Button color="crimson">
      <FaTrashCan />
      Delete Snack
    </Button>
  );
};

export default DeleteSnackButton;
