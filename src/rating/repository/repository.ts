import { PrismaClient } from "@prisma/client";
import { Rating, CreateRatingInput } from "../types";
import { Score } from "../gql/rating-gen.gql";

export interface IRatingsRepository {
  create(input: CreateRatingInput): Promise<Rating | undefined>;
  get(userId: string): Promise<Rating[]>;
}

export class RatingsRepository implements IRatingsRepository {
  constructor(private prisma: PrismaClient) {}

  async create(input: CreateRatingInput): Promise<Rating> {
    const result = await this.prisma.rating.create({
      data: {
        orderId: input.orderId,
        score: input.score,
        notes: input.notes,
        userId: input.userId,
      },
      include: {
        user: true,
      },
    });

    return {
      id: result.id,
      score: result.score as Score,
      notes: result.notes ?? undefined,
      createdAt: result.createdAt,
      userId: result.userId,
    };
  }

  async get(userId: string): Promise<Rating[]> {
    const results = await this.prisma.rating.findMany({
      where: { userId },
      include: { user: true },
    });

    return results.map((result) => ({
      id: result.id,
      score: result.score as Score,
      notes: result.notes ?? undefined,
      createdAt: result.createdAt,
      userId: result.userId,
    }));
  }
}
