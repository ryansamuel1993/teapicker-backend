import { DrinkType, MilkStrength, SweetenerType } from "@prisma/client";

export const DEFAULT_RATING = 0;
export const DEFAULT_PREFERENCES = {
  drinkType: DrinkType.TEA,
  sweetenerType: SweetenerType.SUGAR,
  sugarAmount: 0,
  milkStrength: MilkStrength.MEDIUM,
  notes: "",
};
export type Pagination = {
  take: number;
  skip: number;
};

export const DEFAULT_RATING_PAGINATION: Pagination = {
  take: 0,
  skip: 5,
};
