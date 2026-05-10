import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const [totalItems, totalUsers, lostCount, foundCount] = await Promise.all([
    prisma.item.count(),
    prisma.user.count(),
    prisma.item.count({ where: { type: "LOST" } }),
    prisma.item.count({ where: { type: "FOUND" } }),
  ]);

  return NextResponse.json({
    totalItems,
    totalUsers,
    lostCount,
    foundCount,
  });
}