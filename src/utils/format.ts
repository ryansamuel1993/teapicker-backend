export const formatDate = (date: Date): string => date.toISOString();

export const formatByteArray = (input: string): Uint8Array => {
  return new TextEncoder().encode(input);
};
