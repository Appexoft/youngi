import {
  getColorWithOpacity,
  radius,
} from "./../../../../../constants/designConstants";
import { Platform, StyleSheet } from "react-native";
import { colors } from "~/constants/designConstants";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "~/constants/metrics";

const isIOS = Platform.OS === "ios";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(100),
    backgroundColor: colors.white,
  },
  menuModalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: getColorWithOpacity(colors.dark, 0.6),
    justifyContent: "flex-end",
  },
  menuModalContent: {
    width: "100%",
    height: 400,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.biggest,
    borderTopRightRadius: radius.biggest,
    padding: moderateScale(24),
  },
  menuModalContentChild: {
    width: "100%",
    height: 250,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.biggest,
    borderTopRightRadius: radius.biggest,
    padding: moderateScale(24),
    justifyContent: "flex-start",
  },
  br: {
    width: "100%",
    height: 1,
    backgroundColor: colors.lightBlue,
    marginVertical: verticalScale(12),
  },
  menuRow: {
    width: "100%",
    height: 45,
    // backgroundColor: "red",
    flexDirection: isIOS ? "row-reverse" : "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
