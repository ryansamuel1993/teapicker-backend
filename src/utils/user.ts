export function generateRandomAvatarUrl(): string {
  const randomNumber = Math.floor(Math.random() * 50) + 1;

  return `https://avatar.iran.liara.run/public/61/${randomNumber}`;
}
