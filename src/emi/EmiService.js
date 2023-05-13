export function calculate(inputObj) {
  let chRate = inputObj.interestRate / 12 / 100;
  let months = inputObj.year ? inputObj.year * 12 : 0;
  months += inputObj.month ? parseInt(inputObj.month) : 0;
  let emi = (
    (inputObj.loanAmount * chRate * (1 + chRate) ** months) /
    ((1 + chRate) ** months - 1)
  ).toFixed(2);
  let totalPayment = (emi * months).toFixed(2);
  let interest = (totalPayment - inputObj.loanAmount).toFixed(2);
  emi = emi == "Infinity" ? 0 : emi;
  inputObj.emi = emi == "NaN" ? 0 : emi;
  inputObj.loanPeriod = months;
  inputObj.loanAmount = inputObj.loanAmount;
  inputObj.interestPayable = interest === "NaN" ? 0 : interest;
  inputObj.totalPayment = totalPayment == "NaN" ? 0 : totalPayment;
  inputObj.disabledMoreDetails = emi > 0 ? false : true;
  return inputObj;
}

export function calculateEMIDetails(loanAmount, interestRate, tenureInMonths) {
  return new Promise((resolve) => {
    console.log("inside details", loanAmount, interestRate, tenureInMonths);
    const monthlyInterestRate = interestRate / 12 / 100;
    const emi =
      (loanAmount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, tenureInMonths)) /
      (Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1);

    const details = [];
    let remainingBalance = loanAmount;

    for (let month = 1; month <= tenureInMonths; month++) {
      const interest = remainingBalance * monthlyInterestRate;
      const principal = emi - interest;
      remainingBalance -= principal;

      details.push({
        month: month,
        interest: interest.toFixed(2),
        principal: principal.toFixed(2),
        totalPayable: emi.toFixed(2),
        balance: remainingBalance.toFixed(2),
      });
    }
    resolve(details); // Resolve the promise with the details array
  });
}
