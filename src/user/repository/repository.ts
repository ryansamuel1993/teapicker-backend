import { PrismaClient, User } from "@prisma/client";
import { CreateUserInput } from "../types";

export interface IUserRepository {
  create(data: Partial<User>): Promise<User>;
  update(id: string, data: Partial<User>): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findAll(): Promise<User[]>;
}

export class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateUserInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        contactNumber: data.contactNumber,
        teamId: data.teamId,
      },
    });
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async findById(id: string): Promise<User | undefined> {
    const result = await this.prisma.user.findUnique({
      where: { id },
    });

    if (result) {
      return result;
    }

    return undefined;
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
