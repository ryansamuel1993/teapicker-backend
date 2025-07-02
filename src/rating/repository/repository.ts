import { PrismaClient } from "@prisma/client";
import { Rating, ratingSchema } from "../types";
import { mapCreateInputToPrisma, mapRatingResult } from "../../utils/rating";

export interface IRatingRepository {
  createRating(input: unknown): Promise<Rating>;
  getUserRatings(userId: string): Promise<Rating[]>;
}

export class RatingRepository implements IRatingRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createRating(input: unknown): Promise<Rating> {
    const parsed = ratingSchema.parse(input);

    const data = mapCreateInputToPrisma(parsed);
    const result = await this.prisma.rating.create({ data });

    return mapRatingResult(result);
  }

  async getUserRatings(userId: string): Promise<Rating[]> {
    const results = await this.prisma.rating.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return results.map(mapRatingResult);
  }
}
