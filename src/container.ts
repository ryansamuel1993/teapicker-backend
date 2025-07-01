import { PrismaClient } from "@prisma/client";

// Instantiate Prisma client once (singleton)
const prisma = new PrismaClient();

// Instantiate repository

// Instantiate service

// Export for use in GraphQL context or other modules
export { prisma };
