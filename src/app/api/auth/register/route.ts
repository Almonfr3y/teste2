import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError } from "@/lib/api-error";
import { registerSchema } from "@/schemas/auth.schema";
import { hashPassword } from "@/lib/auth/hash";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = registerSchema.parse(body);

    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: { ...data, password: hashedPassword },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      // "select" garante que o hash da senha NUNCA volta na resposta
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}