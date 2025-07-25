import { IOrderRepository } from "../repository/repository";
import { CreateOrderInput, Item, Order } from "../types";
import { LoggerService } from "../../../messaging-service/src/service";
import { IUserRepository } from "../../user/repository/repository";

export type IOrderService = {
  getAllOrders(): Promise<Order[]>;
  getOrderById(id: string): Promise<Order>;
  getMenu(): Promise<Item[]>;
  createOrder(input: CreateOrderInput): Promise<Order>;
};

export class OrderService implements IOrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private userRepository: IUserRepository,
    private loggerService: LoggerService,
  ) {}

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
    const order = await this.orderRepository.createOrder(input);
    const user = await this.userRepository.getUserById(input.userId);

    if (order && user) {
      await this.loggerService.sendOrderSMS(user, input);
    }

    return order;
  }
}
