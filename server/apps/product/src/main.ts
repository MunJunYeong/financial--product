import { NestFactory } from '@nestjs/core';
import { ProductModule } from './product.module';
import { HttpExceptionFilter } from '@app/common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(ProductModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3002);
}
bootstrap();
