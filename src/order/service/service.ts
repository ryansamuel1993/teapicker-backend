import { IOrderRepository } from "../repository/repository";
import { CreateOrderInput, Order } from "../types";

export type IOrderService = {
  getAllOrders(): Promise<Order[]>;
  getOrderById(id: String): Promise<Order>;
  createOrder(input: CreateOrderInput): Promise<Order>;
};

export class OrderService implements IOrderService {
  constructor(private orderRepository: IOrderRepository) {}

  async getOrderById(id: string): Promise<Order> {
    return await this.orderRepository.getOrderById(id);
  }

  async getAllOrders(): Promise<Order[]> {
    const response = await this.orderRepository.getAllOrders();

    if (response) {
      return response;
    }

    throw new Error("No orders found");
  }

  async createOrder(input: CreateOrderInput): Promise<Order> {
    return this.orderRepository.createOrder(input);
  }
}
