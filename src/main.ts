import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.setGlobalPrefix('api'); 
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.enableShutdownHooks();
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Server is running on port ${port}`);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Application is cors on: ${await process.env.CORS_ORIGIN}`);
}
bootstrap();
