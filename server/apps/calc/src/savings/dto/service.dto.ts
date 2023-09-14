import { IsNumber, IsBoolean, IsString, IsDate } from 'class-validator';

// 선납이연 결과
export class PrePostPaymentResult {
    dateAmout: DateAmount[];
    @IsNumber()
    principal: number; // 원금 합계
    @IsNumber()
    beInterest: number; // 세전 이자
    @IsNumber()
    taxation: number; // 이자 과세
    @IsNumber()
    afInterest: number; // 세후 이자
    @IsNumber()
    totalMoney: number; // 세후 수령액
}

// 선납이연 납부 월액
export class DateAmount {
    @IsDate()
    paymentDate: Date;

    @IsNumber()
    price: number;
}
