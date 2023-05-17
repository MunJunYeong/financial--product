import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDecimal } from 'class-validator';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class OptionDTO {
  @IsString()
  fin_prdt_cd: string; // 상품 코드
  @IsString()
  intr_rate_type_nm: string; // 저축 금리 유형 (단리, 복리)
  // Savings에만 존재. Installment에서는 null
  @IsString()
  rsrv_type_nm: string; // 적립 유형
  @IsString()
  save_trm: string; // 저축 기간 [단위: 개월]
  @IsDecimal({ decimal_digits: '1,2' })
  intr_rate: string; // 저축 금리 [소수점 2자리]
  @IsDecimal({ decimal_digits: '1,2' })
  intr_rate2: string; // 최고 우대금리 [소수점 2자리]
}

export class ProductWithOptionDTO {
  //
  @ApiProperty({
    example: '202304',
    description: '발행년월',
  })
  @IsString()
  dcls_month: string;

  //
  @ApiProperty({
    example: '우리은행',
    description: '은행 이름',
  })
  @IsString()
  kor_co_nm: string;

  //
  @ApiProperty({
    example: '우리SUPER주거래적금',
    description: '상품 이름',
  })
  @IsString()
  fin_prdt_nm: string;

  //
  @ApiProperty({
    example: '500000',
    description: '월 최대 납입 금액',
  })
  @IsNumber()
  max_limit: number;

  //
  @ApiProperty({
    example: '단리 | 복리',
    description: '이자 유형',
  })
  @IsString()
  intr_rate_type_nm: string;

  //
  @ApiProperty({
    example: '자유적립식 | 정액정립식',
    description: '적립 유형',
  })
  @IsString()
  rsrv_type_nm: string;

  //
  @ApiProperty({
    example: '12',
    description: '적금 기간',
  })
  @IsString()
  save_trm: string;

  //
  @ApiProperty({
    example: '4',
    description: '금리',
  })
  @IsDecimal({ decimal_digits: '1,2' })
  intr_rate: string; // 저축 금리 [소수점 2자리]

  //
  @ApiProperty({
    example: '4.5',
    description: '최대 금리',
  })
  @IsDecimal({ decimal_digits: '1,2' })
  intr_rate2: string; // 최고 우대금리 [소수점 2자리]
}
