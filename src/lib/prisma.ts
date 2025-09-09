// lib/prisma.ts

import { PrismaClient } from '@prisma/client'

// Add prisma to the NodeJS global type
// This is to prevent creating multiple PrismaClient instances during development
declare global {
  var prisma: PrismaClient | undefined
}

let prisma: PrismaClient

// Add a console.log here to confirm DATABASE_URL is loaded when PrismaClient is instantiated
console.log("Prisma Client Init: DATABASE_URL is", process.env.DATABASE_URL ? "present" : "MISSING");

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export default prisma
