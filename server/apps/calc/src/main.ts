import { NestFactory } from '@nestjs/core';
import { CalcModule } from './calc.module';
import { SwaggerConfig } from './swagger.config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@app/common/filters/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(CalcModule);
    // Enable CORS
    app.enableCors();

    // set swagger
    const swagger = new SwaggerConfig(app);
    swagger.initialize();
    swagger.serveUI('/api');
    swagger.serveYaml('/api-yaml');

    // set filters & pipes
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    await app.listen(8088);
}
bootstrap();
