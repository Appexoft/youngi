export const formattedStringWithDots = (string: string, maxLength: number) => {
  if (string.length >= maxLength) {
    return string.slice(0, maxLength) + "...";
  }
  return string;
};
