import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const partners = await prisma.partner.findMany({
    where: { isActive: true },
    include: { products: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(partners);
}