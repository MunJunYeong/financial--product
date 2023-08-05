import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigurationModule, DatabaseModule } from 'libs';
import { UserProductsController } from './user_products.controller';
import { UserProductsRepo } from './user_products.repo';
import { UserProductsService } from './user_products.service';

@Module({
  imports: [
    ConfigurationModule,
    // TODO: HttpModule - Axios module & service seperate
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    DatabaseModule,
  ],
  controllers: [UserProductsController],
  providers: [UserProductsService, UserProductsRepo],
  exports: [UserProductsRepo],
})
export class UserProductsModule {}
