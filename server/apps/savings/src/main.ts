import { NestFactory } from '@nestjs/core';
import { SavingsModule } from './savings.module';

async function bootstrap() {
  const app = await NestFactory.create(SavingsModule);
  await app.listen(3000);
}
bootstrap();
