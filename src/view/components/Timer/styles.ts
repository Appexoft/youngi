import { colors } from "~/constants/designConstants";
import { textStyles } from "~/constants/designConstants";
import { fonts } from "~/constants/designConstants";

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.REGULAR,
    fontSize: textStyles.H3,
    color: colors.dark,
  },
});
