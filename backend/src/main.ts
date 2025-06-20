import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // ตั้งค่า CORS ก่อน - สำคัญมาก!
  app.enableCors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'], // ระบุ origin ที่ชัดเจน
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true
  });
  
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // ลบ field ที่ไม่ได้ define ใน DTO
    transform: true, // แปลง type อัตโนมัติ
    forbidNonWhitelisted: true // throw error ถ้ามี field ที่ไม่ได้ define
  }));
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: http://localhost:${process.env.PORT ?? 3000}`);

  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
}
bootstrap();