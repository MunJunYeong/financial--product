import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrepostModule } from './prepost/prepost.module';
import { ConfigurationModule, ConfigurationService } from 'libs';

@Module({
  imports: [PrepostModule, ConfigurationModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {
  constructor(
    private readonly configurationService: ConfigurationService
  ){}
  async onModuleInit() {
    console.log(this.configurationService.get('NODE_ENV'));
    console.log('1111111111');
  }
}
