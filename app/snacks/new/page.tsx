"use client";
import { TextField, Box, TextArea, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewSnackPage = () => {
  return (
    <>
      <div className="max-w-xl space-y-5">
        <Box maxWidth="400px">
          <TextField.Root placeholder="Name of the snack"></TextField.Root>
        </Box>
        <Box>
          <TextField.Root placeholder="URL of the snack's image"></TextField.Root>
        </Box>
        <Box>
          <SimpleMDE />
        </Box>
        <Box maxWidth="200px">
          <TextField.Root placeholder="$Price"></TextField.Root>
        </Box>
        <Button size="2">Add This Snack!</Button>
      </div>
    </>
  );
};

export default NewSnackPage;
