"use client";

import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

const DeleteSnackButton = ({ snackId }: { snackId: number }) => {
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const router = useRouter();

  const deleteSnack = async () => {
    try {
      setDeleting(true);
      await axios.delete("/api/snacks/" + snackId);
      router.push("/snacks");
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="ruby" disabled={isDeleting}>
            <Spinner loading={isDeleting}>
              <FaTrashCan />
            </Spinner>
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
                🤔 No, let me think...
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="ruby" onClick={deleteSnack}>
                🫡 Yes. I want to delete it!
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description size="2">
            An error occurred when deleting this snack. We are not planning to
            do anything about it. Have a good day.
          </AlertDialog.Description>
          <AlertDialog.Cancel>
            <Button
              variant="soft"
              color="gray"
              mt="4"
              onClick={() => setError(false)}
            >
              Bruh...
            </Button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteSnackButton;
