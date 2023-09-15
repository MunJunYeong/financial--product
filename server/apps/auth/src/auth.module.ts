import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from './user/user.module';
import { CommonModule, ConfigurationModule } from 'libs';

@Module({
    // main.ts에서 config, common을 사용하고 있어서 추가. 그런데 calc에서는 import 했을 때 오류가 생기는데 auth에서는 생기지 않음.
    // 추후 확인해볼 것. 일관성을 위해서 넣어두긴 함.
    imports: [UserModule,  ConfigurationModule, CommonModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
