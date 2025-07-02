import { PrismaClient } from "@prisma/client";
import { CreateUserInput, UpdateUserInput, User } from "../types";
import { convertNullToUndefined } from "../../utils/map";
import { generateRandomAvatarUrl } from "../../utils/user";

export interface IUserRepository {
  createUser(data: CreateUserInput): Promise<User>;
  updateUser(user: UpdateUserInput): Promise<User>;
  getUserById(id: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
}

export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async createUser({
    name,
    email,
    contactNumber,
    teamId,
  }: CreateUserInput): Promise<User> {
    const avatarUrl = generateRandomAvatarUrl();

    const result = await this.prisma.user.create({
      data: {
        name,
        email,
        contactNumber,
        teamId,
        media: {
          create: {
            url: avatarUrl,
            type: "avatar",
          },
        },
      },
      include: {
        media: true,
      },
    });

    return convertNullToUndefined(result);
  }

  async updateUser(user: UpdateUserInput): Promise<User> {
    const { id, ...data } = user;

    const result = await this.prisma.user.update({
      where: { id },
      data,
      include: {
        media: true,
      },
    });

    return convertNullToUndefined(result);
  }

  async getUserById(id: string): Promise<User | undefined> {
    const result = await this.prisma.user.findUnique({
      where: { id },
      include: {
        media: true,
      },
    });

    if (result) {
      return convertNullToUndefined(result);
    }

    return undefined;
  }

  async getAllUsers(): Promise<User[]> {
    const result = await this.prisma.user.findMany({
      include: {
        media: true,
      },
    });

    return result.map((user) => ({
      ...convertNullToUndefined(user),
    }));
  }
}
