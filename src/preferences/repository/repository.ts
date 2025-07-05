import { PrismaClient } from "@prisma/client";
import {
  CreatePreferencesInput,
  Preferences,
  UpdatePreferencesInput,
} from "../types";
import {
  mapPreferencesFromPrisma,
  mapPreferencesToPrisma,
} from "../../utils/maps/preferences";

export interface IPreferencesRepository {
  createPreferences(
    input: CreatePreferencesInput,
  ): Promise<Preferences | undefined>;
  updatePreferences(
    input: CreatePreferencesInput,
  ): Promise<Preferences | undefined>;
  getUserPreferences(userId: string): Promise<Preferences | undefined>;
  getPreferences(): Promise<(Preferences | undefined)[]>;
}

export class PreferencesRepository implements IPreferencesRepository {
  constructor(private prisma: PrismaClient) {}

  async getPreferences(): Promise<(Preferences | undefined)[]> {
    const result = await this.prisma.preferences.findMany();

    return result.map((user) => {
      return mapPreferencesFromPrisma(user);
    });
  }

  async getUserPreferences(userId: string): Promise<Preferences | undefined> {
    const result = await this.prisma.preferences.findUnique({
      where: { userId },
    });

    return mapPreferencesFromPrisma(result);
  }

  async createPreferences(
    input: CreatePreferencesInput,
  ): Promise<Preferences | undefined> {
    const result = await this.prisma.preferences.create({
      data: mapPreferencesToPrisma(input),
    });

    return mapPreferencesFromPrisma(result);
  }

  async updatePreferences(
    input: UpdatePreferencesInput,
  ): Promise<Preferences | undefined> {
    const result = await this.prisma.preferences.update({
      where: { userId: input.userId },
      data: mapPreferencesToPrisma(input),
    });

    return mapPreferencesFromPrisma(result);
  }
}
