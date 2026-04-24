import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@bgi.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@bgi.com',
      password: adminPassword,
      role: 'ADMIN',
      department: 'Management',
      status: 'ACTIVE',
    },
  });
  console.log('✓ Admin user created');

  // Create manager user
  const managerPassword = await bcrypt.hash('manager123', 10);
  await prisma.user.upsert({
    where: { email: 'manager@bgi.com' },
    update: {},
    create: {
      name: 'Manager User',
      email: 'manager@bgi.com',
      password: managerPassword,
      role: 'MANAGER',
      department: 'Operations',
      status: 'ACTIVE',
    },
  });
  console.log('✓ Manager user created');

  // Create staff user
  const staffPassword = await bcrypt.hash('staff123', 10);
  await prisma.user.upsert({
    where: { email: 'staff@bgi.com' },
    update: {},
    create: {
      name: 'Staff User',
      email: 'staff@bgi.com',
      password: staffPassword,
      role: 'STAFF',
      department: 'Production',
      status: 'ACTIVE',
    },
  });
  console.log('✓ Staff user created');

  // Create sample products
  const products = [
    { name: 'Premium Lager', category: 'Lager', quantity: 150 },
    { name: 'Dark Stout', category: 'Stout', quantity: 80 },
    { name: 'Wheat Beer', category: 'Wheat', quantity: 45 },
    { name: 'IPA', category: 'Ale', quantity: 25 },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.name === 'Premium Lager' ? 1 : 0 },
      update: {},
      create: product,
    }).catch(() => {
      // Product might already exist
    });
  }
  console.log('✓ Sample products created');

  console.log('✅ Database seeding completed!');
}

main()
  .catch(e => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });