// vendor
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

// cus
import { ConfigurationModule, DatabaseModule } from 'libs';
import { UserProductsController } from './user_products.controller';
import { UserProductsRepo } from './user_products.repo';
import { UserProductsService } from './user_products.service';
import { UserRepo } from 'apps/auth/src/user/user.repo';

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
  providers: [UserProductsService, UserProductsRepo, UserRepo],
  exports: [UserProductsRepo],
})
export class UserProductsModule {}
