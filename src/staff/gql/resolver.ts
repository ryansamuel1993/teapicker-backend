import {
  createBadRequestStatus,
  createSuccessStatus,
} from "../../utils/responseUtils";
import { IStaffService } from "../service/service";
import * as gql from "./staff-gen.gql";

export type StaffContext = {
  staffService: IStaffService;
};

export const resolvers = {
  Query: {
    get: async (
      _parent: unknown,
      args: { staffId: string },
      ctx: StaffContext,
    ): Promise<gql.Staff> => {
      const result = await ctx.staffService.get(args.staffId);

      if (!result) {
        throw new Error("No staff member found");
      }

      return result;
    },

    listAllStaff: async (
      _parent: unknown,
      _args: unknown,
      ctx: StaffContext,
    ): Promise<gql.Staff[]> => {
      return ctx.staffService.getAllStaff();
    },
  },

  Mutation: {
    createStaff: async (
      _parent: unknown,
      args: { input: gql.CreateStaffInput },
      ctx: StaffContext,
    ): Promise<gql.Staff> => {
      return ctx.staffService.createStaff(args.input);
    },

    updateStaff: async (
      _parent: unknown,
      args: { input: gql.UpdateStaffInput },
      ctx: StaffContext,
    ): Promise<gql.UpdateStaffResponse> => {
      const result = await ctx.staffService.updateStaff(args.input);

      if (result) {
        return {
          status: createSuccessStatus(),
          data: result,
        };
      }

      return {
        status: createBadRequestStatus("Error updating staff"),
      };
    },
  },
};
