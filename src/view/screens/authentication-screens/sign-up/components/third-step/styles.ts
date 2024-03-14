import { horizontalScale } from "~/constants/metrics";
import { verticalScale } from "~/constants/metrics";
import { colors, radius } from "./../../../../../../constants/designConstants";
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
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  contentWrapper: {
    justifyContent: "flex-start",
    alignItems: isIOS ? "flex-end" : "flex-start",
    paddingTop: verticalScale(28),
    paddingHorizontal: horizontalScale(30),
  },
  contentWrapperHebrew: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: verticalScale(28),
    paddingHorizontal: horizontalScale(30),
  },
  title: {
    marginRight: horizontalScale(-2),
  },
  subtitle: {
    marginTop: verticalScale(10),
  },
  photoWrapper: {
    position: "relative",
    marginTop: verticalScale(16),
  },
  photoUploadedWrapper: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  photoButton: {
    position: "absolute",
    bottom: 5,
    left: 0,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: colors.purpleLinear,
  },
  row: {
    marginTop: verticalScale(16),
    width: "100%",
  },
  button: {
    width: "100%",
    marginTop: verticalScale(40),
    marginBottom: verticalScale(40),
    alignItems: "center",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: verticalScale(24),
  },
  checkboxText: {
    marginHorizontal: horizontalScale(5),
  },
  checkboxButton: {
    marginLeft: horizontalScale(8),
  },
  checkboxButtonHebrew: {
    marginLeft: horizontalScale(8),
  },
  goToTheMainPage: {
    marginTop: verticalScale(20),
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  checkboxHebrew: {
    flexDirection: "row-reverse",
  },
});
