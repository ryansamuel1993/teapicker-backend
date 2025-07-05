import * as gql from "./team-gen.gql";
import { ITeamService } from "../service/service";
import {
  createBadRequestStatus,
  createSuccessStatus,
} from "../../utils/maps/response";

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

const createTeam = async (
  _parent: unknown,
  args: { input: gql.CreateTeamInput },
  ctx: TeamContext,
) => {
  const result = await ctx.teamService.createTeam(args.input);

  return result
    ? { status: createSuccessStatus(), data: result }
    : { status: createBadRequestStatus("Failed to create team") };
};

export const resolver = {
  Query: {
    getAllTeams,
  },
  Mutation: {
    createTeam,
  },
};
