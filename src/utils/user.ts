import { UserMedia as GQLMedia } from "@prisma/client";
import { MediaType, User, UserMedia } from "../user/types";
import { convertNullToUndefined } from "./map";

export function generateRandomAvatarUrl(): string {
  const randomNumber = Math.floor(Math.random() * 50) + 1;

  return `https://avatar.iran.liara.run/public/${randomNumber}`;
}

export function mapUserFromPrisma(user: {
  id: string;
  name: string;
  email: string | null;
  contactNumber: string | null;
  teamId: string | null;
  media: GQLMedia[];
}): User {
  const u = convertNullToUndefined(user);
  const media = user.media.map((m) => ({
    id: m.id,
    userId: m.userId,
    url: m.url,
    alt: m.alt,
    type: m.type as MediaType,
    createdAt: m.createdAt,
  })) as UserMedia[];

  return {
    id: u.id,
    name: u.name,
    email: u.email,
    contactNumber: u.contactNumber,
    teamId: u.teamId,
    media: media,
  };
}
