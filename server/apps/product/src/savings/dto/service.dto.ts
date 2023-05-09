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
  @IsString()
  dcls_month: string;
  @IsString()
  kor_co_nm: string;
  @IsString()
  fin_prdt_nm: string;
  @IsNumber()
  max_limit: number;
  @IsString()
  intr_rate_type_nm: string;
  @IsString()
  rsrv_type_nm: string;
  @IsString()
  save_trm: string;
  @IsDecimal({ decimal_digits: '1,2' })
  intr_rate: string; // 저축 금리 [소수점 2자리]
  @IsDecimal({ decimal_digits: '1,2' })
  intr_rate2: string; // 최고 우대금리 [소수점 2자리]
}
