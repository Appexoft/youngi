import { horizontalScale } from "~/constants/metrics";
import { verticalScale } from "~/constants/metrics";
import { colors, radius } from "./../../../../../../constants/designConstants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modal: {},
  container: {
    width: "100%",
    justifyContent: "space-between",
  },

  content: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
});
