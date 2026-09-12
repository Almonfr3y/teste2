import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Categorias
  const eletronicos = await prisma.category.create({
    data: { name: 'Eletrônicos' },
  });
  const papelaria = await prisma.category.create({
    data: { name: 'Papelaria' },
  });

  // Fornecedor
  const supplier = await prisma.supplier.create({
    data: {
      name: 'Distribuidora Central Ltda',
      email: 'contato@distribuidoracentral.com',
      phone: '11999990000',
      document: '12345678000199',
      city: 'São Paulo',
      state: 'SP',
    },
  });

  // Usuário (vendedor)
  const user = await prisma.user.create({
    data: {
      name: 'Ana Souza',
      email: 'ana@crm.com',
      password: 'senha-hasheada-aqui', // na Aula 6 vamos aplicar o hash de verdade
      role: 'SELLER',
    },
  });

  // Cliente
  const client = await prisma.client.create({
    data: {
      name: 'João Pereira',
      email: 'joao@email.com',
      phone: '11988887777',
      document: '98765432100',
      city: 'São Paulo',
      state: 'SP',
    },
  });

  // Produtos + estoque
  const mouse = await prisma.product.create({
    data: {
      name: 'Mouse sem fio',
      sku: 'MOU-001',
      unitPrice: 59.9,
      costPrice: 32.0,
      unit: 'UN',
      categoryId: eletronicos.id,
      supplierId: supplier.id,
      stock: {
        create: { quantity: 50, minQuantity: 10 },
      },
    },
  });

  const caderno = await prisma.product.create({
    data: {
      name: 'Caderno universitário',
      sku: 'CAD-001',
      unitPrice: 24.9,
      costPrice: 12.0,
      unit: 'UN',
      categoryId: papelaria.id,
      supplierId: supplier.id,
      stock: {
        create: { quantity: 100, minQuantity: 20 },
      },
    },
  });

  console.log('Seed concluído:', {
    categorias: 2,
    fornecedor: supplier.name,
    usuario: user.name,
    cliente: client.name,
    produtos: [mouse.name, caderno.name],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });