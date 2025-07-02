import { ITeamRepository } from "../repository/repository";
import { Team } from "../types";
import { CreateTeamInput } from "../types";

export interface ITeamService {
  getAllTeams(): Promise<Team[]>;
  createTeam(input: CreateTeamInput): Promise<Team>;
  updateTeam(id: string, data: Partial<Team>): Promise<Team>;
  deleteTeam(id: string): Promise<void>;
}

export class TeamService implements ITeamService {
  constructor(private teamRepository: ITeamRepository) {}

  async getAllTeams(): Promise<Team[]> {
    return await this.teamRepository.getAllTeams();
  }

  async createTeam(input: CreateTeamInput): Promise<Team> {
    return await this.teamRepository.createTeam(input);
  }

  async updateTeam(id: string, data: Partial<Team>): Promise<Team> {
    return await this.teamRepository.updateTeam(id, data);
  }

  async deleteTeam(id: string): Promise<void> {
    return await this.teamRepository.deleteTeam(id);
  }
}
