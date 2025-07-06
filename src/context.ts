import { PrismaClient } from "@prisma/client";

import { TeamRepository } from "./team/repository/repository";
import { UserRepository } from "./user/repository/repository";
import { OrderRepository } from "./order/repository/repository";
import { PreferencesRepository } from "./preferences/repository/repository";
import { RatingRepository } from "./rating/repository/repository";

import { TeamService } from "./team/service/service";
import { UserService } from "./user/service/service";
import { OrderService } from "./order/service/service";
import { PreferencesService } from "./preferences/service/service";
import { RatingService } from "./rating/service/service";
import { PlayService } from "./play/service/service";

import { LoggerService } from "../messaging-service/src/service";
import { LogRepository } from "../messaging-service/src/repository";
import { prisma } from "../container";

export type GQLContext = {
  prisma: PrismaClient;
  teamService: TeamService;
  userService: UserService;
  orderService: OrderService;
  preferencesService: PreferencesService;
  ratingService: RatingService;
  playService: PlayService;
  loggerService: LoggerService;
};

export const createContext = (): GQLContext => {
  const teamRepo = new TeamRepository(prisma);
  const userRepo = new UserRepository(prisma);
  const orderRepo = new OrderRepository(prisma);
  const preferencesRepo = new PreferencesRepository(prisma);
  const ratingRepo = new RatingRepository(prisma);
  const loggerRepo = new LogRepository(prisma);

  const loggerService = new LoggerService(loggerRepo);
  const teamService = new TeamService(teamRepo);
  const userService = new UserService(userRepo, ratingRepo, preferencesRepo);
  const orderService = new OrderService(orderRepo, userRepo, loggerService);
  const preferencesService = new PreferencesService(preferencesRepo);
  const ratingService = new RatingService(ratingRepo);
  const playService = new PlayService(orderRepo);

  return {
    prisma,
    teamService,
    userService,
    orderService,
    preferencesService,
    ratingService,
    playService,
    loggerService,
  };
};
