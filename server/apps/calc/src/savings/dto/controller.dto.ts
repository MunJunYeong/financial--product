import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDecimal, IsNumber } from 'class-validator';

// free savings DTO
export class FreeSavingsInputDTO {
  @ApiProperty({
    example: '100000',
    description: '예치 총 금액',
  })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({
    example: '12',
    description: '예치 기간',
  })
  @IsNumber()
  duration: number;

  @ApiProperty({
    example: '4.2',
    description: '금리',
  })
  @IsDecimal({ decimal_digits: '1,2' })
  rate: string; // 최고 우대금리 [소수점 2자리]
}