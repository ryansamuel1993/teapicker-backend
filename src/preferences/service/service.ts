import { IPreferencesRepository } from "../repository/repository";
import {
  CreatePreferencesInput,
  Preferences,
  UpdatePreferencesInput,
} from "../types";

export interface IPreferencesService {
  createPreferences(
    input: CreatePreferencesInput,
  ): Promise<Preferences | undefined>;
  updatePreferences(
    input: CreatePreferencesInput,
  ): Promise<Preferences | undefined>;
}

export class PreferencesService implements IPreferencesService {
  constructor(private preferencesRepository: IPreferencesRepository) {}

  async createPreferences(
    input: CreatePreferencesInput,
  ): Promise<Preferences | undefined> {
    return await this.preferencesRepository.createPreferences(input);
  }

  async updatePreferences(
    input: UpdatePreferencesInput,
  ): Promise<Preferences | undefined> {
    return await this.preferencesRepository.updatePreferences(input);
  }
}
