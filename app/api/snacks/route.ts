import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { snackSchema } from "../../validationSchemas";

//Add new snack
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = snackSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newSnack = await prisma.snack.create({
    data: {
      image: body.image,
      name: body.name,
      description: body.description,
      price: body.price,
      quantity: body.quantity,
    },
  });

  return NextResponse.json(newSnack, { status: 201 });
}
