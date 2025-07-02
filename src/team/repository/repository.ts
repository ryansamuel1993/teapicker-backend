import { PrismaClient } from "@prisma/client";
import { DEFAULT_PREFERENCES } from "../../config/default";
import { CreateTeamInput, Team, UpdateTeam } from "../types";

export interface ITeamRepository {
  getAllTeams(): Promise<Team[]>;
  createTeam(team: CreateTeamInput): Promise<Team>;
  updateTeam(id: string, data: Partial<Team>): Promise<Team>;
  getTeamByUserId(userId: string): Promise<Team | undefined>;
  deleteTeam(id: string): Promise<void>;
}

export class TeamRepository implements ITeamRepository {
  constructor(private prisma: PrismaClient) {}

  async getAllTeams(): Promise<Team[]> {
    const response = await this.prisma.team.findMany({
      include: {
        members: true,
      },
    });

    return response;
  }

  async getTeamByUserId(userId: string): Promise<Team | undefined> {
    const result = await this.prisma.team.findFirst({
      where: {
        members: {
          some: { id: userId },
        },
      },
      include: {
        members: true,
      },
    });

    return result ?? undefined;
  }

  async createTeam(team: CreateTeamInput): Promise<Team> {
    const { name, user } = team;

    return await this.prisma.team.create({
      data: {
        name,
        members: {
          create: (user ?? []).map((member) => ({
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
  }

  async updateTeam(id: string, updateTeam: UpdateTeam): Promise<Team> {
    return await this.prisma.team.update({
      where: { id },
      data: { name: updateTeam.name },
      include: {
        members: true,
      },
    });
  }

  async deleteTeam(id: string): Promise<void> {
    await this.prisma.team.delete({ where: { id } });
  }
}
