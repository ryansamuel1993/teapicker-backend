import {
  createBadRequestStatus,
  createSuccessStatus,
} from "../../utils/response";
import { IUserService } from "../service/service";
import * as gql from "./user-gen.gql";

export type UserContext = {
  userService: IUserService;
};

export const resolvers = {
  Query: {
    getUserById: async (
      _parent: unknown,
      args: { userId: string },
      ctx: UserContext,
    ): Promise<gql.User> => {
      const result = await ctx.userService.getUserById(args.userId);

      if (!result) {
        throw new Error("No user member found");
      }

      return result;
    },

    getAllUsers: async (
      _parent: unknown,
      _args: unknown,
      ctx: UserContext,
    ): Promise<gql.User[]> => {
      return await ctx.userService.getAllUsers();
    },
  },

  Mutation: {
    createUser: async (
      _parent: unknown,
      args: { input: gql.CreateUserInput },
      ctx: UserContext,
    ): Promise<gql.User> => {
      return await ctx.userService.createUser(args.input);
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
