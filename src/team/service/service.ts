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

  getAllTeams(): Promise<Team[]> {
    return this.teamRepository.getAllTeams();
  }

  createTeam(input: CreateTeamInput): Promise<Team> {
    return this.teamRepository.createTeam(input);
  }

  updateTeam(id: string, data: Partial<Team>): Promise<Team> {
    return this.teamRepository.updateTeam(id, data);
  }

  deleteTeam(id: string): Promise<void> {
    return this.teamRepository.deleteTeam(id);
  }
}
