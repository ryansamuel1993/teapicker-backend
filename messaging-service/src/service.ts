// import Twilio from "twilio";
// import { User } from "../../src/user/types";
// import { CreateOrderInput } from "../../src/order/types";

// export class NotificationService {
//   private client: ReturnType<typeof Twilio>;
//   private from: string;

//   constructor() {
//     this.client = Twilio(process.env.TWILIO_SID!, process.env.TWILIO_TOKEN!);
//     this.from = process.env.TWILIO_PHONE_NUMBER!;
//   }

//   private formatUKPhoneNumber(number: string): string {
//     const digits = number.replace(/\D/g, "");

//     if (digits.startsWith("07")) {
//       return "+44" + digits.slice(1);
//     }

//     return number;
//   }

//   public async sendSMS(user: User, order: CreateOrderInput) {
//     if (user.contactNumber) {
//       const formattedTo = this.formatUKPhoneNumber(user.contactNumber);

//       const itemList = order.items
//         .map((item) => `${item.quantity} × ${item.itemId}`)
//         .join(", ");

//       const body = `Hi ${user.name}, your order has been placed: ${itemList}`;

//       return this.client.messages.create({
//         to: formattedTo,
//         from: this.from,
//         body,
//       });
//     }
//   }
// }
