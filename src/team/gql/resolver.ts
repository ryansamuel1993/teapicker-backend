import * as gql from "./team-gen.gql";
import { ITeamService } from "../service/service";

interface TeamContext {
  teamService: ITeamService;
}

/** Query handlers */
const getAllTeams = async (
  _parent: unknown,
  _args: unknown,
  ctx: TeamContext,
) => {
  return ctx.teamService.getAllTeams();
};

const createTeam = async (
  _parent: unknown,
  args: { input: gql.CreateTeamInput },
  ctx: TeamContext,
) => {
  const { name, staff } = args.input;

  return ctx.teamService.createTeam({ name, staff });
};

export const resolver = {
  Query: {
    getAllTeams: getAllTeams,
  },
  Mutation: {
    createTeam,
  },
};
