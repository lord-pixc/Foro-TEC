import { PrismaClient } from './generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

function createPrismaClient() {
    const adapter =
        globalThis.adapterGlobal ??
        new PrismaPg({ connectionString: process.env.DATABASE_URL })
    return new PrismaClient({ adapter })
}

declare const globalThis: {
    dbGlobal: ReturnType<typeof createPrismaClient>
    adapterGlobal: PrismaPg
} & typeof global

const db = globalThis.dbGlobal ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.dbGlobal = db

export { db }
