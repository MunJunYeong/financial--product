import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigurationModule, DatabaseModule, MiddlewareService } from 'libs';
import { HttpModule } from '@nestjs/axios';
import { UserRepo } from './user.repo';
import { JwtAuthModule } from '@app/jwt';

@Module({
  imports: [
    ConfigurationModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
    DatabaseModule,
    JwtAuthModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepo],
  exports: [UserRepo],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MiddlewareService)
      .forRoutes({ path: 'user/authenticate', method: RequestMethod.GET });
  }
}
