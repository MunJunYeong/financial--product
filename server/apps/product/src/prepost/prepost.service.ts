import { Injectable } from '@nestjs/common';
import { PrePostPayment } from './dto/common.dto';
import { DatePrice } from './dto/service.dto';

@Injectable()
export class PrepostService {
  
  calcPrePost(inputSavings: PrePostPayment){

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
