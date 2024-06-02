import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { snackSchema } from "@/app/validationSchemas";

//Update existing snack
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  //Validate input
  const validation = snackSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  //Find the snack with the id
  const snack = await prisma.snack.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!snack) {
    return NextResponse.json({ error: "Invalid snack ID" }, { status: 404 });
  }

  //Update the snack
  const updatedSnack = await prisma.snack.update({
    where: {
      id: +params.id,
    },
    data: {
      image: body.image,
      name: body.name,
      description: body.description,
      price: body.price,
      quantity: body.quantity,
    },
  });

  return NextResponse.json(updatedSnack);
}

//Delete existing snack
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //Find the snack with the id
  const snack = await prisma.snack.findUnique({
    where: {
      id: +params.id,
    },
  });

  if (!snack) {
    return NextResponse.json({ error: "Invalid snack ID" }, { status: 404 });
  }

  await prisma.snack.delete({
    where: {
      id: +params.id,
    },
  });

  return NextResponse.json({});
}
