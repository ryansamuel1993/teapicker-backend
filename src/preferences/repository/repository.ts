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
      sugarAmount: input.sugarAmount,
      milkStrength: input.milkStrength as $Enums.MilkStrength,
      notes: input.notes,
    };
  }

  private fromPrisma(result: {
    id: string;
    userId: string;
    drinkType: $Enums.DrinkType;
    sweetenerType: $Enums.SweetenerType;
    sugarAmount: number;
    milkStrength: $Enums.MilkStrength;
    notes?: string | null;
  }): Preferences {
    return {
      id: result.id,
      userId: result.userId,
      drinkType: result.drinkType as DrinkType,
      sweetenerType: result.sweetenerType as SweetenerType,
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
