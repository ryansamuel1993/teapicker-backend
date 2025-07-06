import * as gql from "./user-gen.gql";
import { IUserService } from "../../user/service/service";
import {
  createBadRequestStatus,
  createSuccessStatus,
} from "../../utils/maps/response";

export type UserContext = {
  userService: IUserService;
};

const getUserByIdFn = async (
  _parent: unknown,
  args: { userId: string },
  ctx: UserContext,
): Promise<gql.User> => {
  const result = await ctx.userService.getUserById(args.userId);

  if (!result) {
    throw new Error("No user member found");
  }

  return result;
};

const loginFn = async (
  _parent: unknown,
  args: { email: string },
  ctx: UserContext,
): Promise<gql.User | undefined> => {
  return await ctx.userService.login(args.email);
};

const getAllUsersFn = async (
  _parent: unknown,
  _args: unknown,
  ctx: UserContext,
): Promise<gql.User[]> => {
  return await ctx.userService.getAllUsers();
};

const createUserFn = async (
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
};

const updateUserFn = async (
  _parent: unknown,
  args: { input: gql.UpdateUserInput },
  ctx: UserContext,
): Promise<gql.UpdateUserResponse> => {
  const result = await ctx.userService.updateUser(args.input);

  return result
    ? { status: createSuccessStatus(), data: result }
    : { status: createBadRequestStatus("Failed to update user") };
};

const averageRatingResolver = async (
  parent: gql.User,
  _args: unknown,
  ctx: UserContext,
): Promise<number | undefined> => {
  const rating = await ctx.userService.getAverageRating(parent.id);

  if (!rating) {
    return undefined;
  }

  return Math.ceil(rating);
};

const preferencesResolver = async (
  parent: gql.User,
  _args: unknown,
  ctx: UserContext,
): Promise<gql.Preferences | undefined> => {
  return await ctx.userService.getUserPreferences(parent.id);
};

export const resolver = {
  Query: {
    getUserById: getUserByIdFn,
    login: loginFn,
    getAllUsers: getAllUsersFn,
  },
  Mutation: {
    createUser: createUserFn,
    updateUser: updateUserFn,
  },
  User: {
    averageRating: averageRatingResolver,
    preferences: preferencesResolver,
  },
};
