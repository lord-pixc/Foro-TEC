import { PrismaClient } from './generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

function getDatabaseUrl() {
    const databaseUrl = process.env.DATABASE_URL

    if (!databaseUrl) {
        throw new Error(
            'Missing required environment variable: DATABASE_URL. Set DATABASE_URL before starting the API.'
        )
    }

    return databaseUrl
}

function createPrismaClient() {
    const adapter =
        globalThis.adapterGlobal ??
        new PrismaPg({ connectionString: getDatabaseUrl() })
    return new PrismaClient({ adapter })
}

declare const globalThis: {
    dbGlobal: ReturnType<typeof createPrismaClient>
    adapterGlobal: PrismaPg
} & typeof global

const db = globalThis.dbGlobal ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.dbGlobal = db

export { db }
