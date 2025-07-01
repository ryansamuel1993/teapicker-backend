import { Team } from "@prisma/client";

import { CreateStaffInput } from "../staff/types";

export type UpdateTeam = Pick<Team, "id" | "name">;

type CreateTeamStaffInput = Omit<CreateStaffInput, "teamId">;

export type CreateTeamInput = {
  name: string;
  staff?: CreateTeamStaffInput[];
};
