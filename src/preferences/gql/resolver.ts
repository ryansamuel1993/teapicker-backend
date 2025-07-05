import * as gql from "../../preferences/gql/preferences-gen.gql";
import {
  createBadRequestStatus,
  createSuccessStatus,
} from "../../utils/maps/response";
import { IPreferencesService } from "../service/service";

export type PreferencesContext = {
  preferencesService: IPreferencesService;
};

export const resolver = {
  Mutation: {
    createPreferences: async (
      _parent: unknown,
      args: { input: gql.CreatePreferencesInput },
      ctx: PreferencesContext,
    ): Promise<gql.CreatePreferencesResponse> => {
      const result = await ctx.preferencesService.createPreferences(args.input);

      return result
        ? { status: createSuccessStatus(), data: result }
        : { status: createBadRequestStatus("Failed to create preferences") };
    },

    updatePreferences: async (
      _parent: unknown,
      args: { input: gql.CreatePreferencesInput },
      ctx: PreferencesContext,
    ): Promise<gql.UpdatePreferencesResponse> => {
      const result = await ctx.preferencesService.updatePreferences(args.input);

      return result
        ? { status: createSuccessStatus(), data: result }
        : { status: createBadRequestStatus("Failed to update preferences") };
    },
  },
};
