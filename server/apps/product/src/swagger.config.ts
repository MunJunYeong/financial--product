import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class BaseAPIDocument {
    public builder = new DocumentBuilder();

    public initializeOptions() {
        return (
            this.builder
                .setTitle('Product API')
                .setDescription('예적금 상품 API description')
                .setVersion('1.0.0')
                // .addTag('swagger')
                .build()
        );
    }
}
