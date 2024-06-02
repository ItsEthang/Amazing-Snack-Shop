import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";
import { FaTrashCan } from "react-icons/fa6";

const DeleteSnackButton = ({ snackId }: { snackId: number }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="crimson">
          <FaTrashCan />
          Delete Snack
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Delete Snack</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure? This snack will be permanently deleted from Amazing
          Snack Shop's databse. You cannot undo this action.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              No, let me think...
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="crimson">
              Yes. I want to delete it!
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteSnackButton;
