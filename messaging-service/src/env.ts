export function getOptionalEnv(key: string): string | undefined {
  return process.env[key];
}

export const env = {
  TWILIO_SID: getOptionalEnv("TWILIO_SID"),
  TWILIO_AUTH_TOKEN: getOptionalEnv("TWILIO_AUTH_TOKEN"),
  TWILIO_FROM_NUMBER: getOptionalEnv("TWILIO_FROM_NUMBER"),
  SMS_ENABLED: process.env.SMS_ENABLED === "true",
};
