import { Score } from "./gql/rating-gen.gql";

export type CreateRatingInput = {
  orderId: string;
  staffId: string;
  score: Score;
  comment?: string;
};

export type Rating = {
  id: string;
  score: Score;
  notes?: string;
  createdAt: Date;
  staffId: string;
};
