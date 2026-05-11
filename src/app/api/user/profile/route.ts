import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Неавторизовано" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        name: true,
        phone: true,
        telegram: true,
        city: true,
        image: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Користувача не знайдено" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Помилка отримання профілю:", error);
    return NextResponse.json(
      { message: "Помилка сервера" },
      { status: 500 }
    );
  }
}