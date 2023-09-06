import { Module } from '@nestjs/common';
import { ConfigurationService } from '@app/configuration';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtService } from './jwt.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigurationService],
      useFactory: async (configService: ConfigurationService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  providers: [JwtService],
  exports: [PassportModule, JwtModule, JwtService],
})
export class JwtAuthModule {}

