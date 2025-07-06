import { Twilio } from "twilio";
import { config } from "dotenv";
import { SMSPayload } from "./types";
import { PrismaClient } from "../../node_modules/@prisma/client";

config();

export interface ILogRepository {
  sendSMS(sms: SMSPayload): Promise<void>;
}

export class LogRepository implements ILogRepository {
  private client?: Twilio;
  private fromNumber?: string;
  private smsEnabled: boolean;
  private prismaClient: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prismaClient = prisma;
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

  async sendSMS({ to, phoneNumber, body }: SMSPayload): Promise<void> {
    if (!this.smsEnabled) {
      console.log("SMS is disabled by configuration; skipping sendSMS.");

      return;
    }

    await this.client!.messages.create({
      from: this.fromNumber!,
      to: phoneNumber,
      body,
    });

    await this.prismaClient.sMSLog.create({
      data: {
        to,
        phoneNumber,
        body,
      },
    });
  }
}
