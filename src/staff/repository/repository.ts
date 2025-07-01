import { PrismaClient, Staff } from "@prisma/client";

import { CreateStaffInput } from "../types";

export interface IStaffRepository {
  create(data: Partial<Staff>): Promise<Staff>;
  update(id: string, data: Partial<Staff>): Promise<Staff>;
  findById(id: string): Promise<Staff | undefined>;
  findAll(): Promise<Staff[]>;
}

export class StaffRepository implements IStaffRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateStaffInput): Promise<Staff> {
    return this.prisma.staff.create({
      data: {
        name: data.name,
        email: data.email,
        contactNumber: data.contactNumber,
        teamId: data.teamId,
      },
    });
  }

  async update(id: string, data: Partial<Staff>): Promise<Staff> {
    return this.prisma.staff.update({
      where: { id },
      data,
    });
  }

  async findById(id: string): Promise<Staff | undefined> {
    const result = await this.prisma.staff.findUnique({
      where: { id },
    });

    if (result) {
      return result;
    }

    return undefined;
  }

  async findAll(): Promise<Staff[]> {
    return this.prisma.staff.findMany();
  }
}
