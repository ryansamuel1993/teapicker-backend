import * as gql from "./order-gen.gql";
import { IOrderService } from "../service/service";

interface OrderContext {
  orderService: IOrderService;
}

const getOrder = async (
  _parent: unknown,
  args: { input: gql.Order },
  ctx: OrderContext,
) => {
  return ctx.orderService.getOrderById(args.input.id);
};

const getAllOrders = async (
  _parent: unknown,
  args: { input: gql.Order },
  ctx: OrderContext,
) => {
  return ctx.orderService.getAllOrders();
};

const createOrder = async (
  _parent: unknown,
  args: { input: gql.CreateOrderInput },
  ctx: OrderContext,
) => {
  return ctx.orderService.createOrder(args.input);
};

export const resolver = {
  Query: {
    order: getOrder,
    allOrders: getAllOrders,
  },
  Mutation: {
    createOrder,
  },
};
