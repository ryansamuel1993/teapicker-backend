import * as gql from "./team-gen.gql";
import { ITeamService } from "../service/service";

interface TeamContext {
  teamService: ITeamService;
}

/** Query handlers */
const getAllTeamss = async (
  _parent: unknown,
  _args: unknown,
  ctx: TeamContext,
) => {
  return ctx.teamService.getAllTeamss();
};

const createTeam = async (
  _parent: unknown,
  args: { input: gql.CreateTeamInput },
  ctx: TeamContext,
) => {
  const { name, user } = args.input;

  return ctx.teamService.createTeam({ name, user });
};

export const resolver = {
  Query: {
    getAllTeamss: getAllTeamss,
  },
  Mutation: {
    createTeam,
  },
};
