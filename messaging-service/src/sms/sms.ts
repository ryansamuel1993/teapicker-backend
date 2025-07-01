import { PrismaClient } from '@prisma/client';
import { Twilio } from 'twilio';
import dotenv from 'dotenv';
dotenv.config();

const client = new Twilio(process.env.TWILIO_SID!, process.env.TWILIO_AUTH_TOKEN!);
const prisma = new PrismaClient();

export async function sendSMS(to: string, body: string) {
  await client.messages.create({
    body,
    from: process.env.TWILIO_FROM_NUMBER,
    to,
  });

  await prisma.sMSLog.create({
  data: {
    to,
    body,
  },
});
  console.log(`📲 SMS sent to ${to}`);
}
