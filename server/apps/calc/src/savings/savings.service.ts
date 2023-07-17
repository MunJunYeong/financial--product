import { Injectable } from '@nestjs/common';
import { DateAmount } from './dto/service.dto';
import { DepositInputDTO, DepositOutputDTO, PrePostPaymentDTO } from './dto/common.dto';

@Injectable()
export class SavingsService {
    calcPrePost(inputSavings: PrePostPaymentDTO){
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
                payMonth = _addMonths(startDate, Number(monthArr[i]))
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

    // 예치금 이자
    calculateDeposits(depositInputDTO: DepositInputDTO): DepositOutputDTO{
        console.log(depositInputDTO)
        const {period, price, rate} = depositInputDTO
        // 원금x연이율x월수/12
        const numericRate = parseFloat(rate);
        
        const total = (price*numericRate*(period/12))

        const result: DepositOutputDTO = {
            totalInterest: total,
            tax : {
                taxFreeInterest: total,
                taxGeneralInterest: (total - (total*0.154)),
                taxInterest: (total - (total*0.94)),
                taxInterest2: (total - (total*0.014)),
            }
        }
        return result
    }
}

function _addMonths(date: Date, months: number) {
    date.setMonth(date.getMonth() + months);
    return date;
}