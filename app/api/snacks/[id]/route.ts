import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { snackSchema } from "@/app/validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/AuthOptions";

//Update existing snack
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //Check if user is authorized
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }
  const body = await request.json();
  //Validate input
  const validation = snackSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { image, name, description, price, quantity, categoryId } = body;
  if (categoryId) {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!category) {
      return NextResponse.json(
        { error: "Invalid category ID" },
        { status: 404 }
      );
    }
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
      image,
      name,
      description,
      price,
      quantity,
      categoryId,
    },
  });

  return NextResponse.json(updatedSnack);
}

//Delete existing snack
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  //Check if user is authorized
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
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

  await prisma.snack.delete({
    where: {
      id: +params.id,
    },
  });

  return NextResponse.json({});
}
