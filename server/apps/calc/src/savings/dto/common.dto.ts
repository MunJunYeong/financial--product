import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
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
    @ApiProperty({ description: '예치 총 금액(100000)' })
    @IsNumber()
    totalAmount: number;

    @ApiProperty({ description: '일반(15.4) 세후 이자' })
    @IsNumber()
    generalInterest: number;

    @ApiProperty({ description: '세금우대 (9.5%)	 세후 이자' })
    @IsNumber()
    taxPreferentialInterest: number;

    @ApiProperty({ description: '세금우대 (1.4%) 세후 이자' })
    @IsNumber()
    taxPreferentialInterest2: number;

    @ApiProperty({ description: '비과세 (0%)' })
    @IsNumber()
    taxFreeInterest: number;
}

export class TaxDTO {
    @ApiProperty({ description: '세금 일반 (15.4%)	 세후 이자' })
    @IsNumber()
    taxGeneralInterest: number;

    @ApiProperty({ description: '세금우대 (9.5%)	 세후 이자' })
    @IsNumber()
    taxInterest: number;

    @ApiProperty({ description: '세금우대 (1.4%) 세후 이자' })
    @IsNumber()
    taxInterest2: number;

    @ApiProperty({ description: '비과세 (0%)' })
    @IsNumber()
    taxFreeInterest: number;
}

// 정기적금, 예금예치
export class SavingsInputDTO {
    @ApiProperty({ description: '예치 기간(월)' })
    @IsNumber()
    @Type(() => Number)
    period: number;

    @ApiProperty({ description: '예치 금액' })
    @Type(() => Number)
    @IsNumber()
    price: number;

    @ApiProperty({ description: '이자율' })
    @IsString()
    rate: string;

    @ApiProperty({ description: '단리 true, 복리 false' })
    @IsBoolean()
    @Transform(({ value }) => value === 'true')
    isSimple: boolean;
}

export class SavingsOutputDTO {
    @ApiProperty({ description: '총 이자' })
    @IsNumber()
    totalInterest: number;

    @ApiProperty({
        // 추가type: TaxDTO,
    })
    tax: TaxDTO;
}
