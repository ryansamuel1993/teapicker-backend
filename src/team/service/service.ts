import { Team } from "../../common/types";
import { ITeamRepository } from "../repository/repository";
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
    return this.teamRepository.getAll();
  }

  createTeam(input: CreateTeamInput): Promise<Team> {
    return this.teamRepository.create(input);
  }

  updateTeam(id: string, data: Partial<Team>): Promise<Team> {
    return this.teamRepository.update(id, data);
  }

  deleteTeam(id: string): Promise<void> {
    return this.teamRepository.delete(id);
  }
}
