import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Необхідно увійти в систему" }, { status: 401 });
    }

    const body = await req.json();
    const { type, categorySlug, title, description, city, location, controlQuestion, controlAnswer, imageUrl, latitude, longitude } = body;

    const category = await prisma.category.findUnique({
      where: { slug: categorySlug }
    });

    if (!category) {
      return NextResponse.json({ message: "Категорію не знайдено" }, { status: 400 });
    }

    const newItem = await prisma.item.create({
      data: {
        type: type === "LOST" ? "LOST" : "FOUND",
        title,
        description,
        city, 
        location,
        imageUrl,
        controlQuestion: type === "FOUND" ? controlQuestion : null,
        controlAnswer: type === "FOUND" ? controlAnswer : null,
        latitude: latitude,
        longitude: longitude,
        categoryId: category.id,
        userId: session.user.id,
      }
    });

    return NextResponse.json({ message: "Оголошення успішно створено", item: newItem }, { status: 201 });
    
  } catch (error) {
    console.error("Помилка створення оголошення:", error);
    return NextResponse.json(
      { message: "Сталася помилка на сервері" },
      { status: 500 }
    );
  }
}