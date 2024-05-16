import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";

//Validation schema
const createSnackSchema = z.object({
  image: z.string().url({ message: "Invalid url" }).max(2048),
  name: z
    .string()
    .min(1, { message: "Name cannot be empty!" })
    .max(255, { message: "Name is too long!" }),
  description: z.string().min(1, { message: "Description cannot be empty" }),
  price: z.number().nonnegative({ message: "Price cannot be negative!" }),
});

//Add new snack
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createSnackSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newSnack = await prisma.snack.create({
    data: {
      image: body.image,
      name: body.name,
      description: body.description,
      price: body.price,
    },
  });

  return NextResponse.json(newSnack, { status: 201 });
}
