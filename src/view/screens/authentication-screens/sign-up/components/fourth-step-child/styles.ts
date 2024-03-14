import {
  fonts,
  getColorWithOpacity,
} from "./../../../../../../constants/designConstants";
import { horizontalScale } from "~/constants/metrics";
import { verticalScale } from "~/constants/metrics";
import {
  colors,
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
    width: "100%",
    height: 620,
    backgroundColor: colors.white,
    borderRadius: radius.large,
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingTop: verticalScale(28),
    paddingHorizontal: horizontalScale(30),
    paddingBottom: verticalScale(40),
  },
  codeWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    // paddingHorizontal: horizontalScale(16),
  },
  codeWrapperHebrew: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    width: "100%",
    // paddingHorizontal: horizontalScale(16),
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
  topBar: {
    marginLeft: horizontalScale(24),
    // alignItems: isIOS ? "flex-end" : "flex-start",
  },
  codeSubtitle: {
    paddingRight: isIOS ? horizontalScale(26) : 0,
    paddingLeft: isIOS ? 0 : horizontalScale(26),

    marginBottom: verticalScale(12),
  },
  button: {
    position: "absolute",
    left: horizontalScale(30),
    right: horizontalScale(30),
    bottom: verticalScale(45),
  },
  modalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: getColorWithOpacity(colors.white, 0.6),
    justifyContent: "center",
    alignItems: "center",
  },
  cardCircle: {
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: colors.purpleLinear,
  },
  cardCircleInner: {
    width: 83,
    height: 83,
    borderRadius: 83,
    backgroundColor: colors.purpleLinear,
  },
});
