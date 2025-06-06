import { PrismaClient } from '../generated/prisma'

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined
}

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma
}

// Test database connection
export async function testConnection() {
  try {
    // Try to query the database
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ Database connection successful')
    return true
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return false
  }
}

// // Create a new user
// const user = await prisma.user.create({
//   data: {
//     email: 'user@example.com',
//     password: '123',
//     name: 'John Doe'
//   }
// })

// // Query users
// const users = await prisma.user.findMany() 