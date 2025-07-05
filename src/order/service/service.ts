import { IOrderRepository } from "../repository/repository";
import { CreateOrderInput, Item, Order } from "../types";

export type IOrderService = {
  getAllOrders(): Promise<Order[]>;
  getOrderById(id: String): Promise<Order>;
  getMenu(): Promise<Item[]>;
  createOrder(input: CreateOrderInput): Promise<Order>;
};

export class OrderService implements IOrderService {
  constructor(private orderRepository: IOrderRepository) {}

  async getMenu(): Promise<Item[]> {
    return await this.orderRepository.getMenu();
  }

  async getOrderById(id: string): Promise<Order> {
    return await this.orderRepository.getOrderById(id);
  }

  async getAllOrders(): Promise<Order[]> {
    const result = await this.orderRepository.getAllOrders();

    if (result) {
      return result;
    }

    throw new Error("No orders found");
  }

  async createOrder(input: CreateOrderInput): Promise<Order> {
    return await this.orderRepository.createOrder(input);
  }
}
