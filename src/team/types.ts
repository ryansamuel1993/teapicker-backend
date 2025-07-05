import { CreateUserInput, UserMedia } from "../user/types";
import {
  Preferences,
  User as PrismaUser,
  Team as PrismaTeamBase,
  User,
} from "@prisma/client";

export type Team = {
  id: string;
  name: string;
  members?: User[];
};

export type UpdateTeam = Pick<Team, "id" | "name">;

export type CreateTeamInput = {
  name: string;
  users?: CreateUserInput[];
};

export type PrismaUserWithPreferences = PrismaUser & {
  media: UserMedia[];
  preferences: Preferences | undefined;
};

export type PrismaTeamWithMembers = PrismaTeamBase & {
  members: PrismaUserWithPreferences[];
};
