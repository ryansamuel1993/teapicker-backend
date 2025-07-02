import * as gql from "./team-gen.gql";
import { ITeamService } from "../service/service";

interface TeamContext {
  teamService: ITeamService;
}

const getAllTeams = async (
  _parent: unknown,
  _args: unknown,
  ctx: TeamContext,
) => {
  return await ctx.teamService.getAllTeams();
};


export const resolver = {
  Query: {
    getAllTeams: getAllTeams,
  },
  Mutation: {
    createTeam,
  },
};
