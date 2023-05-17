import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { CalcModule } from './calc.module';
import { BaseAPIDocument } from './swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(CalcModule);

  // config를 바탕으로 swagger document 생성
  const config = new BaseAPIDocument().initializeOptions();
  const document = SwaggerModule.createDocument(app, config);
  // Swagger UI에 대한 path를 연결함
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
