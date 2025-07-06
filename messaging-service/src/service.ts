import { config } from "dotenv";
import { Twilio } from "twilio";
import { User } from "../../src/user/types";
import { CreateOrderInput } from "../../src/order/types";
import { LogRepository } from "./repository";
import { formatUKPhoneNumber } from "./utils";

config();

export class LoggerService {
  private client?: Twilio;
  private fromNumber?: string;
  private smsEnabled: boolean;
  private logger: LogRepository;

  constructor(logger: LogRepository) {
    this.logger = logger;
    this.smsEnabled = process.env.SMS_ENABLED === "true";

    if (this.smsEnabled) {
      const sid = process.env.TWILIO_SID;
      const token = process.env.TWILIO_AUTH_TOKEN;
      const from = process.env.TWILIO_FROM_NUMBER;

      if (!sid || !token || !from) {
        throw new Error(
          "Missing Twilio env vars—please set TWILIO_SID, TWILIO_AUTH_TOKEN, and TWILIO_FROM_NUMBER",
        );
      }

      this.client = new Twilio(sid, token);
      this.fromNumber = from;
    }
  }

  public async sendOrderSMS(user: User, order: CreateOrderInput) {
    if (!this.smsEnabled) {
      console.log("SMS is disabled by configuration; skipping sendSMS.");

      return;
    }

    const toRaw = user.contactNumber;

    if (!toRaw) {
      return;
    }

    const to = formatUKPhoneNumber(toRaw);
    const itemList = order.items
      .map((item) => `${item.quantity} × ${item.itemId}`)
      .join(", ");
    const body = `Hi ${user.name}, your order has been placed: ${itemList}`;

    await this.logger.sendSMS({
      to: user.id,
      phoneNumber: to,
      body,
    });
  }
}
