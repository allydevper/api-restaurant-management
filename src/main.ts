import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:4200', 'https://restaurant-management-production.up.railway.app'],
  });
  await app.listen(3000);
}
bootstrap();
