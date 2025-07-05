import { PrismaClient } from "@prisma/client";
import { Rating, ratingSchema } from "../types";
import {
  mapCreateInputToPrisma,
  mapRatingResult,
} from "../../utils/maps/rating";

export interface IRatingRepository {
  createRating(input: unknown): Promise<Rating>;
  getUserRatings(userId: string): Promise<Rating[]>;
  getAverageRatings(): Promise<
    { userId: string; average: number | undefined }[]
  >;
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
  async getAverageRatings(): Promise<
    { userId: string; average: number | undefined }[]
  > {
    const results = await this.prisma.rating.groupBy({
      by: ["userId"],
      _avg: {
        overall: true,
      },
    });

    return results.map((r) => ({
      userId: r.userId,
      average: r._avg.overall ?? undefined,
    }));
  }
}
