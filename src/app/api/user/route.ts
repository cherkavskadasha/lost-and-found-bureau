import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ message: "Неавторизовано" }, { status: 401 });
    }

    const body = await req.json();
    const { name, phone, telegram, city, image } = body; 

    const updatedUser = await prisma.user.update({
      where: { id: (session.user as any).id },
      data: { 
        name, 
        phone, 
        telegram, 
        city, 
        image 
      }, 
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Помилка оновлення профілю:", error);
    return NextResponse.json(
      { message: "Помилка сервера при оновленні профілю" },
      { status: 500 }
    );
  }
}