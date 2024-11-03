import { PrismaClient } from '@prisma/client'; // Import PrismaClient from the Prisma package

// Function to create a new instance of PrismaClient
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Define a type for the PrismaClientSingleton
type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// Extend the global object to include a prisma property
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

// Use the existing global prisma instance if available, otherwise create a new one
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma; // Export the prisma instance for use in other parts of the application

// In development mode, store the prisma instance in the global object to prevent multiple instances
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
