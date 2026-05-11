// Esta es la formula implementada para la amortización
// PMT = P * [ r(1+r)^n ] / [ (1+r)^n - 1 ]

export const calculateCredit = ({
  vehicleType,
  vehicleValue,
  initialFee,
  months,
}) => {
  const vehiclePrice = Number(vehicleValue);
  const downPayment = Number(initialFee);
  const totalMonths = Number(months);

  const financedAmount = vehiclePrice - downPayment;

  const interestRate = vehicleType === "bike" ? 0.015 : 0.02;

  const monthlyPayment =
    (financedAmount *
      (interestRate * Math.pow(1 + interestRate, totalMonths))) /
    (Math.pow(1 + interestRate, totalMonths) - 1);

  const totalPayment = monthlyPayment * totalMonths;

  const totalInterest = totalPayment - financedAmount;

  let remainingBalance = financedAmount;

  const schedule = [];

  for (let month = 1; month <= totalMonths; month++) {
    const interest = remainingBalance * interestRate;

    const capitalPayment = monthlyPayment - interest;

    remainingBalance -= capitalPayment;

    schedule.push({
      month,
      payment: monthlyPayment,
      interest,
      capital: capitalPayment,
      balance: remainingBalance > 0 ? remainingBalance : 0,
    });
  }

  return {
    financedAmount,
    monthlyPayment,
    totalInterest,
    totalPayment,
    schedule,
  };
};
