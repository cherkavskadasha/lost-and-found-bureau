import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ message: "Не авторизовано" }, { status: 401 });

    const item = await prisma.item.findUnique({ where: { id } });
    if (!item || item.userId !== session.user.id) {
      return NextResponse.json({ message: "Немає доступу" }, { status: 403 });
    }

    await prisma.item.delete({ where: { id } });
    return NextResponse.json({ message: "Оголошення видалено" });
  } catch (error) {
    return NextResponse.json({ message: "Помилка сервера" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ message: "Не авторизовано" }, { status: 401 });

    const body = await req.json();
    const { status } = body;

    const item = await prisma.item.findUnique({ where: { id } });
    if (!item || item.userId !== session.user.id) {
      return NextResponse.json({ message: "Немає доступу" }, { status: 403 });
    }

    const updatedItem = await prisma.item.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json({ message: "Статус оновлено", item: updatedItem });
  } catch (error) {
    return NextResponse.json({ message: "Помилка сервера" }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const item = await prisma.item.findUnique({ where: { id } });
    if (!item) return NextResponse.json({ message: "Не знайдено" }, { status: 404 });
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ message: "Помилка" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return NextResponse.json({ message: "Не авторизовано" }, { status: 401 });

    const item = await prisma.item.findUnique({ where: { id } });
    if (!item || item.userId !== session.user.id) return NextResponse.json({ message: "Немає доступу" }, { status: 403 });

    const body = await req.json();
    
    const category = await prisma.category.findUnique({ where: { slug: body.categorySlug } });
    if (!category) return NextResponse.json({ message: "Категорію не знайдено" }, { status: 400 });

    const updatedItem = await prisma.item.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        city: body.city,
        location: body.location,
        categoryId: category.id,
      }
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json({ message: "Помилка оновлення" }, { status: 500 });
  }
}