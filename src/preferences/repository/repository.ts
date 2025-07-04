import { PrismaClient, $Enums } from "@prisma/client";
import {
  CreatePreferencesInput,
  Preferences,
  UpdatePreferencesInput,
} from "../types";
import {
  DrinkType,
  SweetenerType,
  MilkStrength,
} from "../gql/preferences-gen.gql";
import { convertNullToUndefined } from "../../utils/map";

export interface IPreferencesRepository {
  createPreferences(input: CreatePreferencesInput): Promise<Preferences>;
  updatePreferences(input: CreatePreferencesInput): Promise<Preferences>;
  getUserPreferences(userId: string): Promise<Preferences | undefined>;
}

export class PreferencesRepository implements IPreferencesRepository {
  constructor(private prisma: PrismaClient) {}

  private toPrismaEnums(input: CreatePreferencesInput) {
    return {
      userId: input.userId,
      drinkType: input.drinkType as $Enums.DrinkType,
      sweetenerType: input.sweetenerType as $Enums.SweetenerType,
      sugarAmount: input.sugarAmount ?? 0,
      milkStrength: input.milkStrength as $Enums.MilkStrength,
      notes: input.notes,
    };
  }

  private fromPrisma(input: {
    id: string;
    userId: string;
    drinkType: $Enums.DrinkType;
    sweetenerType: $Enums.SweetenerType | null;
    sugarAmount: number | null;
    milkStrength: $Enums.MilkStrength | null;
    notes?: string | null;
  }): Preferences {
    const result = convertNullToUndefined(input);

    return {
      id: result.id,
      userId: result.userId,
      drinkType: input.drinkType as DrinkType,
      sweetenerType: input.sweetenerType as SweetenerType,
      sugarAmount: result.sugarAmount,
      milkStrength: result.milkStrength as MilkStrength,
      notes: result.notes ?? undefined,
    };
  }

  async createPreferences(input: CreatePreferencesInput): Promise<Preferences> {
    const result = await this.prisma.preferences.create({
      data: this.toPrismaEnums(input),
      include: { user: true },
    });

    return this.fromPrisma(result);
  }

  async updatePreferences(input: UpdatePreferencesInput): Promise<Preferences> {
    const result = await this.prisma.preferences.update({
      where: { userId: input.userId },
      data: this.toPrismaEnums(input),
      include: { user: true },
    });

    return this.fromPrisma(result);
  }

  async getUserPreferences(userId: string): Promise<Preferences | undefined> {
    const result = await this.prisma.preferences.findUnique({
      where: { userId },
      include: { user: true },
    });

    return result ? this.fromPrisma(result) : undefined;
  }
}
