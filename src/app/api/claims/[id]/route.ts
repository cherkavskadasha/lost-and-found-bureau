import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string })?.id;

    if (!session || !userId) {
      return NextResponse.json({ message: "Неавторизовано" }, { status: 401 });
    }

    const { id } = await params;

    const claim = await prisma.claim.findUnique({
      where: { id },
      include: { item: true }
    });

    if (!claim || claim.item.userId !== userId) {
      return NextResponse.json({ message: "Немає доступу" }, { status: 403 });
    }

    await prisma.claim.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Заявку видалено" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Помилка сервера" }, { status: 500 });
  }
}