import * as gql from "./play-gen.gql";
import { IPlayService } from "../service/service";
import {
  createBadRequestStatus,
  createSuccessStatus,
} from "../../utils/maps/response";

export type PlayContext = {
  playService: IPlayService;
};

export const resolver = {
  Query: {},
  Mutation: {
    getPlayResult: async (
      _: unknown,
      args: { play: gql.PlayEntryInput },
      context: PlayContext,
    ): Promise<gql.PlayResponse> => {
      const { players } = args.play;

      if (!players) {
        throw new Error("No players");
      }

      const result = await context.playService.getPlayResult({
        players,
      });

      if (!result) {
        throw new Error("Could not determine a loser");
      }

      return result
        ? { status: createSuccessStatus(), data: result }
        : { status: createBadRequestStatus("Failed to play") };
    },
  },
};
