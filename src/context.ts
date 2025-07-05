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

import { NotificationService } from "../messaging-service/src/worker";

const prisma = new PrismaClient();

export type GQLContext = {
  prisma: PrismaClient;
  teamService: TeamService;
  userService: UserService;
  orderService: OrderService;
  preferencesService: PreferencesService;
  ratingService: RatingService;
  playService: PlayService;
  notificationService: NotificationService;
};

export const createContext = (): GQLContext => {
  const teamRepo = new TeamRepository(prisma);
  const userRepo = new UserRepository(prisma);
  const orderRepo = new OrderRepository(prisma);
  const preferencesRepo = new PreferencesRepository(prisma);
  const ratingRepo = new RatingRepository(prisma);
  const notificationService = new NotificationService();

  return {
    prisma,
    teamService: new TeamService(teamRepo),
    userService: new UserService(userRepo, ratingRepo, preferencesRepo),
    orderService: new OrderService(orderRepo, userRepo, notificationService),
    playService: new PlayService(orderRepo),
    preferencesService: new PreferencesService(preferencesRepo),
    ratingService: new RatingService(ratingRepo),
    notificationService: new NotificationService(),
  };
};
