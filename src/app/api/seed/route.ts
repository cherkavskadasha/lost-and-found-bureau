import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const categories = [
      { name: "Документи", slug: "documents" },
      { name: "Техніка", slug: "electronics" },
      { name: "Тварини", slug: "pets" },
      { name: "Одяг та аксесуари", slug: "clothing" },
      { name: "Інше", slug: "other" },
    ];

    for (const cat of categories) {
      await prisma.category.upsert({
        where: { slug: cat.slug },
        update: {},
        create: cat,
      });
    }

    return NextResponse.json({ message: "Категорії успішно додані в базу!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Сталася помилка при додаванні" }, { status: 500 });
  }
}