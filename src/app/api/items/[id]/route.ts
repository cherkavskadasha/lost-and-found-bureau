import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; 

    const item = await prisma.item.findUnique({
      where: { id },
      include: { category: true } 
    });

    if (!item) {
      return NextResponse.json({ message: "Оголошення не знайдено" }, { status: 404 });
    }

    return NextResponse.json(item);
  } catch (error) {
    console.error("Помилка GET /api/items/[id]:", error);
    return NextResponse.json({ message: "Внутрішня помилка сервера" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Неавторизовано" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const updatedItem = await prisma.item.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description,
        city: body.city,
        location: body.location,
        imageUrl: body.imageUrl,
        controlQuestion: body.controlQuestion,
        category: {
          connect: { slug: body.categorySlug } 
        }
      }
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    console.error("Помилка PUT /api/items/[id]:", error);
    return NextResponse.json({ message: "Помилка при оновленні" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ message: "Неавторизовано" }, { status: 401 });
    }

    const { id } = await params;
    
    await prisma.item.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Помилка DELETE /api/items/[id]:", error);
    return NextResponse.json({ message: "Помилка при видаленні" }, { status: 500 });
  }
}