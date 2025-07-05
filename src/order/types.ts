import {
  OrderItem as PrismaOrderItem,
  Item as PrismaItem,
  Order as PrismaOrder,
  OrderType,
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
  teamId: string;
  userId: string;
  notes?: string;
  orderType?: OrderType;
  items: CreateOrderInputItem[];
};
