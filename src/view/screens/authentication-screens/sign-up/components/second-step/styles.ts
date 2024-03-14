import { horizontalScale } from "~/constants/metrics";
import { verticalScale } from "~/constants/metrics";
import {
  colors,
  fonts,
  radius,
  textStyles,
} from "../../../../../../constants/designConstants";
import { Platform, StyleSheet } from "react-native";

const isIOS = Platform.OS === "ios";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  content: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    height: 620,
    paddingTop: verticalScale(28),
    paddingBottom: verticalScale(50),
    paddingHorizontal: horizontalScale(24),
    backgroundColor: colors.white,
    borderRadius: radius.large,
  },
  title: {
    marginBottom: verticalScale(6),
  },
  subtitle: {
    marginBottom: verticalScale(16),
  },
  codeSubtitle: {
    marginLeft: isIOS ? 0 : horizontalScale(16),
    marginRight: isIOS ? horizontalScale(16) : horizontalScale(0),
    marginBottom: verticalScale(12),
  },
  block: {
    width: "100%",
    // alignItems: "flex-end",
  },
  codeWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: horizontalScale(16),
  },
  codeWrapperHebrew: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: horizontalScale(16),
  },
  codeItemWrapper: {
    width: 56,
    height: 68,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.light,
    borderRadius: radius.medium,
  },
  codeItem: {
    fontFamily: fonts.REGULAR,
    fontSize: textStyles.H3,
    color: colors.dark,
  },
  codeItemE: {
    paddingBottom: verticalScale(10),
    paddingRight: horizontalScale(1),
  },
  codeItemAndroid: {},
  timerWrapper: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(28),
  },
  timerContent: {
    flexDirection: "row",
  },
  timer: {
    fontSize: 15,
    fontFamily: fonts.REGULAR,
    color: colors.grey,
    marginRight: horizontalScale(4.5),
  },
  timerActive: {
    fontSize: 15,
    fontFamily: fonts.MEDIUM,
    color: colors.purpleLinear,
    marginRight: horizontalScale(4.5),
  },
});
