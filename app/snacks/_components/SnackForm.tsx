"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import { snackSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Snack } from "@prisma/client";
import { Box, Button, Callout, Flex, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { BsInfoCircle } from "react-icons/bs";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";
import CategorySelect from "./CategorySelect";

//SimpleMDE is a client component that uses browser API, which is not available on the server.

interface Props {
  snack?: Snack;
}

//The shape of the form
// interface SnackForm {
//   name: string;
//   image: string;
//   description: string;
//   price: number;
// }
//Replaced by zod infer type from zod schema
type SnackFormType = z.infer<typeof snackSchema>;

const SnackForm = ({ snack }: Props) => {
  //router is for redirecting etc.
  const router = useRouter();
  //React hook form for form submission shenanigans
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SnackFormType>({
    resolver: zodResolver(snackSchema),
  });
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit: SubmitHandler<SnackFormType> = async (data) => {
    try {
      setSubmitting(true);
      if (snack) {
        await axios.patch("/api/snacks/" + snack.id, data);
      } else {
        await axios.post("/api/snacks", data);
      }
      router.push("/snacks");
      router.refresh();
    } catch (error) {
      setError("Due to an error, this snack cannot be added :(");
      setSubmitting(false);
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
      {snack && (
        <Text className="text-xs mb-3" as="div">
          Date added: {snack.addedOn.toString()}
        </Text>
      )}
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <Flex justify="between">
          <Box maxWidth="400px" width={{ sm: "600px" }}>
            <TextField.Root
              defaultValue={snack?.name}
              placeholder="Snack Name"
              {...register("name")}
            ></TextField.Root>
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </Box>
          <Box>
            <CategorySelect />
          </Box>
        </Flex>
        <Box>
          <TextField.Root
            defaultValue={snack?.image}
            placeholder="URL of the snack's image"
            {...register("image")}
          ></TextField.Root>
          <ErrorMessage>{errors.image?.message}</ErrorMessage>
        </Box>
        <Box>
          <Controller
            defaultValue={snack?.description}
            name="description"
            control={control}
            render={({ field }) => <SimpleMDE {...field} />}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </Box>

        <Box maxWidth="200px">
          {snack && <Text as="label">Quantity</Text>}
          <TextField.Root
            defaultValue={snack?.quantity}
            placeholder="Quantity"
            {...register("quantity", { valueAsNumber: true })}
          ></TextField.Root>
          <ErrorMessage>{errors.quantity?.message}</ErrorMessage>
        </Box>
        <Box maxWidth="200px">
          {snack && <Text as="label">Price</Text>}
          <Flex align="center">
            <Text className="mr-1">$</Text>
            <TextField.Root
              defaultValue={snack ? snack.price.toString() : undefined}
              placeholder="Price"
              {...register("price", { valueAsNumber: true })}
            ></TextField.Root>
          </Flex>
          <ErrorMessage>{errors.price?.message}</ErrorMessage>
        </Box>
        <Button size="2" type="submit" loading={isSubmitting}>
          {snack ? "Make Changes" : "Add This Snack!"}
        </Button>
      </form>
    </div>
  );
};

export default SnackForm;
