"use client";

import { useState } from "react";
import { MethodologyNote } from "@/src/components/simulator/MethodologyNote";
import { ProrationForm } from "@/src/components/simulator/ProrationForm";
import { ProrationResults } from "@/src/components/simulator/ProrationResults";
import {
  calculateProrationApproximation,
  type ProrationInput,
} from "@/src/lib/calculate-proration-approximation";

const defaultInput: ProrationInput = {
  oldPriceMonthly: 20,
  newPriceMonthly: 50,
  cycleDays: 30,
  changeDay: 12,
};

export function ProrationCalculator() {
  const [input, setInput] = useState<ProrationInput>(defaultInput);
  const calculation = calculateProrationApproximation(input);

  return (
    <section className="space-y-6">
      <ProrationForm value={input} onChange={setInput} />
      <ProrationResults input={input} calculation={calculation} />
      <MethodologyNote />
    </section>
  );
}
