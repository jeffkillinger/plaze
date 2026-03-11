export type ProrationInput = {
  oldPriceMonthly: number;
  newPriceMonthly: number;
  cycleDays: number;
  changeDay: number;
};

export type ProrationResult = {
  daysUsed: number;
  daysRemaining: number;
  oldDailyRate: number;
  newDailyRate: number;
  unusedOldPlanCredit: number;
  remainingNewPlanCharge: number;
  netProrationAmount: number;
  changeDirection: "upgrade" | "downgrade" | "no_change";
  resultType: "amount_due" | "credit" | "even";
};

export type ProrationCalculationResult =
  | {
      ok: true;
      result: ProrationResult;
    }
  | {
      ok: false;
      message: string;
    };

export function calculateProrationApproximation(
  input: ProrationInput,
): ProrationCalculationResult {
  const { oldPriceMonthly, newPriceMonthly, cycleDays, changeDay } = input;

  if (
    cycleDays <= 0 ||
    changeDay < 0 ||
    oldPriceMonthly < 0 ||
    newPriceMonthly < 0
  ) {
    return {
      ok: false,
      message:
        "Enter non-negative prices, a positive cycle length, and a change day within the billing cycle.",
    };
  }

  const daysUsed = changeDay;
  const daysRemaining = cycleDays - changeDay;

  if (daysRemaining <= 0 || changeDay >= cycleDays) {
    return {
      ok: false,
      message:
        "Plan changes at the very end of the billing cycle do not create prorations in this simplified model.",
    };
  }

  const oldDailyRate = oldPriceMonthly / cycleDays;
  const newDailyRate = newPriceMonthly / cycleDays;
  const unusedOldPlanCredit = oldDailyRate * daysRemaining;
  const remainingNewPlanCharge = newDailyRate * daysRemaining;
  const netProrationAmount =
    remainingNewPlanCharge - unusedOldPlanCredit;

  let changeDirection: ProrationResult["changeDirection"] = "no_change";
  if (newPriceMonthly > oldPriceMonthly) {
    changeDirection = "upgrade";
  } else if (newPriceMonthly < oldPriceMonthly) {
    changeDirection = "downgrade";
  }

  let resultType: ProrationResult["resultType"] = "even";
  if (netProrationAmount > 0) {
    resultType = "amount_due";
  } else if (netProrationAmount < 0) {
    resultType = "credit";
  }

  return {
    ok: true,
    result: {
      daysUsed,
      daysRemaining,
      oldDailyRate,
      newDailyRate,
      unusedOldPlanCredit,
      remainingNewPlanCharge,
      netProrationAmount,
      changeDirection,
      resultType,
    },
  };
}
