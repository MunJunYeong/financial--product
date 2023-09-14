import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDecimal } from 'class-validator';
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export class OptionDTO {
    //
    @ApiProperty({ description: '상품 코드(1111)' })
    @IsString()
    fin_prdt_cd: string;

    //
    @ApiProperty({ description: '이자 유형(단리 | 복리)' })
    @IsString()
    intr_rate_type_nm: string;

    // Savings(적금)에만 존재. Installment에서는 null
    @ApiProperty({ description: '적립 유형(자유적립식 | 정액정립식)' })
    @IsString()
    rsrv_type_nm: string;

    //
    @ApiProperty({ description: '적금 기간(12)' })
    @IsString()
    save_trm: string;

    //
    @ApiProperty({ description: '금리(4)' })
    @IsDecimal({ decimal_digits: '1,2' })
    intr_rate: string;

    //
    @ApiProperty({ description: '최대 금리(4.5)' })
    @IsDecimal({ decimal_digits: '1,2' })
    intr_rate2: string;
}

export class ProductWithOptionDTO {
    //
    @ApiProperty({ description: '발행년월(202304)' })
    @IsString()
    dcls_month: string;

    //
    @ApiProperty({ description: '은행 이름(우리은행)' })
    @IsString()
    kor_co_nm: string;

    //
    @ApiProperty({ description: '상품 이름(우리SUPER주거래적금)' })
    @IsString()
    fin_prdt_nm: string;

    //
    @ApiProperty({ description: '상품 코드(1111)' })
    @IsString()
    fin_prdt_cd: string;

    //
    @ApiProperty({ description: '월 최대 납입 금액(500000)' })
    @IsNumber()
    max_limit: number;

    //
    @ApiProperty({ description: '이자 유형(단리 | 복리)' })
    @IsString()
    intr_rate_type_nm: string;

    //
    @ApiProperty({ description: '적립 유형(자유적립식 | 정액정립식)' })
    @IsString()
    rsrv_type_nm: string;

    //
    @ApiProperty({ description: '적금 기간(12)' })
    @IsString()
    save_trm: string;

    //
    @ApiProperty({ description: '금리(4)' })
    @IsDecimal({ decimal_digits: '1,2' })
    intr_rate: string;

    //
    @ApiProperty({ description: '최대 금리(4.5)' })
    @IsDecimal({ decimal_digits: '1,2' })
    intr_rate2: string;
}
