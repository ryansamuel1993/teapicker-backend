import { IRatingRepository } from "../repository/repository";
import { CreateRatingInput, Rating } from "../types";

export interface IRatingService {
  createRating(input: CreateRatingInput): Promise<Rating | undefined>;
  getRatingsByUser(userId: string): Promise<Rating[]>;
}

export class RatingService implements IRatingService {
  constructor(private ratingRepository: IRatingRepository) {}

  createRating(input: CreateRatingInput): Promise<Rating | undefined> {
    return this.ratingRepository.createRating(input);
  }
  getRatingsByUser(userId: string): Promise<Rating[]> {
    return this.ratingRepository.getUserRatings(userId);
  }
}
