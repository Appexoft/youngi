import { radius } from "./../../../constants/designConstants";
import { horizontalScale, verticalScale } from "~/constants/metrics";
import { colors } from "~/constants/designConstants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    alignItems: "flex-start",
  },
  containerHebrew: {
    position: "relative",
    width: "100%",
    alignItems: "flex-end",
  },
  inputContainer: {
    width: "100%",
    height: 48,
    marginTop: verticalScale(8),
    paddingHorizontal: horizontalScale(12),
    backgroundColor: colors.light,
    borderRadius: radius.medium,
  },
  inputContainerRight: {
    textAlign: "right",
  },
  errorWrapper: {
    position: "absolute",
    bottom: verticalScale(-15),
    right: horizontalScale(4),
  },
});
