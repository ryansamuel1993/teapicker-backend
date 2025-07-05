import { sendEmail } from "./email/email";
import { sendSMS } from "./sms/sms";

export class NotificationService {
  async sendEmail(to: string, subject: string, body: string) {
    return await sendEmail(to, subject, body);
  }

  async sendSMS(to: string, message: string) {
    return await sendSMS(to, message);
  }
}
