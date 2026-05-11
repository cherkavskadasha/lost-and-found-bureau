import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const { image, name } = await req.json();
  const userId = (session.user as any).id;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { 
      image: image || undefined,
      name: name || undefined
    },
  });

  return NextResponse.json(updatedUser);
}