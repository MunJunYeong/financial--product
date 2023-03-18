import { IsNumber, IsBoolean, IsString } from "class-validator";

export class SavingsDTO {
    dcls_month: string // 출시일(년월)
    fin_co_no: string // 회사 코드
    fin_prdt_cd: string // 상품 코드
    kor_co_nm: string // 은행 이름
    fin_prdt_nm: string // 상품 이름
    max_limit: number // 최대 납임 금액
}

export class SavingsOptionsDTO {
    fin_prdt_cd: string // 상품 코드
    intr_rate_type_nm: string // 저축 금리 유형 (단리, 복리)
    rsrv_type_nm: string  // 적립 유형
    save_trm: string // 저축 기간 [단위: 개월]
    intr_rate: number // 저축 금리 [소수점 2자리]
    intr_rate2: number // 최고 우대금리 [소수점 2자리]
}