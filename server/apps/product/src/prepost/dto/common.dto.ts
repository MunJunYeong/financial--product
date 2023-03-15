import { Type } from 'class-transformer';
import { IsNumber, IsBoolean, IsString, IsDate } from "class-validator";

// prepayment
export class PrePostPayment {
    @IsNumber()
    period: number // 적금 기간

    @IsString()
    payMethod: string // 납입방식

    @IsNumber()
    price: number // 월 납입액

    @IsNumber()
    rate: number // 금리

    @IsBoolean()
    isSimple: boolean //  true : 단리,   false : 복리

    @Type(()=> Date)
    @IsDate()
    startDate: Date // 가입 일

    @IsNumber()
    interest: number // 이자세율
}