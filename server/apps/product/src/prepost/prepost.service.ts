import { Injectable } from '@nestjs/common';
import { PrePostPayment } from './dto/common.dto';
import { DateAmount } from './dto/service.dto';

@Injectable()
export class PrepostService {
    calcPrePost(inputSavings: PrePostPayment){
        // 납입 방식 구하기
        const monthArr: string[] = inputSavings.payMethod.split("-");
        // 납입 개월 수
        const monthCount: number = monthArr.length;

        const res: DateAmount[] = []

        let interest: number = 0;
        let totalDay: number = inputSavings.period * 365;

        // Calc Payment date
        for (let i =0; i < monthArr.length; i++ ){
            // 각 월 별 금액 구하기.
            const monthTotalAmount = Number(monthArr[i]) * inputSavings.price

            // 각 월 날짜 구하기
            let payMonth: Date;
            // 첫 달은 고정적으로 start date
            const {startDate} = inputSavings;
            if(i === 0) payMonth = startDate;
            else {
                payMonth = addMonths(startDate, Number(monthArr[i]))
            }
            

            // 이자 구하기 ()
            switch (inputSavings.isSimple) {
                case true : { // 단리

                }
                case false : { // 복리

                }
            }

            const data: DateAmount = {
                paymentDate : payMonth,
                price : monthTotalAmount
            }
            console.log(data)
            res.push(data)
        }

        console.log(res)

        return null;
    }
}

function addMonths(date: Date, months: number) {
    date.setMonth(date.getMonth() + months);
    return date;
}

/*
    {
    "period" : 12,
    "payMethod" : "1-6-5",
    "price" : 500000,
    "rate" : 6,
    "isSimple" : true,
    "startDate" : "2022-01-01",
    "interest" : 0
}
*/