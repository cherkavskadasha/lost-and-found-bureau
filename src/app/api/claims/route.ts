import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Неавторизовано" }, { status: 401 });
    }

    const body = await req.json();
    const { itemId, answer } = body;

    const item = await prisma.item.findUnique({
      where: { id: itemId }
    });

    if (!item) {
      return NextResponse.json({ message: "Оголошення не знайдено" }, { status: 404 });
    }

    const existingClaim = await prisma.claim.findFirst({
      where: { itemId, claimantId: (session.user as any).id }
    });

    if (existingClaim) {
      return NextResponse.json({ message: "Ви вже подали заявку на цю річ" }, { status: 400 });
    }

    const newClaim = await prisma.claim.create({
      data: {
        itemId,
        answer,
        claimantId: (session.user as any).id
      }
    });

    await prisma.notification.create({
      data: {
        userId: item.userId,
        message: `Нова заявка на вашу знахідку: "${item.title}". Перевірте відповідь у профілі!`,
      }
    });

    return NextResponse.json(newClaim, { status: 201 });
  } catch (error) {
    console.error("Помилка створення заявки:", error);
    return NextResponse.json({ message: "Помилка сервера" }, { status: 500 });
  }
}