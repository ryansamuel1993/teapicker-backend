export type User = {
  id: string;
  name: string;
  email?: string;
  contactNumber?: bigint;
  teamId?: string;
  media: UserMedia[];
};

export type UserMedia = {
  id: string;
  userId: string;
  url: string;
  type?: string;
  alt?: string;
  createdAt: Date;
};

export type CreateUserInput = {
  name: string;
  email?: string;
  contactNumber?: bigint;
  teamId?: string;
};

export type UpdateUserInput = {
  id: string;
  name: string;
  email?: string;
  contactNumber?: bigint;
  teamId?: string;
};
