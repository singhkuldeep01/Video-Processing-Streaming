import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
// import { PrismaClient } from "../generated/prisma/client";

// The generated Prisma client lives outside the TS "rootDir". Use require with a TS ignore
// so the compiler won't enforce the rootDir check on this import.
// @ts-ignore
const { PrismaClient } = require("../../prisma/generated/prisma/client");

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  connectionLimit: 5,
});
const prisma = new PrismaClient({ adapter });

export { prisma };