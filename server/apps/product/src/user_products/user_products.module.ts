// vendor
import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

// cus
import { ConfigurationModule, DatabaseModule, MiddlewareModule, MiddlewareService } from 'libs';
import { UserProductsController } from './user_products.controller';
import { UserProductsRepo } from './user_products.repo';
import { UserProductsService } from './user_products.service';
import { UserRepo } from 'apps/auth/src/user/user.repo';
import { JwtAuthModule } from '@app/jwt';

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
    MiddlewareModule,
    JwtAuthModule
  ],
  controllers: [UserProductsController],
  providers: [UserProductsService, UserProductsRepo, UserRepo],
  exports: [UserProductsRepo],
})
export class UserProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddlewareService)
      .forRoutes(UserProductsController);
  }
}
