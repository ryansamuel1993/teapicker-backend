import {
  createBadRequestStatus,
  createSuccessStatus,
} from "../../utils/responseUtils";
import { IUserService } from "../service/service";
import * as gql from "./user-gen.gql";

export type UserContext = {
  userService: IUserService;
};

export const resolvers = {
  Query: {
    get: async (
      _parent: unknown,
      args: { userId: string },
      ctx: UserContext,
    ): Promise<gql.User> => {
      const result = await ctx.userService.get(args.userId);

      if (!result) {
        throw new Error("No user member found");
      }

      return result;
    },

    listAllUser: async (
      _parent: unknown,
      _args: unknown,
      ctx: UserContext,
    ): Promise<gql.User[]> => {
      return ctx.userService.getAllUser();
    },
  },

  Mutation: {
    createUser: async (
      _parent: unknown,
      args: { input: gql.CreateUserInput },
      ctx: UserContext,
    ): Promise<gql.User> => {
      return ctx.userService.createUser(args.input);
    },

    updateUser: async (
      _parent: unknown,
      args: { input: gql.UpdateUserInput },
      ctx: UserContext,
    ): Promise<gql.UpdateUserResponse> => {
      const result = await ctx.userService.updateUser(args.input);

      if (result) {
        return {
          status: createSuccessStatus(),
          data: result,
        };
      }

      return {
        status: createBadRequestStatus("Error updating user"),
      };
    },
  },
};
