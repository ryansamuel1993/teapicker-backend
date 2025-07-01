import { PrismaClient } from "@prisma/client";
import { Rating, CreateRatingInput } from "../types";
import { Score } from "../gql/rating-gen.gql";

export interface IRatingsRepository {
  create(input: CreateRatingInput): Promise<Rating | undefined>;
  get(staffId: string): Promise<Rating[]>;
}

export class RatingsRepository implements IRatingsRepository {
  constructor(private prisma: PrismaClient) {}

  async create(input: CreateRatingInput): Promise<Rating> {
    const result = await this.prisma.rating.create({
      data: {
        orderId: input.orderId,
        score: input.score,
        notes: input.notes,
        staffId: input.staffId,
      },
      include: {
        staff: true,
      },
    });

    return {
      id: result.id,
      score: result.score as Score,
      notes: result.notes ?? undefined,
      createdAt: result.createdAt,
      staffId: result.staffId,
    };
  }

  async get(staffId: string): Promise<Rating[]> {
    const results = await this.prisma.rating.findMany({
      where: { staffId },
      include: { staff: true },
    });

    return results.map((result) => ({
      id: result.id,
      score: result.score as Score,
      notes: result.notes ?? undefined,
      createdAt: result.createdAt,
      staffId: result.staffId,
    }));
  }
}
