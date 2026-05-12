import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
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
  
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ message: "Доступ заборонено" }, { status: 403 });
  }

  const { id } = await req.json();

  const item = await prisma.item.findUnique({ where: { id } });
  if (!item) return NextResponse.json({ message: "Оголошення не знайдено" }, { status: 404 });

  await prisma.$transaction([
    prisma.item.delete({ where: { id } }),
    prisma.notification.create({
      data: {
        userId: item.userId,
        message: `Модератор видалив ваше оголошення "${item.title}". Якщо ви вважаєте, що це помилка, зверніться до підтримки.`
      }
    })
  ]);
  
  return NextResponse.json({ message: "Оголошення видалено" });
}