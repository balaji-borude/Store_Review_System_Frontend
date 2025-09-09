// prismaClient.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function connectDB() {
  try {
    // Test connection
    await prisma.$connect();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit process if DB connection fails
  }
}

// Immediately try connecting
connectDB();

export default prisma;
