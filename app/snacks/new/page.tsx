"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import { createSnackSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BsInfoCircle } from "react-icons/bs";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";
//The shape of the form

// interface SnackForm {
//   name: string;
//   image: string;
//   description: string;
//   price: number;
// }
//Replaced by zod infer type from zod schema
type SnackForm = z.infer<typeof createSnackSchema>;

const NewSnackPage = () => {
  //router is for redirecting etc.
  const router = useRouter();
  //React hook form for form submission shenanigans
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SnackForm>({
    resolver: zodResolver(createSnackSchema),
  });
  const [error, setError] = useState("");

  const onSubmit: SubmitHandler<SnackForm> = async (data) => {
    try {
      await axios.post("/api/snacks", data);
      router.push("/snacks");
    } catch (error) {
      setError("Due to an error, this snack cannot be added :(");
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <BsInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <Box maxWidth="400px">
          <TextField.Root
            placeholder="Name of the snack"
            {...register("name")}
          ></TextField.Root>
          <ErrorMessage>{errors.name?.message}</ErrorMessage>
        </Box>
        <Box>
          <TextField.Root
            placeholder="URL of the snack's image"
            {...register("image")}
          ></TextField.Root>
          <ErrorMessage>{errors.image?.message}</ErrorMessage>
        </Box>
        <Box>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <SimpleMDE {...field} />}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </Box>
        <Box maxWidth="200px">
          <TextField.Root
            placeholder="$Price"
            {...register("price", { valueAsNumber: true })}
          ></TextField.Root>
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </Box>
        <Button size="2" type="submit">
          Add This Snack!
        </Button>
      </form>
    </div>
  );
};

export default NewSnackPage;
