import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createSnackSchema } from "../../validationSchemas";

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
