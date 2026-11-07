import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleApiError } from '@/lib/api-error';

// PUT /api/categories/:id — atualiza uma categoria existente
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const category = await prisma.category.update({
      where: { id },
      data: { name: body.name },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Erro ao atualizar categoria' },
      { status: 500 },
    );
  }
}

// DELETE /api/categories/:id — remove uma categoria (apenas ADMIN)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const role = request.headers.get('x-user-role');

    if (role !== 'ADMIN') {
      return NextResponse.json(
        { message: 'Apenas administradores podem remover categorias' },
        { status: 403 },
      );
    }

    const { id } = await params;
    await prisma.category.delete({ where: { id } });

    return NextResponse.json(
      { message: 'Categoria removida com sucesso' },
      { status: 200 },
    );
  } catch (error) {
    return handleApiError(error);
  }
}