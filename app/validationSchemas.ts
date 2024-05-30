import { z } from "zod";

//Validation schema
export const snackSchema = z.object({
  image: z.string().url({ message: "Invalid URL" }).max(2048),
  name: z
    .string()
    .min(1, { message: "Name cannot be empty!" })
    .max(255, { message: "Name is too long!" }),
  description: z.string().min(1, { message: "Description cannot be empty" }),
  price: z.number().nonnegative({ message: "Price cannot be negative!" }),
  quantity: z.number().nonnegative({ message: "Quantity cannot be negative!" }),
});
