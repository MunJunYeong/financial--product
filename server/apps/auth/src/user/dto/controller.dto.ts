import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class OtpEnabledDTO {
    @ApiProperty({ description: 'otp 활성화 여부' })
    @IsBoolean()
    otp_enabled: boolean;
}

export class TokenDTO {
    @ApiProperty({ description: 'refresh token' })
    @IsString()
    refresh_token: string;
}
