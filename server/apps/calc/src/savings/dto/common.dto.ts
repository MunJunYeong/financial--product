import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsBoolean, IsString, IsDate } from 'class-validator';

// 선납이연
export class PrePostPaymentDTO {
  @IsNumber()
  period: number; // 적금 기간

  @IsString()
  payMethod: string; // 납입방식

  @IsNumber()
  price: number; // 월 납입액

  @IsNumber()
  rate: number; // 금리

  @IsBoolean()
  isSimple: boolean; //  true : 단리,   false : 복리

  @Type(() => Date)
  @IsDate()
  startDate: Date; // 가입 일

  @IsNumber()
  interest: number; // 이자세율
}

// 자유 적립
export class CalcSavingsOutputDTO {
  @ApiProperty({
    example: '100000',
    description: '예치 총 금액',
  })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({
    example: '83754',
    description: '일반(15.4) 세후 이자',
  })
  @IsNumber()
  generalInterest: number;
  
  @ApiProperty({
    example: '89595',
    description: '세금우대 (9.5%)	 세후 이자',
  })
  @IsNumber()
  taxPreferentialInterest: number;

  @ApiProperty({
    example: '97614',
    description: '세금우대 (1.4%) 세후 이자',
  })
  @IsNumber()
  taxPreferentialInterest2: number;
  
  @ApiProperty({
    example: '99000',
    description: '비과세 (0%)',
  })
  @IsNumber()
  taxFreeInterest: number;
}

// 예금 예치
export class DepositInputDTO {
  @ApiProperty({
    example: 'number',
    description: '예치 기간',
  })
  @IsNumber()
  period: number;

  @ApiProperty({
    example: 'number',
    description: '예치 금액',
  })
  @IsString()
  price: number;

  @ApiProperty({
    example: 'string',
    description: '이자율',
  })
  @IsString()
  rate: string;
}


export class TaxDTO {
  @ApiProperty({
    example: 'number',
    description: '세금 일반 (15.4%)	 세후 이자',
  })
  @IsNumber()
  taxGeneralInterest: number;

  @ApiProperty({
    example: 'number',
    description: '세금우대 (9.5%)	 세후 이자',
  })
  @IsNumber()
  taxInterest: number;

  @ApiProperty({
    example: 'number',
    description: '세금우대 (1.4%) 세후 이자',
  })
  @IsNumber()
  taxInterest2: number;
  
  @ApiProperty({
    example: 'number',
    description: '비과세 (0%)',
  })
  @IsNumber()
  taxFreeInterest: number;
}

export class DepositOutputDTO{
  @ApiProperty({
    example: 'number',
    description: '총 이자',
  })
  @IsNumber()
  totalInterest: number;

  @ApiProperty({     // 추가
    type: TaxDTO,    
  })
  tax: TaxDTO
}
