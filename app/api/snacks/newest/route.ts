import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const newSnacks = await prisma.snack.findMany({
    orderBy: { addedOn: "desc" },
    take: 4,
  });
  return NextResponse.json(newSnacks);
}
