import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


// TYPEORM config 구조로 한 번 짜보기
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
