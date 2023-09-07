import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class OtpEnabledDTO {
  @ApiProperty({
    example: 'boolean',
  })
  @IsBoolean()
  otp_enabled: boolean;
}
