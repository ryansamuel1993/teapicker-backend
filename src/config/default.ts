import { DrinkType, MilkStrength, SweetenerType } from "@prisma/client";

export const DEFAULT_PREFERENCES = {
  drinkType: DrinkType.TEA,
  sweetenerType: SweetenerType.SUGAR,
  sugarAmount: 0,
  milkStrength: MilkStrength.MEDIUM,
  notes: "",
};
