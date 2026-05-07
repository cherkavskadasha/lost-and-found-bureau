import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Всі поля є обов'язковими" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Користувач з таким email вже існує" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      }
    });

    return NextResponse.json(
      { message: "Користувача успішно створено", user: { id: newUser.id, email: newUser.email } },
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Помилка реєстрації:", error);
    return NextResponse.json(
      { message: "Сталася помилка на сервері" },
      { status: 500 }
    );
  }
}