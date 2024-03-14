import { colors, radius } from "./../../../../constants/designConstants";
import { Platform, StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "~/constants/metrics";

const isIOS = Platform.OS === "ios";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: verticalScale(40),
  },
  header: {
    width: "100%",
    height: 50,
    alignItems: "flex-end",
    paddingRight: horizontalScale(25),
    marginTop: verticalScale(15),
  },
  goBackContainer: {
    marginLeft: horizontalScale(16),
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radius.secondary,
  },
  containerWrapper: {
    position: "absolute",
    bottom: 0,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxHeight: "100%",
    height: 480,
    paddingTop: verticalScale(28),
    paddingHorizontal: horizontalScale(30),
    backgroundColor: colors.white,
    borderRadius: radius.large,
  },
  content: {
    width: "100%",
    alignItems: isIOS ? "flex-end" : "flex-start",
  },
  title: {
    marginRight: horizontalScale(-2),
  },
  subtitle: {
    marginTop: verticalScale(10),
  },
  row: {
    marginTop: verticalScale(16),
    width: "100%",
    position: "relative",
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  button: {
    width: "100%",
    marginBottom: verticalScale(40),
  },
  wrapper: {},
  resendCode: {
    marginTop: verticalScale(10),
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
