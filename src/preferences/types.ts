import {
  DrinkType,
  MilkStrength,
  SweetenerType,
} from "./gql/preferences-gen.gql";

export type CreatePreferencesInput = {
  userId: string;
  drinkType: DrinkType;
  sweetenerType: SweetenerType;
  sugarAmount: number;
  milkStrength: MilkStrength;
  notes?: string;
};

export type UpdatePreferencesInput = CreatePreferencesInput;

export type Preferences = {
  id: string;
  userId: string;
  drinkType: DrinkType;
  sweetenerType?: SweetenerType;
  sugarAmount?: number;
  milkStrength?: MilkStrength;
  notes?: string;
};
