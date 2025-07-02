import z from "zod";

export enum Score {
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
}
export const ScoreRank: Record<Score, number> = {
  [Score.One]: 1,
  [Score.Two]: 2,
  [Score.Three]: 3,
  [Score.Four]: 4,
  [Score.Five]: 5,
};

export const RankToScore: Record<number, Score> = {
  1: Score.One,
  2: Score.Two,
  3: Score.Three,
  4: Score.Four,
  5: Score.Five,
};

export const ratingSchema = z.object({
  orderId: z.string().uuid(),
  userId: z.string().uuid(),
  quality: z.number().min(1).max(5),
  service: z.number().min(1).max(5),
  notes: z.string().optional(),
  voiceNote: z.string().optional(),
});

export type RatingInput = z.infer<typeof ratingSchema>;

export type Rating = {
  id: string;
  orderId: string;
  userId: string;
  quality: Score;
  service: Score;
  overall: Score;
  notes?: string;
  voiceNote?: string;
  createdAt: Date;
};

export type CreateRatingInput = Omit<Rating, "id" | "createdAt" | "overall">;
