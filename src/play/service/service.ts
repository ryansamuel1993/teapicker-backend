import { PlayEntryInput } from "../types";
import { IOrderRepository } from "../../order/repository/repository";

export interface IPlayService {
  getPlayResult(players: PlayEntryInput): Promise<string>;
}
export class PlayService implements IPlayService {
  constructor(private orderRepository: IOrderRepository) {}

  async getPlayResult(play: PlayEntryInput): Promise<string> {
    const userRanks = await this.orderRepository.getUserOrderRanks(
      play.players,
    );

    // Assign a score to each user: higher = worse
    const scoredUsers = userRanks.map((user) => ({
      userId: user.userId,
      score: user.latestRank + user.countRank,
    }));

    // Find the user with the highest score (worst performer)
    const loser = scoredUsers.reduce((worst, current) =>
      current.score > worst.score ? current : worst,
    );

    return loser.userId;
  }
}
