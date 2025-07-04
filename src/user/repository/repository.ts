import { MediaType, PrismaClient } from "@prisma/client";
import { CreateUserInput, UpdateUserInput, User } from "../types";
import { generateRandomAvatarUrl, mapUserFromPrisma } from "../../utils/user";

export interface IUserRepository {
  createUser(data: CreateUserInput): Promise<User>;
  updateUser(user: UpdateUserInput): Promise<User>;
  getUserById(id: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
}

export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async createUser(user: CreateUserInput): Promise<User> {
    const { name, email, contactNumber, teamId } = user;
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
            type: MediaType.AVATAR,
          },
        },
      },
      include: {
        media: true,
      },
    });

    return mapUserFromPrisma(result);
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

    return mapUserFromPrisma(result);
  }

  async getUserById(id: string): Promise<User | undefined> {
    const result = await this.prisma.user.findUnique({
      where: { id },
      include: {
        media: true,
      },
    });

    return result ? mapUserFromPrisma(result) : undefined;
  }

  async getAllUsers(): Promise<User[]> {
    const result = await this.prisma.user.findMany({
      include: {
        media: true,
      },
    });

    return result.map((user) => mapUserFromPrisma(user));
  }
}
