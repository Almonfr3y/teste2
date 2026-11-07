import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { handleApiError } from "@/lib/api-error";
import { loginSchema } from "@/schemas/auth.schema";
import { comparePassword } from "@/lib/auth/hash";
import { signToken } from "@/lib/auth/token";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await comparePassword(password, user.password))) {
      return NextResponse.json(
        { message: "E-mail ou senha inválidos" },
        { status: 401 }
      );
    }

    const token = await signToken({ sub: user.id, role: user.role });

    const response = NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 dias, em segundos
    });

    return response;
  } catch (error) {
    return handleApiError(error);
  }
}