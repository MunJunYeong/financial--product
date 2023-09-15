import { Module } from '@nestjs/common';
import { ConfigurationService } from '@app/configuration';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from './jwt.service';
import { CommonModule, CommonService } from '@app/common';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            inject: [ConfigurationService, CommonService],
            useFactory: async (config: ConfigurationService, common: CommonService) => ({
                secret: config.get<string>(common.Configs.JWT_SECRET),
                signOptions: { expiresIn: '60s' },
            }),
        }),
    ],
    providers: [JwtService],
    exports: [PassportModule, JwtModule, JwtService],
})
export class JwtAuthModule {}
