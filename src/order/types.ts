import {
  OrderItem as PrismaOrderItem,
  Item as PrismaItem,
  Order as PrismaOrder,
} from "@prisma/client";

export type Item = PrismaItem;
export type Order = PrismaOrder;
export type OrderItem = PrismaOrderItem & { item: Item };

export type CreateOrder = PrismaOrder & {
  itemId: string;
};

export type CreateOrderInputItem = {
  itemId: string;
  quantity: number;
};

export type CreateOrderInput = {
  userId: string;
  notes?: string;
  items: CreateOrderInputItem[];
};
