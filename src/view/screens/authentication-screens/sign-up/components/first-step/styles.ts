import { horizontalScale } from "~/constants/metrics";
import { verticalScale } from "~/constants/metrics";
import { colors, radius } from "./../../../../../../constants/designConstants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modal: {},
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  content: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    width: "100%",
    height: 320,
    paddingTop: verticalScale(28),
    paddingHorizontal: horizontalScale(30),
    backgroundColor: colors.white,
    borderRadius: radius.large,
  },
  title: {
    marginRight: horizontalScale(-2),
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
  },
});
