import { config } from "dotenv";
import { Twilio } from "twilio";
import { User } from "../../src/user/types";
import { CreateOrderInput } from "../../src/order/types";
import { LogRepository } from "./repository";
import { formatUKPhoneNumber } from "./utils";
import { env } from "./env";

config();

export class LoggerService {
  private client?: Twilio;
  private fromNumber?: string;
  private smsEnabled: boolean;
  private logger: LogRepository;

  constructor(logger: LogRepository) {
    this.logger = logger;
    this.smsEnabled = env.SMS_ENABLED;

    const { TWILIO_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER } = env;

    if (
      this.smsEnabled &&
      TWILIO_SID &&
      TWILIO_AUTH_TOKEN &&
      TWILIO_FROM_NUMBER
    ) {
      this.client = new Twilio(TWILIO_SID, TWILIO_AUTH_TOKEN);
      this.fromNumber = TWILIO_FROM_NUMBER;
    } else if (this.smsEnabled) {
      console.warn(
        "[LoggerService] SMS is enabled but Twilio environment variables are missing. SMS will be disabled.",
      );
      this.smsEnabled = false;
    }
  }

  public async sendOrderSMS(user: User, order: CreateOrderInput) {
    if (!this.smsEnabled) {
      console.log("[LoggerService] SMS is disabled; skipping sendOrderSMS.");

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
