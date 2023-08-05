import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { SavingsModule } from './savings/savings.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from '@app/common/filters/http-exception.filter';
import { UserProductsModule } from './user_products/user_products.module';

@Module({
  imports: [SavingsModule, UserProductsModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class ProductModule {
  constructor() // @Inject('SCHE') private readonly schedulingService: SchedulingService // private readonly configurationService: ConfigurationService,
  {}

  async onModuleInit() {
    //   // test
    //   console.log(this.configurationService.get('NODE_ENV'));
    //   console.log(this.configurationService.get('DB_PASSWORD'));
    //   // this.schedulingService.startScheduling();
  }
  onApplicationBootstrap() {
    // this.schedulingService.startScheduling();
  }
}
