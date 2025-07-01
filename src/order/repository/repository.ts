import { PrismaClient } from "@prisma/client";

import { ITeamRepository } from "../../team/repository/repository";
import { Order, Item, CreateOrderInput } from "../types";

export interface IOrderRepository {
  createOrder(input: CreateOrderInput): Promise<Order>;
  getAllOrders(): Promise<Order[]>;
  getOrderById(id: string): Promise<Order>;
  getMenu(): Promise<Item[]>;
  getItemsByIds(itemIds: string[]): Promise<Item[]>;
}

export class OrderRepository implements IOrderRepository {
  constructor(
    private prisma: PrismaClient,
    private teamRepository: ITeamRepository,
  ) {}

  async createOrder(input: CreateOrderInput): Promise<Order> {
    const { userId, notes, items } = input;

    const team = await this.teamRepository.getTeamByUserId(userId);

    if (!team) {
      throw new Error("No team found for user member");
    }

    const result = await this.prisma.order.create({
      data: {
        userId,
        teamId: team.id,
        notes,
        items: {
          create: items.map(({ itemId, quantity }) => ({
            item: { connect: { id: itemId } },
            quantity,
          })),
        },
      },
      include: {
        user: true,
        team: true,
        items: {
          include: { item: true },
        },
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
    return this.prisma.item.findMany({
      where: { isAvailable: true },
      orderBy: { name: "asc" },
    });
  }

  async getItemsByIds(itemIds: string[]): Promise<Item[]> {
    return this.prisma.item.findMany({
      where: {
        id: { in: itemIds },
      },
    });
  }
}
