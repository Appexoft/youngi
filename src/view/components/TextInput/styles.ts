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
    textAlign: "left",
    color: colors.dark,
  },
  inputContainerRight: {
    width: "100%",
    height: 48,
    marginTop: verticalScale(8),
    paddingHorizontal: horizontalScale(12),
    backgroundColor: colors.light,
    borderRadius: radius.medium,
    textAlign: "right",
    color: colors.dark,
  },
  errorWrapper: {
    position: "absolute",
    // bottom: verticalScale(-15),
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
    bottom: verticalScale(15),
    left: horizontalScale(29.5),
  },
  phoneNumberPlaceholderAndroid: {
    position: "absolute",
    bottom: verticalScale(15.2),
    left: horizontalScale(28.5),
  },
  budgetPlaceholder: {
    position: "absolute",
    right: horizontalScale(16),
    top: verticalScale(19),
  },
  budgetPlaceholderIOS: {
    position: "absolute",
    left: horizontalScale(16),
    top: verticalScale(19),
  },
});
