import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AuthModule } from './auth.module';
import { SwaggerConfig } from './swagger.config';
import { HttpExceptionFilter } from '@app/common/filters/http-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AuthModule);
    // Enable CORS
    app.enableCors();

    // Use the swagger configuration
    SwaggerConfig.setupSwagger(app);

    app.useGlobalFilters(new HttpExceptionFilter());

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );


    await app.listen(8087);
}
bootstrap();