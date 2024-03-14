import { moderateScale } from "./metrics";

export const colors = {
  white: "#fff",
  whiteFocused: "#E0E0E0",
  light: "#F8F8FD",
  lightBlue: "#D9D9F1",
  grey: "#B5B5BB",
  purpleLinear: "#D354FF",
  purpleSecond: "#BD00FF",
  lightPurple: "#F9E9FF",
  dark: "#1C1020",
  placeholderColor: "#A09BA5",
  red: "#ff776f",
  secondaryRed: "#FF5F5F",
};

export enum fonts {
  LIGHT = "Rubik-Light",
  REGULAR = "Rubik-Regular",
  MEDIUM = "Rubik-Medium",
  SEMI_BOLD = "Rubik-SemiBold",
  BOLD = "Rubik-Bold",
  BLACK = "Rubik-Black",
}

export const radius = {
  main: 20,
  secondary: 12,
  large: 32,
  medium: 16,
  biggest: 42,
};

export const textStyles: any = {
  H1: moderateScale(28),
  H2: moderateScale(26),
  H3: moderateScale(24),
  H4: moderateScale(20),
  H5: moderateScale(18),
  H6: moderateScale(16),
  H7: moderateScale(14),

  SMALL: moderateScale(12),
  MEDIUM: moderateScale(22),
};

export const getColorWithOpacity = (hex: string, opacity: number) => {
  let c: any;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(
      ", "
    )}, ${opacity})`;
  }
  throw new Error("Ooops, bad Hex. Try again!");
};
