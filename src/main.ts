import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RolesGuard } from './roles/role.guard';
import * as dotenv from 'dotenv';

async function bootstrap() {
  // Chargement des fichiers '.env'.
  dotenv.config();

  // Chargement de l'application
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new RolesGuard(reflector));
  await app.listen(8000);
}
bootstrap();
