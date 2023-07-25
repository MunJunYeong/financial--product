import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigurationModule, DatabaseModule } from 'libs';
import { HttpModule } from '@nestjs/axios';
import { UserRepo } from './user.repo';

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
  ],
  controllers: [UserController],
  providers: [UserService, UserRepo],
  exports: [UserRepo],
})
export class UserModule {}
