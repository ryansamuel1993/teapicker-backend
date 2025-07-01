import * as gql from "./rating-gen.gql";
import { formatDate } from "../../utils/format";
import {
  createBadRequestStatus,
  createSuccessStatus,
} from "../../utils/responseUtils";
import { IRatingsService } from "../service/service";

export type RatingsContext = {
  ratingsService: IRatingsService;
};

const getRatingsByUserFn = async (
  _parent: unknown,
  args: { userId: string },
  ctx: RatingsContext,
): Promise<gql.Rating[]> => {
  const ratings = await ctx.ratingsService.getRatingsByUser(args.userId);

  return ratings.map((rating) => ({
    ...rating,
    createdAt: formatDate(rating.createdAt),
  }));
};

const createRatingFn = async (
  _parent: unknown,
  args: { input: gql.CreateRatingInput },
  ctx: RatingsContext,
): Promise<gql.CreateRatingResponse | undefined> => {
  const result = await ctx.ratingsService.createRating(args.input);

  if (result) {
    return {
      status: createSuccessStatus(),
      data: {
        ...result,
        createdAt: formatDate(result.createdAt),
      },
    };
  }

  return {
    status: createBadRequestStatus("Error creating rating"),
  };
};

export const resolver = {
  Query: {
    getRatingsByUser: getRatingsByUserFn,
  },

  Mutation: {
    createRating: createRatingFn,
  },
};
