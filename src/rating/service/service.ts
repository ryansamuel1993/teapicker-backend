import { IRatingsRepository } from "../repository/repository";
import { CreateRatingInput, Rating } from "../types";

export interface IRatingsService {
  createRating(input: CreateRatingInput): Promise<Rating | undefined>;
  getRatingsByStaff(staffId: string): Promise<Rating[]>;
}

export class RatingsService implements IRatingsService {
  constructor(private ratingsRepository: IRatingsRepository) {}

  createRating(input: CreateRatingInput): Promise<Rating | undefined> {
    return this.ratingsRepository.create(input);
  }
  getRatingsByStaff(staffId: string): Promise<Rating[]> {
    return this.ratingsRepository.get(staffId);
  }
}
