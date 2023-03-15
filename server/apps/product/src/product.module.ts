import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrepostModule } from './prepost/prepost.module';
import { ConfigurationModule, ConfigurationService, DatabaseModule } from 'libs';
import { SavingsModule } from './savings/savings.module';

@Module({
  imports: [PrepostModule, ConfigurationModule, DatabaseModule, SavingsModule, PrepostModule],
  controllers: [ProductController],
  providers: [ProductService],
})

export class ProductModule {
  constructor(
    private readonly configurationService: ConfigurationService
  ){}
  
  async onModuleInit() {
    // test
    console.log(this.configurationService.get('NODE_ENV'));
    console.log(this.configurationService.get('DB_PASSWORD'));
  }
}
