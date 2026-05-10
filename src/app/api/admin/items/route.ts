import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ message: "Доступ заборонено" }, { status: 403 });
  }

  const items = await prisma.item.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true } } }
  });
  
  return NextResponse.json(items);
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ message: "Доступ заборонено" }, { status: 403 });
  }

  const { id } = await req.json();
  await prisma.item.delete({ where: { id } });
  
  return NextResponse.json({ message: "Оголошення видалено" });
}