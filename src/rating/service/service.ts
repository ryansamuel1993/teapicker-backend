import { IRatingRepository } from "../repository/repository";
import { CreateRatingInput, Rating } from "../types";

export interface IRatingService {
  createRating(input: CreateRatingInput): Promise<Rating | undefined>;
  getRatingsByUser(userId: string): Promise<Rating[]>;
  getUserAverageRating(userId: string): Promise<number | null>;
}

export class RatingService implements IRatingService {
  constructor(private ratingRepository: IRatingRepository) {}

  async createRating(input: CreateRatingInput): Promise<Rating | undefined> {
    return await this.ratingRepository.createRating(input);
  }

  async getRatingsByUser(userId: string): Promise<Rating[]> {
    return await this.ratingRepository.getUserRatings(userId);
  }

  async getUserAverageRating(userId: string): Promise<number | null> {
    const ratings = await this.ratingRepository.getUserRatings(userId);

    if (ratings.length === 0) {
      return null;
    }

    const total = ratings.reduce((sum, r) => sum + r.overall, 0);

    return total / ratings.length;
  }
}
