import { Injectable } from '@nestjs/common';
import { DateAmount } from './dto/service.dto';
import { SavingsOutputDTO, PrePostPaymentDTO, SavingsInputDTO, TaxDTO } from './dto/common.dto';

@Injectable()
export class SavingsService {
  calcPrePost(inputSavings: PrePostPaymentDTO) {
    // 납입 방식 구하기
    const monthArr: string[] = inputSavings.payMethod.split('-');
    // 납입 개월 수
    const monthCount: number = monthArr.length;

    const res: DateAmount[] = [];

    let interest: number = 0;
    let totalDay: number = inputSavings.period * 365;

    // Calc Payment date
    for (let i = 0; i < monthArr.length; i++) {
      // 각 월 별 금액 구하기.
      const monthTotalAmount = Number(monthArr[i]) * inputSavings.price;

      // 각 월 날짜 구하기
      let payMonth: Date;
      // 첫 달은 고정적으로 start date
      const { startDate } = inputSavings;
      if (i === 0) payMonth = startDate;
      else {
        payMonth = _addMonths(startDate, Number(monthArr[i]));
      }

      // 이자 구하기 ()
      switch (inputSavings.isSimple) {
        case true: {
          // 단리
        }
        case false: {
          // 복리
        }
      }

      const data: DateAmount = {
        paymentDate: payMonth,
        price: monthTotalAmount,
      };
      res.push(data);
    }

    return null;
  }

  // 예치금 이자
  calculateDeposits(savingsInputDTO: SavingsInputDTO): SavingsOutputDTO {
    const { period, price, rate } = savingsInputDTO;
    // 원금x연이율x월수/12
    const numericRate = parseFloat(rate);

    const total = Math.floor(price * ((numericRate / 100) * (period / 12)));
    const result: SavingsOutputDTO = {
      totalInterest: total,
      tax: _createTax(total),
    };
    return result;
  }
  calculateRegularSavings(savingsInputDTO: SavingsInputDTO): SavingsOutputDTO {
    let { period, price, rate, isSimple } = savingsInputDTO;

    const numericRate = parseFloat(rate);
    const monthlyInterestRate = numericRate / 100;
    let total: number = 0;

    if (isSimple) {
      for (let i = 0; i < period; i++) {
        const t = Math.floor(Math.round(price * monthlyInterestRate * ((period - i) / period)));
        total += t;
      }
    } else {
      // https://ourcalc.com/%ec%a0%81%eb%a6%bd%ec%8b%9d-%eb%b3%b5%eb%a6%ac-%ea%b3%84%ec%82%b0%ea%b8%b0/
      // 매월 초 적립하는 월복리 공식: 적립액×(1+연이자율/12)×{(1+연이자율/12)((적립연수×12) -1)승}/(연이자율ᅟ/12)
      const t = Math.floor(
        Math.round(
          price *
            (1 + monthlyInterestRate / 12) *
            ((Math.pow(1 + monthlyInterestRate / 12, period) - 1) / (monthlyInterestRate / 12)),
        ),
      );
      total = Math.floor(t - period * price);
    }

    const result: SavingsOutputDTO = {
      totalInterest: total,
      tax: _createTax(total),
    };
    return result;
  }
}

const _addMonths = (date: Date, months: number) => {
  date.setMonth(date.getMonth() + months);
  return date;
};

const _createTax = (totalInterest: number): TaxDTO => {
  return {
    taxFreeInterest: Math.floor(totalInterest),
    taxInterest2: Math.floor(totalInterest - totalInterest * 0.014),
    taxInterest: Math.floor(totalInterest - totalInterest * 0.095),
    taxGeneralInterest: Math.floor(totalInterest - totalInterest * 0.154),
  };
};
