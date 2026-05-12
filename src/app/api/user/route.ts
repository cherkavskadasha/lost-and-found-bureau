import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface ProfileUpdateData {
  name?: string;
  phone?: string;
  telegram?: string;
  city?: string;
  image?: string;
}

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = (session?.user as { id?: string })?.id;
    
    if (!session?.user || !userId) {
      return NextResponse.json({ message: "Неавторизовано" }, { status: 401 });
    }

    const body = await req.json();
    const { name, phone, telegram, city, image } = body; 

    const dataToUpdate: ProfileUpdateData = { name, phone, telegram, city };

    if (image && image.trim() !== "" && image !== "undefined") {
      dataToUpdate.image = image;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate, 
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