const _createTax = (totalInterest) => {
  return {
    taxFreeInterest: Math.floor(totalInterest),
    taxInterest2: Math.floor(totalInterest - totalInterest * 0.014),
    taxInterest: Math.floor(totalInterest - totalInterest * 0.095),
    taxGeneralInterest: Math.floor(totalInterest - totalInterest * 0.154),
  };
};

// const _addMonths = (date, months) => {
//   date.setMonth(date.getMonth() + months);
//   return date;
// };

// 정기적금 계산
/**
 * @param {Object} data
 * @param {number} data.period
 * @param {number} data.price
 * @param {string} data.rate
 * @param {boolean} data.isSimple
 */
const calculateSavings = (data) => {
  let { period, price, rate, isSimple } = data;

  console.log(data)
  const numericRate = parseFloat(rate);
  const monthlyInterestRate = numericRate / 100;
  let total = 0;

  if (isSimple) {
    for (let i = 0; i < period; i++) {
      const t = Math.floor(
        Math.round(price * monthlyInterestRate * ((period - i) / period))
      );
      total += t;
    }
  } else {
    // https://ourcalc.com/%ec%a0%81%eb%a6%bd%ec%8b%9d-%eb%b3%b5%eb%a6%ac-%ea%b3%84%ec%82%b0%ea%b8%b0/
    // 매월 초 적립하는 월복리 공식: 적립액×(1+연이자율/12)×{(1+연이자율/12)((적립연수×12) -1)승}/(연이자율ᅟ/12)
    const t = Math.floor(
      Math.round(
        price *
          (1 + monthlyInterestRate / 12) *
          ((Math.pow(1 + monthlyInterestRate / 12, period) - 1) /
            (monthlyInterestRate / 12))
      )
    );
    total = Math.floor(t - period * price);
  }

  return {
    totalInterest: total,
    ..._createTax(total),
  };
};

// 예금 이자
/**
 * @param {Object} data
 * @param {number} data.period
 * @param {number} data.price
 * @param {string} data.rate
 * @param {boolean} data.isSimple
 */
const calculateDeposits = (data) => {
  const { period, price, rate } = data;
  // 원금x연이율x월수/12
  const numericRate = parseFloat(rate);

  // TODO: 예금 이자 계산할 때 단리, 복리 계산 방법 넣기
  const total = Math.floor(price * ((numericRate / 100) * (period / 12)));

  return {
    totalInterest: total,
    ..._createTax(total),
  };
};

export { calculateSavings, calculateDeposits };
