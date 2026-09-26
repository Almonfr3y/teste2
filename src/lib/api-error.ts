import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { Prisma } from "../../generated/prisma/client";

export function handleApiError(error: unknown) {
  console.error(error);

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        message: "Dados inválidos",
        issues: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 400 }
    );
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Registro não encontrado" },
        { status: 404 }
      );
    }
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Já existe um registro com esse valor único" },
        { status: 409 }
      );
    }
  }

  return NextResponse.json(
    { message: "Erro interno do servidor" },
    { status: 500 }
  );
}