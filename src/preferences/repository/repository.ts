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
  create(input: CreatePreferencesInput): Promise<Preferences>;
  update(input: CreatePreferencesInput): Promise<Preferences>;
  get(staffId: string): Promise<Preferences | undefined>;
}

export class PreferencesRepository implements IPreferencesRepository {
  constructor(private prisma: PrismaClient) {}

  private toPrismaEnums(input: CreatePreferencesInput) {
    return {
      staffId: input.staffId,
      drinkType: input.drinkType as $Enums.DrinkType,
      sweetenerType: input.sweetenerType as $Enums.SweetenerType,
      sugarAmount: input.sugarAmount,
      milkStrength: input.milkStrength as $Enums.MilkStrength,
      notes: input.notes,
    };
  }

  private fromPrisma(result: {
    id: string;
    staffId: string;
    drinkType: $Enums.DrinkType;
    sweetenerType: $Enums.SweetenerType;
    sugarAmount: number;
    milkStrength: $Enums.MilkStrength;
    notes?: string | null;
  }): Preferences {
    return {
      id: result.id,
      staffId: result.staffId,
      drinkType: result.drinkType as DrinkType,
      sweetenerType: result.sweetenerType as SweetenerType,
      sugarAmount: result.sugarAmount,
      milkStrength: result.milkStrength as MilkStrength,
      notes: result.notes ?? undefined,
    };
  }

  async create(input: CreatePreferencesInput): Promise<Preferences> {
    const result = await this.prisma.preferences.create({
      data: this.toPrismaEnums(input),
      include: { staff: true },
    });

    return this.fromPrisma(result);
  }

  async update(input: UpdatePreferencesInput): Promise<Preferences> {
    const result = await this.prisma.preferences.update({
      where: { staffId: input.staffId },
      data: this.toPrismaEnums(input),
      include: { staff: true },
    });

    return this.fromPrisma(result);
  }

  async get(staffId: string): Promise<Preferences | undefined> {
    const result = await this.prisma.preferences.findUnique({
      where: { staffId },
      include: { staff: true },
    });

    return result ? this.fromPrisma(result) : undefined;
  }
}
