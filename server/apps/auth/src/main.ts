import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AuthModule } from './auth.module';
import { SwaggerConfig } from './swagger.config';
import { HttpExceptionFilter } from '@app/common/filters/http-exception.filter';
import { CommonService, ConfigurationService } from 'libs';

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

    const config = app.get(ConfigurationService);
    const common = app.get(CommonService);
    await app.listen(config.get<string>(common.Configs.AUTH_PORT));
}
bootstrap();
