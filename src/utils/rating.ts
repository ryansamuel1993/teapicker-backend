import { Rating as PrismaRating } from "@prisma/client";
import {
  CreateRatingInput,
  RankToScore,
  Rating,
  Score,
  ScoreRank,
} from "../rating/types";
import { formatByteArray } from "./format";

export const calculateOverallScore = (
  quality: Score,
  service: Score,
): Score => {
  const average = Math.floor((ScoreRank[quality] + ScoreRank[service]) / 2);

  return RankToScore[average] ?? Score.Two;
};

export const mapRatingResult = (result: PrismaRating): Rating => ({
  id: result.id,
  orderId: result.orderId,
  quality: result.quality as Score,
  service: result.service as Score,
  overall: result.overall as Score,
  notes: result.notes ?? undefined,
  voiceNote: result.voiceNote?.toString(),
  createdAt: result.createdAt,
  userId: result.userId,
});

export const mapCreateInputToPrisma = (input: CreateRatingInput) => ({
  orderId: input.orderId,
  userId: input.userId,
  quality: input.quality,
  service: input.service,
  overall: calculateOverallScore(input.quality, input.service),
  notes: input.notes,
  voiceNote: input.voiceNote ? formatByteArray(input.voiceNote) : undefined,
});
