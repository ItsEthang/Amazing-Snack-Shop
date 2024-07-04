import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { snackSchema } from "../../validationSchemas";
import authOptions from "@/app/auth/AuthOptions";
import { getServerSession } from "next-auth";

//Add new snack
export async function POST(request: NextRequest) {
  //Check if user is authorized
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }
  const body = await request.json();
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

  const newSnack = await prisma.snack.create({
    data: {
      image,
      name,
      description,
      price,
      quantity,
      categoryId,
    },
  });

  return NextResponse.json(newSnack, { status: 201 });
}
