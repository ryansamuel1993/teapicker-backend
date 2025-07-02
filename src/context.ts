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

const prisma = new PrismaClient();

export type GQLContext = {
  prisma: PrismaClient;
  teamService: TeamService;
  userService: UserService;
  orderService: OrderService;
  preferencesService: PreferencesService;
  ratingService: RatingService;
};

export const createContext = (): GQLContext => {
  const teamRepo = new TeamRepository(prisma);
  const userRepo = new UserRepository(prisma);
  const orderRepo = new OrderRepository(prisma, teamRepo);
  //const boostRepo = new BoostRepository(prisma);
  const preferencesRepo = new PreferencesRepository(prisma);
  const ratingRepo = new RatingRepository(prisma);
  //const itemRepo = new ItemRepository(prisma);

  return {
    prisma,
    teamService: new TeamService(teamRepo),
    userService: new UserService(userRepo),
    orderService: new OrderService(orderRepo),
    //boostService: new BoostService(boostRepo),
    preferencesService: new PreferencesService(preferencesRepo),
    ratingService: new RatingService(ratingRepo),
    //itemService: new ItemService(itemRepo),
  };
};
