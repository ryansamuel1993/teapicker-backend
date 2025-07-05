import { Preferences } from "../preferences/types";

export type User = {
  id: string;
  name: string;
  email?: string;
  contactNumber?: string;
  teamId?: string;
  media: UserMedia[];
  preferences?: Preferences;
  averageRating?: number;
};

export type CreatmUserMedia = Omit<UserMedia, "id">;

export type UserMedia = {
  id: string;
  userId: string;
  url: string;
  type: MediaType;
  alt?: string;
  createdAt: Date;
};

export enum MediaType {
  Avatar = "AVATAR",
  Cover = "COVER",
  Gallery = "GALLERY",
  Video = "VIDEO",
}

export type CreateUserInput = {
  name: string;
  email: string;
  contactNumber?: string;
  teamId?: string;
};

export type UpdateUserInput = {
  id: string;
  name: string;
  email?: string;
  contactNumber?: string;
  teamId?: string;
};
