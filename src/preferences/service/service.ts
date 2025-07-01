import { IPreferencesRepository } from "../repository/repository";
import {
  CreatePreferencesInput,
  Preferences,
  UpdatePreferencesInput,
} from "../types";

export interface IPreferencesService {
  getPreferences(userId: string): Promise<Preferences | undefined>;
  createPreferences(input: CreatePreferencesInput): Promise<Preferences>;
  updatePreferences(input: CreatePreferencesInput): Promise<Preferences>;
}

export class PreferencesService implements IPreferencesService {
  constructor(private preferencesRepository: IPreferencesRepository) {}

  async getPreferences(userId: string): Promise<Preferences | undefined> {
    return await this.preferencesRepository.getPreferences(userId);
  }

  async createPreferences(input: CreatePreferencesInput): Promise<Preferences> {
    return this.preferencesRepository.createPreferences(input);
  }

  async updatePreferences(input: UpdatePreferencesInput): Promise<Preferences> {
    return await this.preferencesRepository.updatePreferences(input);
  }
}
