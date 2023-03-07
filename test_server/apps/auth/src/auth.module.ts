import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from './user/user.module';
import { LibModule } from '../../../libs/libs.module';

@Module({
  imports: [UserModule, LibModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
