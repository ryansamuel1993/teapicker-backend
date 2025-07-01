import { Team as PrismaTeam } from "@prisma/client";
import { CreateUserInput } from "../user/types";

export type Team = PrismaTeam
export type UpdateTeam = Pick<Team, "id" | "name">;

type CreateTeamUserInput = Omit<CreateUserInput, "teamId">;

export type CreateTeamInput = {
  name: string;
  user?: CreateTeamUserInput[];
};
