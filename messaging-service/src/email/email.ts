import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: +process.env.SMTP_PORT!,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(to: string, subject: string, text: string) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM || "no-reply@myapp.com",
    to,
    subject,
    text,
  });

  await prisma.emailLog.create({
    data: {
      to,
      subject,
      content: text,
    },
  });
  console.log(`✅ Email sent to ${to}`);
}
