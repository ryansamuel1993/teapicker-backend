import { Score } from "./gql/rating-gen.gql";

export type CreateRatingInput = {
  orderId: string;
  userId: string;
  score: Score;
  comment?: string;
};

export type Rating = {
  id: string;
  score: Score;
  notes?: string;
  createdAt: Date;
  userId: string;
};
