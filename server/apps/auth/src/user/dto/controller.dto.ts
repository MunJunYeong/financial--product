import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class OtpEnabledDTO {
  @ApiProperty({
    example: 'boolean',
  })
  @IsBoolean()
  otp_enabled: boolean;
}

export class TokenDTO {
  @ApiProperty({
    example: 'string',
  })
  @IsString()
  refresh_token: string;
}
