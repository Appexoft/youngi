import {
  colors,
  radius,
  fonts,
  textStyles,
} from "./../../../../../constants/designConstants";

import { horizontalScale } from "~/constants/metrics";
import { verticalScale } from "~/constants/metrics";

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  content: {
    width: "100%",
    height: 500,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: radius.large,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: verticalScale(28),
    paddingHorizontal: horizontalScale(30),
    paddingBottom: verticalScale(40),
  },
  title: {
    marginBottom: verticalScale(6),
    width: "100%",
  },
  subtitle: {
    marginBottom: verticalScale(16),
    width: "100%",
  },
  codeSubtitle: {
    paddingLeft: horizontalScale(16),
    marginBottom: verticalScale(12),
    width: "100%",
  },
  block: {
    width: "100%",
    alignItems: "flex-end",
  },
  invitationSentWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  invitationSentIconWrapper: {
    width: 139,
    height: 139,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 69.5,
    backgroundColor: colors.purpleLinear,
    marginTop: verticalScale(60),
    marginBottom: verticalScale(34),
  },
  invitationSentIcon: {
    width: 116,
    height: 116,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 58,
    borderWidth: 5,
    borderColor: colors.white,
    backgroundColor: colors.purpleLinear,
  },
  invitationTitle: {
    marginBottom: verticalScale(16),
  },
  codeWrapper: {
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
  alreadyHaveAcc: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    width: "100%",
    height: 320,
    paddingTop: verticalScale(28),
    paddingHorizontal: horizontalScale(30),
    backgroundColor: colors.white,
    borderRadius: radius.large,
  },
  alreadyHaveAccTitle: {
    marginRight: horizontalScale(-2),
  },
  button: {
    width: "100%",
    marginTop: verticalScale(40),
    marginBottom: verticalScale(40),
    alignItems: "center",
    justifyContent: "space-between",
  },
  goToTheMainPage: {
    marginTop: verticalScale(20),
  },
  codeItemE: {
    paddingBottom: verticalScale(10),
    paddingRight: horizontalScale(1),
  },
  circleWrapper: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: colors.purpleLinear,
    borderRadius: 50,
    backgroundColor: colors.white,
    marginTop: verticalScale(40),
  },
  circleInner: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: colors.purpleLinear,
  },
  codeItemAndroid: {},
});
