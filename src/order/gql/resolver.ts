import * as gql from "./order-gen.gql";
import { IOrderService } from "../service/service";

interface OrderContext {
  orderService: IOrderService;
}

const getOrderFn = async (
  _parent: unknown,
  args: { input: gql.Order },
  ctx: OrderContext,
) => {
  return await ctx.orderService.getOrderById(args.input.id);
};

const getMenuFN = async (
  _parent: unknown,
  _args: unknown,
  ctx: OrderContext,
) => {
  return await ctx.orderService.getMenu();
};

const getAllOrdersFn = async (
  _parent: unknown,
  _: { input: gql.Order },
  ctx: OrderContext,
) => {
  return await ctx.orderService.getAllOrders();
};

const createOrderFn = async (
  _parent: unknown,
  args: { input: gql.CreateOrderInput },
  ctx: OrderContext,
) => {
  return await ctx.orderService.createOrder(args.input);
};

export const resolver = {
  Query: {
    getMenu: getMenuFN,
    getOrder: getOrderFn,
    getAllOrders: getAllOrdersFn,
  },
  Mutation: {
    createOrder: createOrderFn,
  },
};
