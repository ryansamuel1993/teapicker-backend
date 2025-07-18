import { PrismaClient } from "@prisma/client";
import { Order, Item, CreateOrderInput, UserOrderRank } from "../types";

export interface IOrderRepository {
  createOrder(input: CreateOrderInput): Promise<Order>;
  getAllOrders(): Promise<Order[]>;
  getOrderById(id: string): Promise<Order>;
  getMenu(): Promise<Item[]>;
  getItemsByIds(itemIds: string[]): Promise<Item[]>;
  getAllItems(): Promise<Item[]>;
  getUserOrderRanks(userIds: string[]): Promise<UserOrderRank[]>;
  getLatestRanks(userIds: string[]): Promise<Map<string, number>>;
  getCountRanks(userIds: string[]): Promise<Map<string, number>>;
}

export class OrderRepository implements IOrderRepository {
  constructor(private prisma: PrismaClient) {}

  async createOrder(input: CreateOrderInput): Promise<Order> {
    const { userId, notes, items, teamId, orderType } = input;

    console.log(notes);
    const result = await this.prisma.order.create({
      data: {
        userId,
        teamId,
        notes,
        orderType,
        items: {
          create: items.map(({ itemId, quantity }) => ({
            item: { connect: { id: itemId } },
            quantity,
          })),
        },
      },
      include: {
        items: { include: { item: true } },
        user: true,
        team: true,
      },
    });

    return result;
  }

  async getAllOrders(): Promise<Order[]> {
    const results = await this.prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        items: {
          include: { item: true },
        },
      },
    });

    if (!results.length) {
      throw new Error("No orders found");
    }

    return results;
  }

  async getOrderById(id: string): Promise<Order> {
    const result = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: { item: true },
        },
      },
    });

    if (!result) {
      throw new Error("No order found");
    }

    return result;
  }

  async getMenu(): Promise<Item[]> {
    return await this.prisma.item.findMany({
      where: { isAvailable: true },
      orderBy: { name: "asc" },
    });
  }

  async getAllItems(): Promise<Item[]> {
    return await this.prisma.item.findMany({
      orderBy: { name: "asc" },
    });
  }

  async getItemsByIds(itemIds: string[]): Promise<Item[]> {
    return await this.prisma.item.findMany({
      where: {
        id: { in: itemIds },
      },
    });
  }

  async getUserOrderRanks(userIds: string[]): Promise<UserOrderRank[]> {
    const latestRanks = await this.getLatestRanks(userIds);
    const countRanks = await this.getCountRanks(userIds);

    return userIds.map((userId) => ({
      userId,
      latestRank: latestRanks.get(userId) ?? userIds.length,
      countRank: countRanks.get(userId) ?? userIds.length,
    }));
  }

  public async getLatestRanks(userIds: string[]): Promise<Map<string, number>> {
    const recentOrders = await this.prisma.order.findMany({
      where: { userId: { in: userIds } },
      orderBy: { createdAt: "desc" },
      select: { userId: true, createdAt: true },
    });

    const recentUserIds = [...new Set(recentOrders.map((o) => o.userId))];

    return new Map(recentUserIds.map((userId, index) => [userId, index + 1]));
  }

  public async getCountRanks(userIds: string[]): Promise<Map<string, number>> {
    const orderCounts = await this.prisma.order.groupBy({
      by: ["userId"],
      where: { userId: { in: userIds } },
      _count: { userId: true },
    });

    const countMap = new Map<string, number>(
      orderCounts.map((o) => [o.userId, o._count.userId]),
    );

    const usersWithCounts = userIds.map((userId) => ({
      userId,
      count: countMap.get(userId) ?? 0,
    }));

    const sortedByCount = [...usersWithCounts].sort(
      (a, b) => b.count - a.count,
    );

    return new Map(
      sortedByCount.map((entry, index) => [entry.userId, index + 1]),
    );
  }
}
