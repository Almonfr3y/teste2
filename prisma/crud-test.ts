import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
    // const newCategory = await prisma.category.create({
    //    data: {
    //        name: 'Informática',
    //    },
    // });
    // console.log('Categoria criada:', newCategory);

    // const allCategory = await prisma.category.findMany({
    //    select: { name: true },
    // });
    // console.log('Todas as categorias:', allCategory);

    // const productWithRelations = await prisma.product.findFirst({
    //    include: { category: true, supplier: true, stock: true },
    // });
    // console.log('Produto com relação:', productWithRelations);

    // const updateCategory = await prisma.category.update({
    //    where: { id: '269797c7-3427-4a25-93cf-335481eef1ab' },
    //    data: { name: 'Informática e Diversos' },
    // });
    // console.log('Categoria atualizada:', updateCategory);

    // const deleteCategory = await prisma.category.delete({
    //    where: { id: '269797c7-3427-4a25-93cf-335481eef1ab' },
    // });
    // console.log('Categoria deletada:', deleteCategory);
}

main().catch((e) => {
   console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});