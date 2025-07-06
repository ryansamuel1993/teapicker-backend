export function formatUKPhoneNumber(number: string): string {
  const digits = number.replace(/\D/g, "");

  return digits.startsWith("07") ? "+44" + digits.slice(1) : number;
}
