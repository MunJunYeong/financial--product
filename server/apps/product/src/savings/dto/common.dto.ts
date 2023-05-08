import { IsNumber, IsBoolean, IsString } from "class-validator";

export class SavingsDTO {
    @IsNumber()
    savings_idx: number
    @IsString()
    dcls_month: string // 출시일(년월)
    @IsString()
    fin_co_no: string // 회사 코드
    @IsString()
    fin_prdt_cd: string // 상품 코드
    @IsString()
    kor_co_nm: string // 은행 이름
    @IsString()
    fin_prdt_nm: string // 상품 이름
    @IsNumber()
    max_limit: number // 최대 납임 금액
}

export class SavingsOptionsDTO {
    @IsString()
    fin_prdt_cd: string // 상품 코드
    @IsString()
    intr_rate_type_nm: string // 저축 금리 유형 (단리, 복리)
    @IsString()
    rsrv_type_nm: string  // 적립 유형
    @IsString()
    save_trm: string // 저축 기간 [단위: 개월]
    @IsNumber()
    intr_rate: number // 저축 금리 [소수점 2자리]
    @IsNumber()
    intr_rate2: number // 최고 우대금리 [소수점 2자리]
    @IsNumber()
    savings_idx: number
}

export class InstallmentDTO {
    @IsNumber()
    installment_idx: number
    @IsString()
    dcls_month: string // 출시일(년월)
    @IsString()
    fin_co_no: string // 회사 코드
    @IsString()
    fin_prdt_cd: string // 상품 코드
    @IsString()
    kor_co_nm: string // 은행 이름
    @IsString()
    fin_prdt_nm: string // 상품 이름
    @IsNumber()
    max_limit: number // 최대 납임 금액
}

export class InstallmentOptionsDTO {
    @IsString()
    fin_prdt_cd: string // 상품 코드
    @IsString()
    intr_rate_type_nm: string // 저축 금리 유형 (단리, 복리)
    @IsString()
    rsrv_type_nm: string  // 적립 유형
    @IsString()
    save_trm: string // 저축 기간 [단위: 개월]
    @IsNumber()
    intr_rate: number // 저축 금리 [소수점 2자리]
    @IsNumber()
    intr_rate2: number // 최고 우대금리 [소수점 2자리]
    @IsNumber()
    installment_idx: number
}