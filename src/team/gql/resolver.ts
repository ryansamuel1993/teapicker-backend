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
  const t = await ctx.teamService.getAllTeams();
  console.log(t);

  return await ctx.teamService.getAllTeams();
};

const createTeam = async (
  _parent: unknown,
  args: { input: gql.CreateTeamInput },
  ctx: TeamContext,
) => {
  const { name, user } = args.input;

  return await ctx.teamService.createTeam({ name, user });
};

export const resolver = {
  Query: {
    getAllTeams: getAllTeams,
  },
  Mutation: {
    createTeam,
  },
};
