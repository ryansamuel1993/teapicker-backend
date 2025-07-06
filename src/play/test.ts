import { PrismaClient } from "@prisma/client";
import { describe, expect, it, beforeAll, afterAll } from "@jest/globals";
import { OrderRepository } from "../order/repository/repository";

const prisma = new PrismaClient();
const repo = new OrderRepository(prisma);

describe("OrderRepository ranking helpers (integration)", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe("getLatestRanks", () => {
    it("ranks users by most recent order (desc)", async () => {
      const result = await repo.getLatestRanks(["user1", "user2", "user3"]);

      expect(result).toEqual(
        new Map([
          ["user2", 1],
          ["user3", 2],
          ["user1", 3],
        ]),
      );
    });
  });

  describe("getCountRanks", () => {
    it("ranks users by number of orders (desc)", async () => {
      const result = await repo.getCountRanks(["user1", "user2", "user3"]);

      expect(result).toEqual(
        new Map([
          ["user1", 1],
          ["user3", 2],
          ["user2", 3],
        ]),
      );
    });
  });
});
