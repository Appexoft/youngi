import { StyleSheet } from "react-native";
import { colors, radius } from "~/constants/designConstants";
import { horizontalScale, verticalScale } from "~/constants/metrics";

export const styles = StyleSheet.create({
  modalContainer: {
    height: 240,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: verticalScale(10),
    paddingHorizontal: horizontalScale(30),
    borderRadius: radius.main,
    backgroundColor: colors.white,
  },
  modalWrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
});
