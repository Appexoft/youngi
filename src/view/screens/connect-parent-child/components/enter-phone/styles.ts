import { horizontalScale } from "~/constants/metrics";
import { verticalScale } from "~/constants/metrics";
import { Platform, StyleSheet } from "react-native";
import { colors, radius } from "~/constants/designConstants";

const isIOS = Platform.OS === "ios";

export const styles = StyleSheet.create({
  modal: {},
  container: {
    width: "100%",
    justifyContent: "space-between",
  },

  content: {
    justifyContent: "flex-start",
    alignItems: isIOS ? "flex-end" : "flex-start",
    width: "100%",
    height: 600,
    paddingTop: verticalScale(28),
    paddingHorizontal: horizontalScale(24),
    backgroundColor: colors.white,
    borderRadius: radius.large,
  },
  header: {
    position: "absolute",
    left: 0,
    right: 0,
    top: verticalScale(40),
  },
  button: {
    position: "absolute",
    bottom: verticalScale(45),
    right: horizontalScale(24),
    left: horizontalScale(24),
  },
});
