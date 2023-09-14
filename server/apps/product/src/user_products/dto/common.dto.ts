// vendor
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
export class ProductDTO {
  //
  @ApiProperty({ description: '상품 이름' })
  @IsString()
  name: string;

  //
  @ApiProperty({ description: '시작 날짜(2023-09-14)' })
  @IsString()
  start_date: string;

  //
  @ApiProperty({ description: '종료 날짜(2024-09-14)' })
  @IsString()
  finish_date: string;

  //
  @ApiProperty({ description: '기간' })
  @IsNumber()
  period: number;

  //
  @ApiProperty({ description: '이율' })
  @IsNumber()
  rate: number;

  //
  @ApiProperty({ description: '월 납입금' })
  @IsNumber()
  monthly_payment: number;

  //
  @ApiProperty({ description: '총 이자 금액' })
  @IsNumber()
  total_interest: number;

  //
  @ApiProperty({ description: 'savings | installment' })
  @IsString()
  type: string; // TODO: savings인지 뭐인지에 따라서 할 수 있는 interface 추가해야함.

  //
  @ApiProperty({ description: '이자 유형(단리 | 복리)' })
  @IsBoolean()
  is_simple: boolean;
}
