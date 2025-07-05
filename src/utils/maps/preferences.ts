import { $Enums, Preferences as GQLPreferences } from "@prisma/client";
import { CreatePreferencesInput, Preferences } from "../../preferences/types";
import {
  DrinkType,
  MilkStrength,
  SweetenerType,
} from "../../preferences/gql/preferences-gen.gql";

export function mapPreferencesFromPrisma(
  p: GQLPreferences | null | undefined,
): Preferences | undefined {
  if (!p) {
    return undefined;
  }

  return {
    id: p.id,
    userId: p.userId,
    drinkType: p.drinkType as DrinkType,
    sweetenerType: p.sweetenerType as SweetenerType,
    sugarAmount: p.sugarAmount,
    milkStrength: p.milkStrength as MilkStrength,
    notes: p.notes ?? undefined,
  };
}

export function mapPreferencesToPrisma(input: CreatePreferencesInput) {
  return {
    userId: input.userId,
    drinkType: input.drinkType as $Enums.DrinkType,
    sweetenerType: input.sweetenerType as $Enums.SweetenerType,
    sugarAmount: input.sugarAmount ?? 0,
    milkStrength: input.milkStrength as $Enums.MilkStrength,
    notes: input.notes,
  };
}
