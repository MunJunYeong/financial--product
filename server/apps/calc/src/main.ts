import { NestFactory } from '@nestjs/core';
import { CalcModule } from './calc.module';

async function bootstrap() {
  const app = await NestFactory.create(CalcModule);
  await app.listen(3001);
}
bootstrap();
