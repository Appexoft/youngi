import { horizontalScale, verticalScale } from "~/constants/metrics";
import { colors, radius } from "~/constants/designConstants";

import { Platform, StyleSheet } from "react-native";

const isIOS = Platform.OS === "ios";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  topContainer: {
    paddingHorizontal: horizontalScale(20),
    marginTop: verticalScale(24),
  },
  topButtons: {
    width: "100%",
    marginTop: verticalScale(28),
    flexDirection: isIOS ? "row-reverse" : "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  topButton: {
    width: "47%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.main,
    backgroundColor: colors.white,
  },
  content: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.white,
    marginTop: verticalScale(24),
    borderTopRightRadius: radius.biggest,
    borderTopLeftRadius: radius.biggest,
  },
  contentTopBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: isIOS ? "flex-end" : "flex-start",
    alignItems: "center",
    paddingHorizontal: horizontalScale(20),
  },
  loaderContainer: {
    width: "100%",
    height: 146,
    justifyContent: "center",
    alignItems: "center",
  },
});
