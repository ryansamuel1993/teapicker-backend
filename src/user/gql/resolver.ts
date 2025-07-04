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
    ): Promise<gql.CreateUserResponse> => {
      const alreadyExists = await ctx.userService.checkUserExists({
        email: args.input.email,
        name: args.input.name,
      });

      if (alreadyExists) {
        return {
          status: createBadRequestStatus(
            "User with that name or email already exists",
          ),
        };
      }

      const result = await ctx.userService.createUser(args.input);

      return result
        ? { status: createSuccessStatus(), data: result }
        : { status: createBadRequestStatus("Failed to create user") };
    },

    updateUser: async (
      _parent: unknown,
      args: { input: gql.UpdateUserInput },
      ctx: UserContext,
    ): Promise<gql.UpdateUserResponse> => {
      const result = await ctx.userService.updateUser(args.input);

      return result
        ? { status: createSuccessStatus(), data: result }
        : { status: createBadRequestStatus("Failed to update user") };
    },
  },
};
