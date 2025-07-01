import { sendEmail } from './email/email';
import { sendSMS } from './sms/sms';

async function bootstrap() {
  // Simulated job handler (replace with Redis queue or API call)
  await sendEmail('user@example.com', 'Welcome!', 'Thanks for joining!');
  await sendSMS('+441234567890', 'Hi there! Thanks for joining us!');
}

bootstrap();
