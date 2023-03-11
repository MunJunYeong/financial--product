import { IsNumber, IsBoolean, IsString } from "class-validator";

// prepayment
export class PrePostPayment {
    @IsNumber()
    period: number

    @IsString()
    payMethod: string

    @IsNumber()
    price: number

    @IsNumber()
    rate: number // 금리

    @IsBoolean()
    isSimple: boolean //  true : 단리,   false : 복리

    @IsString() 
    startData: string // 가입 일

    @IsNumber()
    interest: number // 이자세율

    /*
    {
        "period" : 12,
        "payMethod" : "1-6-5",
        "price" : 500000,
        "rate" : 6,
        "isSimple" : true,
        "startData" : "2023-01-01",
        "interest" : 0
    }
    */
}