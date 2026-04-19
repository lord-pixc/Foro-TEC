import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { db } from './prisma/db'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
