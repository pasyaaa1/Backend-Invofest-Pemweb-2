import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tables = ["events", "categories", "speakers"];

for (const table of tables) {
  try {
    await prisma.$executeRawUnsafe(`
      SELECT setval(
        pg_get_serial_sequence('${table}', 'id'),
        COALESCE((SELECT MAX(id) FROM "${table}"), 1)
      );
    `);
    console.log(`OK: sequence ${table} diselaraskan`);
  } catch (e) {
    console.error(`Gagal ${table}:`, e.message);
  }
}

await prisma.$disconnect();
