import { PrismaClient, Staff, Team as PrismaTeam } from "@prisma/client";
import { Team } from "../../common/types";
import { DEFAULT_PREFERENCES } from "../../config/default";
import { CreateTeamInput, UpdateTeam } from "../types";

export interface ITeamRepository {
  getAll(): Promise<Team[]>;
  create(team: CreateTeamInput): Promise<Team>;
  update(id: string, data: Partial<Team>): Promise<Team>;
  getTeamByStaffId(staffId: string): Promise<Team | undefined>;
  delete(id: string): Promise<void>;
}

function mapTeam(
  entity: PrismaTeam & {
    members: Staff[];
  },
): Team {
  return {
    id: entity.id,
    name: entity.name,
    members: entity.members,
  };
}

export class TeamRepository implements ITeamRepository {
  constructor(private prisma: PrismaClient) {}

  async getAll(): Promise<Team[]> {
    return this.prisma.team.findMany({
      include: {
        members: true,
      },
    });
  }

  async getTeamByStaffId(staffId: string): Promise<Team | undefined> {
    const result = await this.prisma.team.findFirst({
      where: {
        members: {
          some: { id: staffId },
        },
      },
      include: {
        members: true,
      },
    });

    return result ? mapTeam(result) : undefined;
  }

  async create(team: CreateTeamInput): Promise<Team> {
    const { name, staff } = team;

    const result = await this.prisma.team.create({
      data: {
        name,
        members: {
          create: (staff ?? []).map((member) => ({
            name: member.name,
            email: member.email,
            contactNumber: member.contactNumber,
            preferences: {
              create: { ...DEFAULT_PREFERENCES },
            },
          })),
        },
      },
      include: {
        members: true,
      },
    });

    return mapTeam(result);
  }

  async update(id: string, updateTeam: UpdateTeam): Promise<Team> {
    return await this.prisma.team.update({
      where: { id },
      data: { name: updateTeam.name },
      include: {
        members: true,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.team.delete({ where: { id } });
  }
}
