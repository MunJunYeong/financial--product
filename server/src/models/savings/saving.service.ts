import { Injectable } from '@nestjs/common';
import { InputSavings } from './interfaces/input/saving.interface';

@Injectable()
export class SavingsService {
    getSavings(inputSavings: InputSavings){
        
        const monthArr: string[] = inputSavings.payMethod.split("-");
        const monthCount: number = monthArr.length;

        const res: DatePrice[] = []
        let interest: number = 0;
        let totalDay: number = inputSavings.period * 365;

        // Calc Payment date
        for (let i =0; i < monthArr.length; i++ ){
            // 각 월 별 금액 구하기.
            const total = Number(monthArr[i]) * inputSavings.price

            // 이자 구하기 ()
            switch (inputSavings.isSimple) {
                case true : { // 단리
                    
                }
                case false : { // 복리

                }
            }
            
            const data: DatePrice = {
                paymentDate : "temp",
                price : total // 날짜 계산 방법 ???
            }
            res.push(data)
        }



        console.log(res)

        return null;
    }

}

interface Result {
    datePrice: DatePrice[] 
    principal: number // 원금 합계
    beInterest: number // 세전 이자
    taxation : number // 이자 과세
    afInterest: number // 세후 이자
    totalMoney: number // 세후 수령액
}

interface DatePrice {
    paymentDate: string
    price: number
}