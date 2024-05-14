"use client";
import { TextField, Box, Button } from "@radix-ui/themes";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";

//The shape of the form
interface SnackForm {
  name: string;
  image: string;
  description: string;
  price: number;
}

const NewSnackPage = () => {
  //router is for redirecting etc.
  const router = useRouter();
  const { control, register, handleSubmit } = useForm<SnackForm>();
  const onSubmit: SubmitHandler<SnackForm> = async (data) => {
    await axios
      .post("/api/snacks", { ...data, price: +data.price })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        router.push("/snacks");
      });
  };

  return (
    <>
      <form className="max-w-xl space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <Box maxWidth="400px">
          <TextField.Root
            placeholder="Name of the snack"
            {...register("name")}
          ></TextField.Root>
        </Box>
        <Box>
          <TextField.Root
            placeholder="URL of the snack's image"
            {...register("image")}
          ></TextField.Root>
        </Box>
        <Box>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <SimpleMDE {...field} />}
          />
        </Box>
        <Box maxWidth="200px">
          <TextField.Root
            placeholder="$Price"
            {...register("price")}
          ></TextField.Root>
        </Box>
        <Button size="2" type="submit">
          Add This Snack!
        </Button>
      </form>
    </>
  );
};

export default NewSnackPage;
