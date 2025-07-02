import { IRatingRepository } from "../repository/repository";
import { CreateRatingInput, Rating } from "../types";

export interface IRatingService {
  createRating(input: CreateRatingInput): Promise<Rating | undefined>;
  getRatingsByUser(userId: string): Promise<Rating[]>;
}

export class RatingService implements IRatingService {
  constructor(private ratingRepository: IRatingRepository) {}

  async createRating(input: CreateRatingInput): Promise<Rating | undefined> {
    return await this.ratingRepository.createRating(input);
  }
  async getRatingsByUser(userId: string): Promise<Rating[]> {
    return await this.ratingRepository.getUserRatings(userId);
  }
}
