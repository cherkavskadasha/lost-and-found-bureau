import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { title, description, city, location, categorySlug, imageUrl } = body;

    const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
    if (!category) return NextResponse.json({ message: "Category not found" }, { status: 400 });

    const updatedItem = await prisma.item.update({
      where: { id: id, userId: session.user.id },
      data: { title, description, city, location, imageUrl, categoryId: category.id }
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}