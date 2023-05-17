import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class BaseAPIDocument {
  public builder = new DocumentBuilder();
  
  public initializeOptions() {
    return this.builder
    	.setTitle('Calculate API')
    	.setDescription('적금 금리, 선납이연 계산기 API description')
    	.setVersion('1.0.0')
    	// .addTag('swagger')
    	.build();
  }
}