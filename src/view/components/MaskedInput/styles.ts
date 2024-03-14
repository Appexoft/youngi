import { radius } from "../../../constants/designConstants";
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
    paddingHorizontal: horizontalScale(12),
    backgroundColor: colors.light,
    borderRadius: radius.medium,
    fontSize: 14,
    textAlign: "left",
    alignItems: "center",
  },
  inputContainerPhone: {
    width: "100%",
    height: 48,
    paddingHorizontal: horizontalScale(50),
    backgroundColor: colors.light,
    borderRadius: radius.medium,
    fontSize: 14,
    textAlign: "left",
  },
  inputContainerRight: {
    width: "100%",
    height: 48,
    paddingHorizontal: horizontalScale(12),
    backgroundColor: colors.light,
    borderRadius: radius.medium,
    textAlign: "right",
  },
  errorWrapper: {
    position: "absolute",
    bottom: verticalScale(-15),
    right: horizontalScale(4),
  },
  showPasswordWrapper: {
    position: "absolute",
    right: horizontalScale(12),
    bottom: verticalScale(12),
    width: 24,
  },
  showPasswordWrapperHebrew: {
    position: "absolute",
    left: horizontalScale(12),
    bottom: verticalScale(12),
  },
  phoneNumberPlaceholder: {
    position: "absolute",
    left: horizontalScale(29.6),
  },
  phoneNumberPlaceholderAndroid: {
    position: "absolute",
    left: horizontalScale(28.5),
  },
  phoneButton: {
    position: "absolute",
    bottom: verticalScale(4),
    left: horizontalScale(4),
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  phoneContainer: {
    marginLeft: horizontalScale(38),
  },
});
